# Staging verification runbook — SYJ WebAcademy lesson engine

**Target:** a new, disposable Supabase STAGING project only. Never point these commands at production. Keep the PR draft; do not merge.

## 0. Before starting
- Use a separate Supabase organization/project named `syj-webacademy-staging`.
- Use a strong unique database password and store it in a password manager.
- Enable email/password authentication; configure an allow-listed test email.
- Do not reuse production users, production API keys, or production data.
- Install on the Android/Termux device: Node.js 22+, Git, PostgreSQL client (`pkg install postgresql`), and the Supabase CLI if desired. Docker daemon is not required for hosted Supabase staging.
- Confirm current branch is `feat/interactive-lessons` and worktree is clean before local edits.

## 1. Create the staging project
1. In Supabase Dashboard, create a new project called `syj-webacademy-staging` in the intended region.
2. Copy the project URL, anon/publishable key, and database connection string into a password manager. Never paste them into Git, chat, screenshots or issue comments.
3. In Authentication → Providers, enable Email. Use a test mailbox you control. Set the Site URL and redirect URL to the staging URL while testing.
4. In Project Settings → API, confirm the browser key is the anon/publishable key. The service-role/secret key is server-only and must never enter Vite variables.

## 2. Connect safely from Termux
Use the Supabase SQL Editor for SQL migrations, or connect with the staging-only database URI. Avoid storing passwords in shell history:
```bash
cd ~/projects/SYJ-WebForge-Academy
git switch feat/interactive-lessons
git pull --ff-only origin feat/interactive-lessons
git status --short --branch
pkg install postgresql
read -s -p "STAGING database URI: " STAGING_DATABASE_URL; echo
export DATABASE_URL="$STAGING_DATABASE_URL"
unset STAGING_DATABASE_URL
psql "$DATABASE_URL" -X -v ON_ERROR_STOP=1 -c 'select current_database(), current_user, now();'
```
Check the returned database is the staging project before continuing. Do not use `DATABASE_URL` copied from production.

## 3. Apply schema in staging
The repository baseline is expected to be already present in an existing Supabase project. For a fresh project, apply in this exact order in SQL Editor (or psql):
1. `supabase/migrations/0001_initial_schema.sql`
2. `supabase/seed.sql`
3. `supabase/migrations/0002_lesson_engine.sql`
4. `supabase/seed/0002_days_01_05_quizzes.sql`

Important: `0002_days_01_05_quizzes.sql` seeds the public quiz/question catalogue only. It intentionally does not contain correct answers. Stop if any step errors; do not rerun a partially applied SQL script blindly. Inspect transaction status and schema first.

Verify baseline preservation:
```sql
select count(*) as lesson_count, count(*) filter(where course_id is not null and track_id is not null) as mapped_count
from public.lessons;
select count(*) as completed_progress_rows from public.lesson_progress where completed;
select day_number, stage, title from public.lessons order by day_number;
select count(*) as quiz_count from public.quizzes;
select count(*) as question_count from public.quiz_questions;
```
Expected: 40 lessons, 40 mapped lessons, 5 quizzes and 20 questions. Record the pre-migration baseline counts from a staging snapshot before applying 0002; compare lesson IDs and progress IDs, not just totals.

## 4. Load answer keys without committing them
The answer-key loader requires exactly 20 entries, each with `question_id`, `correct_option_id`, `explanation_en`, `explanation_hi`. Obtain/review the answer key separately with the course author. Do not infer or guess keys from a generic sample quiz.

Preferred method: use a protected secret manager/CI environment scoped to staging and run:
```bash
export DATABASE_URL="$STAGING_DATABASE_URL"
# Inject SYJ_LESSON_ANSWER_KEYS_JSON from a protected secret manager.
node scripts/seed-lesson-answer-keys.mjs
unset SYJ_LESSON_ANSWER_KEYS_JSON DATABASE_URL STAGING_DATABASE_URL
```
If your secret manager cannot inject environment variables directly, save the JSON in a private file outside the repository with mode 600, then load it into the process environment without printing it:
```bash
umask 077
read -s -p "Paste protected answer-key JSON: " KEY_JSON; echo
export SYJ_LESSON_ANSWER_KEYS_JSON="$KEY_JSON"
unset KEY_JSON
node scripts/seed-lesson-answer-keys.mjs
unset SYJ_LESSON_ANSWER_KEYS_JSON
```
Do not type the secret as a literal shell command, do not use `echo`, `cat`, `set -x`, or command-line arguments that expose it. Never put it in a file under the Git repository. The loader invokes psql using `DATABASE_URL`; test this only with the staging URI. After loading, verify only counts and never select or print the answer-key rows:
```sql
select count(*) as private_key_count from lesson_private.quiz_answer_keys;
```
Expected: 20. Access to the table must remain denied to anon/authenticated.

