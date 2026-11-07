-- Phase 1 lesson engine. Apply only after 0001_initial_schema.sql and seed.sql.
-- Answer keys are private; all scoring and completion decisions are server-side.
begin;

create table public.courses (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$' and length(slug) between 2 and 80),
  title_en text not null check (length(btrim(title_en)) between 2 and 160),
  title_hi text not null check (length(btrim(title_hi)) between 2 and 160),
  description_en text not null default '' check (length(description_en) <= 4000),
  description_hi text not null default '' check (length(description_hi) <= 4000),
  published boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.course_tracks (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  slug text not null check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$' and length(slug) between 2 and 80),
  stage_name text not null,
  title_en text not null check (length(btrim(title_en)) between 2 and 160),
  title_hi text not null check (length(btrim(title_hi)) between 2 and 160),
  position smallint not null check (position between 1 and 40),
  unique(course_id,slug), unique(course_id,position)
);

alter table public.lessons
  add column course_id uuid references public.courses(id) on delete restrict,
  add column track_id uuid references public.course_tracks(id) on delete restrict;

insert into public.courses(slug,title_en,title_hi,description_en,description_hi,published)
values ('web-development-40-days','Web Development: 40 Days','वेब डेवलपमेंट: 40 दिन',
'From web fundamentals to a deployed capstone project.','वेब की बुनियाद से deployed capstone project तक।',true);

insert into public.course_tracks(course_id,slug,stage_name,title_en,title_hi,position)
select c.id, v.slug, v.stage, v.en, v.hi, v.position
from public.courses c
cross join (values
 ('html-foundations','HTML Foundations','HTML Foundations','HTML की बुनियाद',1),
 ('css-responsive-design','CSS & Responsive Design','CSS & Responsive Design','CSS और Responsive Design',2),
 ('javascript','JavaScript','JavaScript','JavaScript',3),
 ('git-github','Git & GitHub','Git & GitHub','Git और GitHub',4),
 ('react','React','React','React',5),
 ('backend-data','Backend & Data','Backend & Data','Backend और Data',6),
 ('deployment','Deployment','Deployment','Deployment',7),
 ('capstone-project','Capstone Project','Capstone Project','Capstone Project',8)
) as v(slug,stage,en,hi,position)
where c.slug='web-development-40-days';

update public.lessons l
set course_id=c.id, track_id=t.id
from public.courses c, public.course_tracks t
where c.slug='web-development-40-days' and t.course_id=c.id and t.stage_name=l.stage;

do $$
begin
  if (select count(*) from public.lessons where course_id is not null) <> 40 then
    raise exception 'Expected exactly 40 mapped lessons; found %', (select count(*) from public.lessons where course_id is not null);
  end if;
  if exists (select 1 from public.lessons where course_id is null or track_id is null) then
    raise exception 'Every seeded lesson must map to a course and track';
  end if;
end $$;

create index lessons_course_track_day_idx on public.lessons(course_id,track_id,day_number);

create table public.quizzes (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid not null unique references public.lessons(id) on delete cascade,
  title_en text not null check(length(btrim(title_en)) between 2 and 160),
  title_hi text not null check(length(btrim(title_hi)) between 2 and 160),
  pass_percent smallint not null default 70 check(pass_percent between 1 and 100),
  published boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.quiz_questions (
  id uuid primary key default gen_random_uuid(),
  quiz_id uuid not null references public.quizzes(id) on delete cascade,
  position smallint not null check(position between 1 and 100),
  prompt_en text not null check(length(btrim(prompt_en)) between 3 and 1200),
  prompt_hi text not null check(length(btrim(prompt_hi)) between 3 and 1200),
  options jsonb not null check(jsonb_typeof(options)='array' and jsonb_array_length(options) between 2 and 6 and octet_length(options::text) <= 6000),
  unique(quiz_id,position)
);

create schema if not exists private;
revoke all on schema lesson_private from public, anon, authenticated;
create table lesson_private.quiz_answer_keys (
  question_id uuid primary key references public.quiz_questions(id) on delete cascade,
  correct_option_id text not null check(length(correct_option_id) between 1 and 80),
  explanation_en text not null check(length(explanation_en) between 3 and 2000),
  explanation_hi text not null check(length(explanation_hi) between 3 and 2000)
);
alter table lesson_private.quiz_answer_keys enable row level security;
revoke all on lesson_private.quiz_answer_keys from public, anon, authenticated;

create table public.quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  learner_id uuid not null references public.profiles(id) on delete cascade,
  quiz_id uuid not null references public.quizzes(id) on delete cascade,
  score smallint not null check(score between 0 and 100),
  max_score smallint not null check(max_score between 1 and 100),
  passed boolean not null,
  answers jsonb not null check(jsonb_typeof(answers)='array' and octet_length(answers::text) <= 12000),
  attempted_at timestamptz not null default now()
);
create index quiz_attempts_owner_quiz_time_idx on public.quiz_attempts(learner_id,quiz_id,attempted_at desc);
create index quiz_attempts_best_idx on public.quiz_attempts(learner_id,quiz_id,score desc);

create table public.exercise_results (
  id uuid primary key default gen_random_uuid(),
  learner_id uuid not null references public.profiles(id) on delete cascade,
  lesson_id uuid not null references public.lessons(id) on delete cascade,
  exercise_key text not null check(exercise_key ~ '^[a-z0-9]+([_-][a-z0-9]+)*$' and length(exercise_key) between 2 and 100),
  status text not null check(status in ('started','submitted','passed','needs_revision')),
  submission_text text not null default '' check(length(submission_text) <= 20000),
  submission_url text check(submission_url is null or (length(submission_url)<=2048 and submission_url ~* '^https://[^[:space:]]+$')),
  feedback text not null default '' check(length(feedback)<=5000),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(learner_id,lesson_id,exercise_key)
);
create index exercise_results_owner_lesson_idx on public.exercise_results(learner_id,lesson_id);

alter table public.courses enable row level security;
alter table public.course_tracks enable row level security;
alter table public.quizzes enable row level security;
alter table public.quiz_questions enable row level security;
alter table public.quiz_attempts enable row level security;
alter table public.exercise_results enable row level security;

create policy courses_read_published on public.courses for select to anon,authenticated using(published);
create policy tracks_read_published on public.course_tracks for select to anon,authenticated using(exists(select 1 from public.courses c where c.id=course_id and c.published));
create policy quizzes_read_published on public.quizzes for select to anon,authenticated using(published and exists(select 1 from public.lessons l where l.id=lesson_id and l.published));
create policy questions_read_published on public.quiz_questions for select to anon,authenticated using(exists(select 1 from public.quizzes q join public.lessons l on l.id=q.lesson_id where q.id=quiz_id and q.published and l.published));
create policy attempts_read_own on public.quiz_attempts for select to authenticated using(learner_id=(select auth.uid()));
create policy exercises_read_own on public.exercise_results for select to authenticated using(learner_id=(select auth.uid()));
create policy exercises_insert_own on public.exercise_results for insert to authenticated with check(learner_id=(select auth.uid()));
create policy exercises_update_own on public.exercise_results for update to authenticated using(learner_id=(select auth.uid())) with check(learner_id=(select auth.uid()));

-- Column-level profile grants prevent a learner changing their own role.
revoke update on public.profiles from authenticated;
grant update(full_name,preferred_language) on public.profiles to authenticated;

-- Explicitly constrain callable SECURITY DEFINER helpers.
revoke all on function public.current_role() from public, anon;
revoke all on function public.is_batch_trainer(uuid) from public, anon;
revoke all on function public.is_batch_member(uuid) from public, anon;
grant execute on function public.current_role() to anon, authenticated;
grant execute on function public.is_batch_trainer(uuid) to authenticated;
grant execute on function public.is_batch_member(uuid) to authenticated;
revoke all on function public.handle_new_user() from public, anon, authenticated;
revoke all on function public.enforce_batch_capacity() from public, anon, authenticated;
revoke all on function public.list_open_batches() from public;
grant execute on function public.list_open_batches() to anon, authenticated;

create or replace function public.submit_quiz_attempt(p_quiz_id uuid,p_answers jsonb)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $fn$
declare
  v_user uuid := auth.uid();
  v_total integer;
  v_answer_count integer;
  v_correct integer;
  v_pass_percent integer;
  v_attempt_id uuid;
  v_feedback jsonb;
  v_item jsonb;
begin
  if v_user is null then raise exception 'Authentication required' using errcode='28000'; end if;
  if p_answers is null or jsonb_typeof(p_answers)<>'array' then raise exception 'Answers must be a JSON array' using errcode='22023'; end if;
  if pg_catalog.octet_length(p_answers::text)>12000 then raise exception 'Answer payload too large' using errcode='22023'; end if;
  v_answer_count := jsonb_array_length(p_answers);
  if v_answer_count<1 or v_answer_count>100 then raise exception 'Answer count out of range' using errcode='22023'; end if;
  if exists(select 1 from jsonb_array_elements(p_answers) a where jsonb_typeof(a)<>'object' or not (a ? 'question_id') or not (a ? 'option_id')) then
    raise exception 'Each answer must contain question_id and option_id' using errcode='22023';
  end if;
  if exists(select 1 from jsonb_array_elements(p_answers) a group by a->>'question_id' having count(*)>1) then
    raise exception 'Duplicate question IDs are not allowed' using errcode='22023';
  end if;
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(v_user::text||':'||p_quiz_id::text,0));
  if not exists(select 1 from public.quizzes q join public.lessons l on l.id=q.lesson_id where q.id=p_quiz_id and q.published and l.published) then
    raise exception 'Quiz is not published' using errcode='22023';
  end if;
  select count(*),max(q.pass_percent) into v_total,v_pass_percent from public.quiz_questions qq join public.quizzes q on q.id=qq.quiz_id where qq.quiz_id=p_quiz_id;
  if v_total<1 or v_total>100 or v_answer_count<>v_total then raise exception 'Submit exactly one answer for every quiz question' using errcode='22023'; end if;
  if exists(select 1 from jsonb_array_elements(p_answers) a where not exists(select 1 from public.quiz_questions qq where qq.id=(a->>'question_id')::uuid and qq.quiz_id=p_quiz_id)) then
    raise exception 'Question does not belong to this quiz' using errcode='22023';
  end if;
  if exists(
    select 1 from jsonb_array_elements(p_answers) a
    join public.quiz_questions qq on qq.id=(a->>'question_id')::uuid and qq.quiz_id=p_quiz_id
    where not exists(
      select 1 from jsonb_array_elements(qq.options) opt
      where opt->>'id'=a->>'option_id'
    )
  ) then
    raise exception 'Selected option does not belong to its question' using errcode='22023';
  end if;
  if (select count(*) from public.quiz_attempts a where a.learner_id=v_user and a.quiz_id=p_quiz_id and a.attempted_at>now()-interval '1 hour')>=10 then
    raise exception 'Hourly attempt limit reached' using errcode='P0001';
  end if;
  select count(*) into v_correct
  from jsonb_array_elements(p_answers) a
  join public.quiz_questions qq on qq.id=(a->>'question_id')::uuid and qq.quiz_id=p_quiz_id
  join lesson_private.quiz_answer_keys k on k.question_id=qq.id
  where k.correct_option_id=a->>'option_id';
  if (select count(*) from jsonb_array_elements(p_answers) a join public.quiz_questions qq on qq.id=(a->>'question_id')::uuid left join lesson_private.quiz_answer_keys k on k.question_id=qq.id where qq.quiz_id=p_quiz_id and k.question_id is null)>0 then
    raise exception 'Quiz answer key is incomplete' using errcode='P0001';
  end if;
  v_feedback := (select coalesce(jsonb_agg(jsonb_build_object('question_id',qq.id,'correct',(k.correct_option_id=a->>'option_id'),'explanation_en',k.explanation_en,'explanation_hi',k.explanation_hi) order by qq.position),'[]'::jsonb)
    from jsonb_array_elements(p_answers) a join public.quiz_questions qq on qq.id=(a->>'question_id')::uuid and qq.quiz_id=p_quiz_id join lesson_private.quiz_answer_keys k on k.question_id=qq.id);
  insert into public.quiz_attempts(learner_id,quiz_id,score,max_score,passed,answers)
  values(v_user,p_quiz_id,round(v_correct::numeric*100/v_total),100,round(v_correct::numeric*100/v_total)>=v_pass_percent,p_answers)
  returning id into v_attempt_id;
  return jsonb_build_object('attempt_id',v_attempt_id,'score',round(v_correct::numeric*100/v_total),'max_score',100,'passed',round(v_correct::numeric*100/v_total)>=v_pass_percent,'best_score',
    (select max(a.score) from public.quiz_attempts a where a.learner_id=v_user and a.quiz_id=p_quiz_id),'feedback',v_feedback);
