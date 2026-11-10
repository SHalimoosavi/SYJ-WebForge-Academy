# Production migration and rollback runbook — lesson engine 0002

**Status: prepared, not applied.** No production Supabase project was contacted by this work. Production execution requires separate owner approval.

## Artifacts
- Migration: `supabase/migrations/0002_lesson_engine.sql`
- Days 1–5 public quiz catalogue seed: `supabase/seed/0002_days_01_05_quizzes.sql`
- Protected answer-key loader: `scripts/seed-lesson-answer-keys.mjs` (requires `SYJ_LESSON_ANSWER_KEYS_JSON`; the real answer-key payload is intentionally not committed)
- Guarded rollback: `supabase/rollback/0002_lesson_engine_rollback.sql`

## Preconditions
1. Confirm the target project is the intended production project and record its project reference.
2. Take and verify a recoverable database backup/PITR restore point.
3. Confirm the production schema matches the repository's `0001_initial_schema.sql` and the 40 lesson rows have the expected stage names.
4. Run the migration and seed against a fresh staging clone with production-like data and compare lesson/progress row counts and IDs.
5. Review RLS and function grants using the production role matrix; do not use the service-role key in the browser.
6. Schedule a maintenance window and confirm an operator can restore the backup.

## Apply sequence (approval required)
1. Apply `0002_lesson_engine.sql` in a transaction-capable SQL session.
2. Apply `seed/0002_days_01_05_quizzes.sql` to insert the public Day 1–5 quiz questions.
3. Supply the 20 correct option IDs and bilingual explanations through a protected secret named `SYJ_LESSON_ANSWER_KEYS_JSON`, then run `node scripts/seed-lesson-answer-keys.mjs` against the approved database connection. Never place the JSON payload in Git, frontend source, CI logs or shell history.
4. Verify exactly 40 legacy lessons remain, their IDs are unchanged, all course/track mappings exist, and pre-existing `lesson_progress` rows are unchanged.
5. Verify the five quizzes, twenty questions and twenty private answer keys exist.
6. Verify `anon` and `authenticated` cannot select `lesson_private.quiz_answer_keys`; authenticated users cannot directly insert quiz attempts or change profile role; RPC execution is limited to authenticated users.
7. Run a two-user RLS smoke test, quiz pass/fail test, hourly rate-limit test and capacity-one concurrent enrolment test.
8. Enable the lesson UI only after all checks pass. Monitor database errors, quiz submission failures and rate-limit rejections.

## Rollback (approval required)
1. Disable lesson-engine entry points in the frontend first.
2. Take a fresh backup and export quiz attempts/exercise submissions if any exist.
3. Run the guarded `supabase/rollback/0002_lesson_engine_rollback.sql`. It intentionally aborts if assessment attempts or exercise results exist; do not bypass that guard without an approved export/retention plan.
4. Verify all 40 original lessons and all original `lesson_progress` rows remain.
5. If rollback fails, restore the verified backup rather than manually dropping objects.

## Data retention and safety
- The rollback does not delete the original lesson catalogue or `lesson_progress` table.
- Assessment and exercise data is intentionally protected from destructive rollback.
- Private answer keys must never be copied into frontend source, static JSON, logs or build artifacts.
- The current CI PostgreSQL environment is disposable and is not a substitute for a production-like staging clone.
