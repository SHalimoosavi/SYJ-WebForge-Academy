#!/usr/bin/env bash
set -euo pipefail
: "${PGHOST:?}" "${PGDATABASE:?}" "${PGUSER:?}" "${PGPASSWORD:?}"
tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT

# 12 concurrent calls for one learner/quiz: advisory transaction lock + hourly cap must admit exactly 10.
for i in $(seq 1 12); do
  (
    if psql -X -v ON_ERROR_STOP=1 -qAt <<'SQL' >"$tmp/rate-$i.log" 2>&1
set role authenticated;
select set_config('request.jwt.claim.sub','10000000-0000-4000-8000-000000000002',false);
select public.submit_quiz_attempt(
 '20000000-0000-4000-8000-000000000001',
 '[{"question_id":"30000000-0000-4000-8000-000000000001","option_id":"a"},{"question_id":"30000000-0000-4000-8000-000000000002","option_id":"a"}]'::jsonb
);
SQL
    then echo success >>"$tmp/rate-results"; else echo rejected >>"$tmp/rate-results"; fi
  ) &
done
wait
successes="$(grep -c '^success$' "$tmp/rate-results" || true)"
rejected="$(grep -c '^rejected$' "$tmp/rate-results" || true)"
if [[ "$successes" -ne 10 || "$rejected" -ne 2 ]]; then
  cat "$tmp"/rate-*.log
  echo "Concurrent rate limit expected 10 accepted/2 rejected; got $successes/$rejected" >&2
  exit 1
fi
echo "PASS concurrent quiz rate limit: $successes accepted, $rejected rejected"

# Two simultaneous enrolments into a capacity-one batch must not oversubscribe it.
batch_id="$(psql -X -v ON_ERROR_STOP=1 -qAtc "insert into public.batches(name,description,status,trainer_id,capacity) values('Concurrency test','ephemeral','upcoming','10000000-0000-4000-8000-000000000001',1) returning id")"
for learner in 10000000-0000-4000-8000-000000000001 10000000-0000-4000-8000-000000000002; do
  (
    if psql -X -v ON_ERROR_STOP=1 -qAtc "insert into public.batch_memberships(batch_id,learner_id) values('$batch_id','$learner')" >"$tmp/capacity-$learner.log" 2>&1
    then echo success >>"$tmp/capacity-results"; else echo rejected >>"$tmp/capacity-results"; fi
  ) &
done
wait
capacity_success="$(grep -c '^success$' "$tmp/capacity-results" || true)"
capacity_rejected="$(grep -c '^rejected$' "$tmp/capacity-results" || true)"
enrolled="$(psql -X -v ON_ERROR_STOP=1 -qAtc "select count(*) from public.batch_memberships where batch_id='$batch_id'")"
if [[ "$capacity_success" -ne 1 || "$capacity_rejected" -ne 1 || "$enrolled" -ne 1 ]]; then
  cat "$tmp"/capacity-*.log
  echo "Concurrent capacity expected one enrolment; successes=$capacity_success rejected=$capacity_rejected enrolled=$enrolled" >&2
  exit 1
fi
echo "PASS concurrent batch capacity: exactly $enrolled enrolment"
