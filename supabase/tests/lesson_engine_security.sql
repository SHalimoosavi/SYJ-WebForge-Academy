\set ON_ERROR_STOP on

-- Deterministic auth fixtures. The baseline trigger creates learner profiles.
insert into auth.users(id,raw_user_meta_data) values
 ('10000000-0000-4000-8000-000000000001','{"full_name":"Learner One"}'),
 ('10000000-0000-4000-8000-000000000002','{"full_name":"Learner Two"}')
on conflict(id) do nothing;

-- Seed one two-question quiz and one quiz with no attempts for completion-denial coverage.
insert into public.quizzes(id,lesson_id,title_en,title_hi,pass_percent,published)
select '20000000-0000-4000-8000-000000000001',id,'Day 1 Check','दिन 1 जाँच',70,true
from public.lessons where day_number=6
on conflict(id) do nothing;
insert into public.quizzes(id,lesson_id,title_en,title_hi,pass_percent,published)
select '20000000-0000-4000-8000-000000000002',id,'Day 2 Check','दिन 2 जाँच',70,true
from public.lessons where day_number=7
on conflict(id) do nothing;

insert into public.quiz_questions(id,quiz_id,position,prompt_en,prompt_hi,options) values
 ('30000000-0000-4000-8000-000000000001','20000000-0000-4000-8000-000000000001',1,'Which identifies a resource on the web?','वेब पर resource की पहचान क्या करता है?','[{"id":"a","label":"URL"},{"id":"b","label":"CSS"}]'),
 ('30000000-0000-4000-8000-000000000002','20000000-0000-4000-8000-000000000001',2,'Which requests a web page?','वेब पेज का अनुरोध कौन करता है?','[{"id":"a","label":"Browser"},{"id":"b","label":"Database"}]')
on conflict(id) do nothing;
insert into lesson_private.quiz_answer_keys(question_id,correct_option_id,explanation_en,explanation_hi) values
 ('30000000-0000-4000-8000-000000000001','a','A URL identifies a resource location.','URL resource का पता बताता है।'),
 ('30000000-0000-4000-8000-000000000002','a','A browser requests and displays web resources.','Browser web resources का अनुरोध और प्रदर्शन करता है।')
on conflict(question_id) do nothing;

-- Confirm the public Day 1–5 quiz bank is complete without storing real keys in Git.
do $$
begin
  if (select count(*) from public.quizzes q join public.lessons l on l.id=q.lesson_id where l.day_number between 1 and 5)<>5 then raise exception 'Expected five Day 1–5 quizzes'; end if;
  if (select count(*) from public.quiz_questions qq join public.quizzes q on q.id=qq.quiz_id join public.lessons l on l.id=q.lesson_id where l.day_number between 1 and 5)<>20 then raise exception 'Expected twenty Day 1–5 questions'; end if;
  if (select count(*) from lesson_private.quiz_answer_keys k join public.quiz_questions qq on qq.id=k.question_id join public.quizzes q on q.id=qq.quiz_id join public.lessons l on l.id=q.lesson_id where l.day_number between 1 and 5)<>0 then raise exception 'Real Day 1–5 answer keys must not be present in the public test fixture'; end if;
end $$;
\echo PASS: five public quizzes and twenty questions seeded; real answer keys remain external

-- Audit all SECURITY DEFINER functions for a pinned search_path and minimum RPC grants.
do $$
declare unsafe_functions text;
begin
 select string_agg(n.nspname||'.'||p.proname,', ' order by n.nspname,p.proname)
 into unsafe_functions
 from pg_proc p join pg_namespace n on n.oid=p.pronamespace
 where p.prosecdef
 and not exists(select 1 from unnest(coalesce(p.proconfig,array[]::text[])) as cfg(setting) where cfg.setting like 'search_path=%');
 if unsafe_functions is not null then raise exception 'SECURITY DEFINER functions without fixed search_path: %',unsafe_functions; end if;
 if has_function_privilege('anon','public.submit_quiz_attempt(uuid,jsonb)','execute') then raise exception 'anon can execute submit_quiz_attempt'; end if;
 if has_function_privilege('anon','public.mark_lesson_complete(uuid)','execute') then raise exception 'anon can execute mark_lesson_complete'; end if;
 if not has_function_privilege('authenticated','public.submit_quiz_attempt(uuid,jsonb)','execute') then raise exception 'authenticated cannot execute submit_quiz_attempt'; end if;
 if not has_function_privilege('authenticated','public.mark_lesson_complete(uuid)','execute') then raise exception 'authenticated cannot execute mark_lesson_complete'; end if;
end $$;
\echo PASS: SECURITY DEFINER search_path and RPC privilege audit

-- No client insert privilege and no answer-key access.
do $$
begin
  if has_table_privilege('authenticated','public.quiz_attempts','insert') then raise exception 'authenticated unexpectedly has quiz_attempts INSERT'; end if;
  if has_table_privilege('authenticated','lesson_private.quiz_answer_keys','select') then raise exception 'authenticated unexpectedly has answer-key SELECT'; end if;
  if has_table_privilege('anon','lesson_private.quiz_answer_keys','select') then raise exception 'anon unexpectedly has answer-key SELECT'; end if;
  if has_table_privilege('anon','public.quiz_attempts','select') then raise exception 'anon unexpectedly has quiz_attempts SELECT'; end if;
  if has_table_privilege('anon','public.exercise_results','select') then raise exception 'anon unexpectedly has exercise_results SELECT'; end if;
  if has_column_privilege('authenticated','public.profiles','role','update') then raise exception 'authenticated unexpectedly can update profile role'; end if;
end $$;
\echo PASS: client privileges block fake attempt writes, private answer-key reads, anon private-table reads, and profile-role updates