## 5. Configure staging frontend
In GitHub repository Settings → Secrets and variables → Actions, add staging-only variables/secrets for the staging URL and anon key. Use a separate staging deployment/workflow; do not replace production Pages secrets. Never set a service-role key as a `VITE_*` variable.

For a local preview, create a local-only `.env.local` (never commit it):
```bash
cat > .env.local <<'EOF'
VITE_SUPABASE_URL=YOUR_STAGING_PROJECT_URL
VITE_SUPABASE_ANON_KEY=YOUR_STAGING_ANON_KEY
EOF
npm install
npm run dev -- --host 0.0.0.0
```
Open the Termux LAN URL from your phone browser if using another device, or open the local Vite URL in the same Android browser environment. Remove `.env.local` after testing. For the deployed GitHub Pages preview, deploy only from the feature branch to a separate staging host; do not overwrite production Pages.

## 6. Exact Android phone test script
Use two independent test accounts: Learner A and Learner B. Verify the browser is on the staging host before entering credentials.

A. Anonymous / public:
1. Open the staging URL, select Curriculum, open Day 1, refresh the page. It must remain on Day 1.
2. Repeat direct URL `#/lesson/2` and refresh.
3. Open Days 1–5; verify English/Hindi toggle preserves the same day and section.
4. Confirm quiz options are visible but correct answers are not disclosed before submission.
5. Confirm Day 2 remains locked until Day 1 completion; no client-only button may bypass the lock.
6. Use browser zoom 200%, portrait and landscape; verify no horizontal page overflow and controls remain usable.

B. Learner A:
1. Sign up using the staging-only test mailbox and confirm email.
2. Sign in, submit Day 1 with a deliberately incorrect set. Expect score/fail feedback and no completion.
3. Try Mark complete without a passing attempt. Expect server rejection and no progress row.
4. Submit a passing answer set. Confirm score and per-question explanations appear only after submission.
5. Mark complete. Refresh and sign out/in; Day 1 remains completed.
6. Retake the quiz; verify a new attempt is retained and the best score is reported.
7. Save an exercise submission; confirm it is visible to Learner A after refresh.

C. Learner B / authorization:
1. Sign in as Learner B. Confirm Learner B cannot see Learner A's attempts, exercise submissions or progress.
2. Attempt direct REST insert into `quiz_attempts`; expect permission denied.
3. Attempt SELECT from `lesson_private.quiz_answer_keys`; expect permission denied.
4. Attempt to update own profile role to trainer/admin; expect permission denied.
5. Attempt to mark Day 1 complete without own passing attempt; expect permission denied.
6. Confirm learner cannot set exercise status to passed.

D. Rate and capacity:
1. Submit 10 attempts for one quiz within an hour; attempts 11+ must be rejected.
2. Use a controlled concurrent test from CI or two separate clients; confirm hourly cap cannot be raced.
3. Test capacity-one batch enrolment concurrently in disposable staging data; only one learner may join.

E. Accessibility:
1. Navigate all controls using an external keyboard (Tab, Shift+Tab, Enter, Space).
2. Enable TalkBack; confirm page title, headings, quiz fieldset/legend, radio labels, errors and status messages are announced.
3. Confirm focus indicator is visible and language switch has an accessible name.
4. Test with 200% text scaling. Record device model, Android version, browser and results.

Record every result PASS/FAIL with screenshot evidence that contains no email, token, project secret or answer key. If any security test fails, stop and do not promote staging.

## 7. Staging acceptance gate
Do not start Days 6–10 until all of these pass:
- Migration and quiz catalogue apply cleanly to staging.
- All 20 reviewed answer keys load and remain inaccessible to client roles.
- Two-user isolation, fake insert, role escalation and completion-gate checks pass.
- Auth signup/sign-in, server scoring, retakes, best-score behavior and persisted progress pass on Android.
- 10/hour rate limit and concurrent batch capacity pass.
- Main-branch frontend compatibility CI is green.
- Manual mobile, keyboard and TalkBack checks are recorded.