end;
$fn$;

create or replace function public.mark_lesson_complete(p_lesson_id uuid)
returns boolean
language plpgsql
security definer
set search_path = ''
as $fn$
declare v_user uuid := auth.uid();
begin
  if v_user is null then raise exception 'Authentication required' using errcode='28000'; end if;
  if not exists(select 1 from public.lessons l join public.quizzes q on q.lesson_id=l.id join public.quiz_attempts a on a.quiz_id=q.id where l.id=p_lesson_id and l.published and q.published and a.learner_id=v_user and a.passed) then
    raise exception 'A passing quiz attempt is required before completion' using errcode='42501';
  end if;
  insert into public.lesson_progress(learner_id,lesson_id,completed,completed_at)
  values(v_user,p_lesson_id,true,now())
  on conflict(learner_id,lesson_id) do update set completed=true,completed_at=coalesce(public.lesson_progress.completed_at,excluded.completed_at);
  return true;
end;
$fn$;

revoke all on function public.submit_quiz_attempt(uuid,jsonb) from public,anon;
grant execute on function public.submit_quiz_attempt(uuid,jsonb) to authenticated;
revoke all on function public.mark_lesson_complete(uuid) from public,anon;
grant execute on function public.mark_lesson_complete(uuid) to authenticated;

grant select on public.courses,public.course_tracks,public.quizzes,public.quiz_questions to anon,authenticated;
grant select on public.quiz_attempts to authenticated;
grant select,insert,update on public.exercise_results to authenticated;
create or replace view public.learner_course_progress with (security_invoker=true) as
select lp.learner_id,l.course_id,count(*) filter(where lp.completed) as completed_lessons,count(*) as started_lessons,
 count(*) filter(where lp.completed)::numeric/nullif(count(*),0)::numeric as completion_ratio,
 max(lp.completed_at) filter(where lp.completed) as last_completed_at
from public.lesson_progress lp join public.lessons l on l.id=lp.lesson_id
where l.course_id is not null group by lp.learner_id,l.course_id;
grant select on public.learner_course_progress to authenticated;

commit;
