-- PROPOSAL ONLY — DO NOT APPLY TO PRODUCTION.
-- SYJ WebAcademy Phase 1 data-model proposal.
-- Review and test against a disposable/staging Supabase project before promotion.
--
-- Design goals:
-- 1. Add courses and tracks without deleting or rewriting the existing 40-day lessons.
-- 2. Keep existing lesson_progress rows intact; course progress is derived from lessons.course_id.
-- 3. Add learner-owned quiz and exercise attempt records.
-- 4. Enforce length, URL, uniqueness, indexing and RLS at the database layer.
--
-- Migration assumptions to verify before execution:
-- - Existing public.lessons.day_number is globally unique.
-- - Existing public.lesson_progress has UNIQUE (learner_id, lesson_id).
-- - Existing app_role enum and authenticated/anon roles are present.
-- - Existing tables already have RLS enabled.

begin;

create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique
    check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$' and char_length(slug) between 2 and 80),
  title_en text not null check (char_length(btrim(title_en)) between 2 and 160),
  title_hi text not null check (char_length(btrim(title_hi)) between 2 and 160),
  description_en text not null default '' check (char_length(description_en) <= 4000),
  description_hi text not null default '' check (char_length(description_hi) <= 4000),
  status text not null default 'draft' check (status in ('draft','published','archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.course_tracks (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  slug text not null
    check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$' and char_length(slug) between 2 and 80),
  title_en text not null check (char_length(btrim(title_en)) between 2 and 160),
  title_hi text not null check (char_length(btrim(title_hi)) between 2 and 160),
  description_en text not null default '' check (char_length(description_en) <= 3000),
  description_hi text not null default '' check (char_length(description_hi) <= 3000),
  position integer not null default 0 check (position >= 0),
  created_at timestamptz not null default now(),
  unique (course_id, slug),
  unique (course_id, position)
);

-- Nullable initially so existing lessons and their progress remain valid.
alter table public.lessons
  add column if not exists course_id uuid references public.courses(id) on delete restrict,
  add column if not exists track_id uuid references public.course_tracks(id) on delete set null;

create index if not exists lessons_course_track_day_idx
  on public.lessons(course_id, track_id, day_number);

-- The existing lesson_progress table remains the source of truth for lesson completion.
-- Per-course progress is derived by joining lesson_progress -> lessons -> courses.
-- This avoids duplicating counters that can drift from actual lesson completions.
create or replace view public.learner_course_progress
with (security_invoker = true)
as
select
  lp.learner_id,
  l.course_id,
  count(*) filter (where lp.completed) as completed_lessons,
  count(*) as started_lessons,
  count(*) filter (where lp.completed)::numeric
    / nullif(count(*), 0)::numeric as completion_ratio,
  max(lp.completed_at) filter (where lp.completed) as last_completed_at
from public.lesson_progress lp
join public.lessons l on l.id = lp.lesson_id
where l.course_id is not null
group by lp.learner_id, l.course_id;

create table if not exists public.quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  learner_id uuid not null references public.profiles(id) on delete cascade,
  lesson_id uuid not null references public.lessons(id) on delete cascade,
  attempt_number integer not null check (attempt_number between 1 and 1000),
  score integer not null check (score >= 0),
  total_questions integer not null check (total_questions between 1 and 100),
  passed boolean not null,
  answers jsonb not null default '[]'::jsonb
    check (jsonb_typeof(answers) = 'array' and octet_length(answers::text) <= 16000),
  attempted_at timestamptz not null default now(),
  check (score <= total_questions),
  unique (learner_id, lesson_id, attempt_number)
);

create index if not exists quiz_attempts_owner_lesson_time_idx
  on public.quiz_attempts(learner_id, lesson_id, attempted_at desc);

create table if not exists public.exercise_results (
  id uuid primary key default gen_random_uuid(),
  learner_id uuid not null references public.profiles(id) on delete cascade,
  lesson_id uuid not null references public.lessons(id) on delete cascade,
  exercise_key text not null
    check (exercise_key ~ '^[a-z0-9]+([_-][a-z0-9]+)*$' and char_length(exercise_key) between 2 and 100),
  status text not null check (status in ('started','submitted','passed','needs_revision')),
  submission_text text not null default '' check (char_length(submission_text) <= 20000),
  submission_url text,
  feedback text not null default '' check (char_length(feedback) <= 5000),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (learner_id, lesson_id, exercise_key),
  check (
    submission_url is null
    or (
      char_length(submission_url) <= 2048
      and submission_url ~* '^https://[^[:space:]]+$'
    )
  )
);

create index if not exists exercise_results_owner_lesson_idx
  on public.exercise_results(learner_id, lesson_id);

-- RLS: learner-owned records only. Trainers/admins do not receive access through
-- these policies; any future review workflow must be separately designed and approved.
alter table public.courses enable row level security;
alter table public.course_tracks enable row level security;
alter table public.quiz_attempts enable row level security;
alter table public.exercise_results enable row level security;

create policy courses_read_published
  on public.courses for select to anon, authenticated
  using (status = 'published');

create policy tracks_read_for_published_courses
  on public.course_tracks for select to anon, authenticated
  using (
    exists (
      select 1 from public.courses c
      where c.id = course_tracks.course_id and c.status = 'published'
    )
  );

create policy quiz_attempts_owner_select
  on public.quiz_attempts for select to authenticated
  using (learner_id = (select auth.uid()));

create policy quiz_attempts_owner_insert
  on public.quiz_attempts for insert to authenticated
  with check (learner_id = (select auth.uid()));

create policy exercise_results_owner_select
  on public.exercise_results for select to authenticated
  using (learner_id = (select auth.uid()));

create policy exercise_results_owner_insert
  on public.exercise_results for insert to authenticated
  with check (learner_id = (select auth.uid()));

create policy exercise_results_owner_update
  on public.exercise_results for update to authenticated
  using (learner_id = (select auth.uid()))
  with check (learner_id = (select auth.uid()));

grant usage on schema public to anon, authenticated;
grant select on public.courses, public.course_tracks to anon, authenticated;
grant select on public.learner_course_progress to authenticated;
grant select, insert on public.quiz_attempts to authenticated;
grant select, insert, update on public.exercise_results to authenticated;

commit;

-- DATA BACKFILL PLAN (separate reviewed migration step):
-- 1. Insert a published course with slug 'web-development-40-days'.
-- 2. Insert its eight course_tracks using the existing stage names and order.
-- 3. Set course_id and track_id on the existing 40 lesson rows by day_number/stage.
-- 4. Do not delete, recreate, or change IDs in lessons or lesson_progress.
-- 5. Verify all 40 existing lessons are mapped exactly once and that progress row
--    counts before/after are identical.
--
-- SECURITY REVIEW FINDINGS TO RESOLVE BEFORE APPROVAL:
-- - The existing profiles_update_self policy allows UPDATE where role = current_role().
--   Verify with two real authenticated test users whether changing role can pass the
--   policy due to SECURITY DEFINER/current-row visibility. Prefer column-level UPDATE
--   grants excluding role, plus a trusted admin-only role-change path.
-- - Existing SECURITY DEFINER functions appear to retain PostgreSQL's default EXECUTE
--   grant to PUBLIC unless explicitly revoked. Audit current_role, is_batch_trainer,
--   is_batch_member and list_open_batches; revoke PUBLIC and grant only the minimum
--   required roles. Trigger functions should not be directly executable by clients.
-- - Verify function owners, fixed search_path, RLS bypass behavior and direct RPC calls.
-- - This proposal does not alter or remediate existing production policies/functions.
