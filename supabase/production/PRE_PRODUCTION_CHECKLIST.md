# Pre-production checklist — lesson engine 0002

**No production action is authorized by this document.** Run only after staging acceptance and explicit approval.

## A. Backup and freeze
1. Announce a maintenance window and pause schema-changing work.
2. Take/verify a Supabase-managed backup or PITR restore point in Dashboard.
3. Also create a logical dump from a trusted machine with PostgreSQL client tools. Keep it outside the repo, encrypt it, and verify its size/checksum:
   ```bash
   umask 077
   mkdir -p "$HOME/syj-db-backups"
   read -s -p "Production DB URI: " PROD_DB_URL; echo
   export PROD_DB_URL
   pg_dump --format=custom --no-owner --no-acl --file "$HOME/syj-db-backups/syj-webacademy-pre-0002-$(date -u +%Y%m%dT%H%M%SZ).dump" "$PROD_DB_URL"
   sha256sum "$HOME"/syj-db-backups/syj-webacademy-pre-0002-*.dump
   unset PROD_DB_URL
   ```
   The URI is sensitive; do not put it in shell history, scripts, logs or chat. A logical dump is a recovery aid, not a substitute for Supabase PITR/managed backups. Confirm the backup can be restored to a separate project before proceeding.

## B. Preflight
- Confirm target project ref and database name manually in Dashboard.
- Confirm migration history/schema matches the expected baseline.
- Compare exact 40 lesson IDs and lesson_progress row IDs/counts with a pre-migration export.
- Confirm no schema drift, no open write transactions and no unexpected custom policies/grants.
- Confirm Days 1–5 answer keys have been independently reviewed and supplied via the protected secret loader; never commit or print them.
- Confirm latest CI green, including legacy-main compatibility build and SQL contract test.
- Record operator, approver, start time, backup reference and rollback owner.

## C. Apply (only after separate approval)
This repository migration currently uses a numbered filename and the CI applies it with psql. Do not assume `supabase db push` will discover this filename as a timestamped CLI migration. Use SQL Editor or a trusted psql client after confirming the target:
```bash
# Set only after verifying the production target; never echo this variable.
read -s -p "PRODUCTION DB URI: " PROD_DB_URL; echo
export PROD_DB_URL
psql "$PROD_DB_URL" -X -v ON_ERROR_STOP=1 -f supabase/migrations/0002_lesson_engine.sql
psql "$PROD_DB_URL" -X -v ON_ERROR_STOP=1 -f supabase/seed/0002_days_01_05_quizzes.sql
# Inject reviewed secret from protected secret manager, then run:
node scripts/seed-lesson-answer-keys.mjs
unset SYJ_LESSON_ANSWER_KEYS_JSON PROD_DB_URL
```
Do not execute these commands until approved. The answer-key loader requires a secure environment and a correctly configured psql connection. Never use a service-role key in Vite/frontend configuration.

## D. Post-migration smoke tests
- 40 original lesson IDs still exist and all 40 have course/track mappings.
- Original lesson_progress IDs/counts and completion timestamps are unchanged.
- 5 published quizzes, 20 public questions, 20 private answer keys.
- anon/authenticated cannot read lesson_private.quiz_answer_keys.
- authenticated cannot directly insert quiz_attempts or update profile.role.
- Learners cannot read another learner's attempts, exercise results or progress.
- Server computes quiz score; attempts 11/hour rejected; best score retained.
- mark_lesson_complete rejects learners without a passing attempt.
- Legacy main frontend can still sign in, read dashboard/batches/progress and use its original direct progress-upsert flow against the migrated schema.
- Test at least one staging-like account per role; then smoke test production with approved test accounts.
- Monitor Auth, Postgres logs, RPC failures and rate-limit errors. Keep new lesson UI hidden until all checks pass.

## E. Rollback
1. Disable new lesson-engine entry points and stop quiz submissions.
2. Take a fresh post-migration backup and export any quiz_attempts/exercise_results that have been created.
3. Inspect row counts. The guarded rollback aborts if attempts or exercise results exist:
   `supabase/rollback/0002_lesson_engine_rollback.sql`
4. Run that SQL only with explicit approval and a reviewed data-retention/export plan. It removes the new course/quiz structures but deliberately keeps the original 40 lessons and lesson_progress.
5. Verify the old frontend and original progress after rollback.
6. If rollback is blocked or partial, do not manually drop objects. Restore the verified backup/PITR point using the approved Supabase recovery procedure.

## Decision gate
Production migration requires all staging acceptance tests, green CI, independent answer-key review, a verified restore path, an approved maintenance window and explicit approval. Merge and production migration are separate decisions.