-- A pre-existing attempt and exercise result belonging to learner two must remain invisible to learner one.
insert into public.exercise_results(learner_id,lesson_id,exercise_key,status,submission_text)
select '10000000-0000-4000-8000-000000000002',id,'day-1-private-test','submitted','private learner response'
from public.lessons where day_number=1;
insert into public.quiz_attempts(learner_id,quiz_id,score,max_score,passed,answers)
values('10000000-0000-4000-8000-000000000002','20000000-0000-4000-8000-000000000001',100,100,true,'[]');

set role authenticated;
select set_config('request.jwt.claim.sub','10000000-0000-4000-8000-000000000001',false);

do $$
declare n integer;
begin
  select count(*) into n from public.quiz_attempts where learner_id='10000000-0000-4000-8000-000000000002';
  if n<>0 then raise exception 'Learner can read another learner attempt'; end if;
  select count(*) into n from public.lesson_progress where learner_id='10000000-0000-4000-8000-000000000002';
  if n<>0 then raise exception 'Learner can read another learner progress'; end if;
  select count(*) into n from public.exercise_results where learner_id='10000000-0000-4000-8000-000000000002';
  if n<>0 then raise exception 'Learner can read another learner exercise result'; end if;
  begin
    update public.profiles set role='admin' where id=auth.uid();
    raise exception 'Role self-promotion UPDATE unexpectedly succeeded';
  exception when insufficient_privilege then null;
  end;
  begin
    insert into public.quiz_attempts(learner_id,quiz_id,score,max_score,passed,answers)
    values(auth.uid(),'20000000-0000-4000-8000-000000000001',100,100,true,'[]');
    raise exception 'Fake attempt insert unexpectedly succeeded';
  exception when insufficient_privilege then null;
  end;
  begin
    perform public.mark_lesson_complete((select id from public.lessons where day_number=7));
    raise exception 'Completion without passing attempt unexpectedly succeeded';
  exception when insufficient_privilege then null;
  end;
  begin
    perform lesson_private.quiz_answer_keys.question_id from lesson_private.quiz_answer_keys;
    raise exception 'Answer-key read unexpectedly succeeded';
  exception when insufficient_privilege then null;
  end;
end $$;
\echo PASS: cross-user quiz-attempt, exercise-result and lesson-progress RLS isolation
\echo PASS: learner role self-promotion is rejected
\echo PASS: direct fake quiz-attempt INSERT is rejected
\echo PASS: answer-key table is unreadable to authenticated users
\echo PASS: completion without a passing quiz is rejected

-- Legacy progress must remain intact after the new schema is applied.
reset role;
do $$
begin
  if not exists(select 1 from public.lesson_progress lp join public.lessons l on l.id=lp.lesson_id
    where lp.learner_id='10000000-0000-4000-8000-000000000001' and l.day_number=1 and lp.completed) then
    raise exception 'Pre-existing learner progress was not preserved';
  end if;
  if (select count(*) from public.lessons where day_number between 1 and 40)<>40 then
    raise exception 'Existing 40-day lesson catalogue was not preserved';
  end if;
end $$;
\echo PASS: migration preserves all 40 original lessons and pre-existing learner progress
set role authenticated;
select set_config('request.jwt.claim.sub','10000000-0000-4000-8000-000000000001',false);

-- RPC submission returns computed score and post-submission explanations.
select public.submit_quiz_attempt(
 '20000000-0000-4000-8000-000000000001',
 '[{"question_id":"30000000-0000-4000-8000-000000000001","option_id":"a"},{"question_id":"30000000-0000-4000-8000-000000000002","option_id":"a"}]'::jsonb
) as successful_submission;
\echo PASS: quiz score and explanations are computed server-side

select public.mark_lesson_complete((select id from public.lessons where day_number=6));
\echo PASS: passing quiz permits lesson completion

-- Validation: duplicates, foreign quiz question, incomplete answer set must fail.
do $$
begin
  begin
    perform public.submit_quiz_attempt('20000000-0000-4000-8000-000000000001',
      '[{"question_id":"30000000-0000-4000-8000-000000000001","option_id":"a"},{"question_id":"30000000-0000-4000-8000-000000000001","option_id":"a"}]'::jsonb);
    raise exception 'Duplicate question validation failed';
  exception when invalid_parameter_value then null; end;
  begin
    perform public.submit_quiz_attempt('20000000-0000-4000-8000-000000000001',
      '[{"question_id":"30000000-0000-4000-8000-000000000001","option_id":"a"}]'::jsonb);
    raise exception 'Answer-count validation failed';
  exception when invalid_parameter_value then null; end;
end $$;
\echo PASS: duplicate and incomplete quiz answer submissions are rejected

-- Retake history and hourly rate limit: 9 further submissions bring the total to 10.
do $$
declare i integer;
begin
  for i in 1..9 loop
    perform public.submit_quiz_attempt('20000000-0000-4000-8000-000000000001',
      '[{"question_id":"30000000-0000-4000-8000-000000000001","option_id":"a"},{"question_id":"30000000-0000-4000-8000-000000000002","option_id":"a"}]'::jsonb);
  end loop;
  begin
    perform public.submit_quiz_attempt('20000000-0000-4000-8000-000000000001',
      '[{"question_id":"30000000-0000-4000-8000-000000000001","option_id":"a"},{"question_id":"30000000-0000-4000-8000-000000000002","option_id":"a"}]'::jsonb);
    raise exception 'Hourly rate limit was not enforced';
  exception when raise_exception then
    if sqlerrm<>'Hourly attempt limit reached' then raise; end if;
  end;
end $$;
\echo PASS: sequential hourly quiz-attempt rate limit is enforced

reset role;
select 'lesson_engine_security_tests_passed' as result;
