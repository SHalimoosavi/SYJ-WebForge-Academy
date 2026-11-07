\set ON_ERROR_STOP on

-- Deterministic auth fixtures. The baseline trigger creates learner profiles.
insert into auth.users(id,raw_user_meta_data) values
 ('10000000-0000-4000-8000-000000000001','{"full_name":"Learner One"}'),
 ('10000000-0000-4000-8000-000000000002','{"full_name":"Learner Two"}')
on conflict(id) do nothing;

-- Seed one two-question quiz and one quiz with no attempts for completion-denial coverage.
insert into public.quizzes(id,lesson_id,title_en,title_hi,pass_percent,published)
select '20000000-0000-4000-8000-000000000001',id,'Day 1 Check','दिन 1 जाँच',70,true
from public.lessons where day_number=1
on conflict(id) do nothing;
insert into public.quizzes(id,lesson_id,title_en,title_hi,pass_percent,published)
select '20000000-0000-4000-8000-000000000002',id,'Day 2 Check','दिन 2 जाँच',70,true
from public.lessons where day_number=2
on conflict(id) do nothing;

insert into public.quiz_questions(id,quiz_id,position,prompt_en,prompt_hi,options) values
 ('30000000-0000-4000-8000-000000000001','20000000-0000-4000-8000-000000000001',1,'Which identifies a resource on the web?','वेब पर resource की पहचान क्या करता है?','[{"id":"a","label":"URL"},{"id":"b","label":"CSS"}]'),
 ('30000000-0000-4000-8000-000000000002','20000000-0000-4000-8000-000000000001',2,'Which requests a web page?','वेब पेज का अनुरोध कौन करता है?','[{"id":"a","label":"Browser"},{"id":"b","label":"Database"}]')
on conflict(id) do nothing;
insert into private.quiz_answer_keys(question_id,correct_option_id,explanation_en,explanation_hi) values
 ('30000000-0000-4000-8000-000000000001','a','A URL identifies a resource location.','URL resource का पता बताता है।'),
 ('30000000-0000-4000-8000-000000000002','a','A browser requests and displays web resources.','Browser web resources का अनुरोध और प्रदर्शन करता है।')
on conflict(question_id) do nothing;

-- No client insert privilege and no answer-key access.
do $$
begin
  if has_table_privilege('authenticated','public.quiz_attempts','insert') then raise exception 'authenticated unexpectedly has quiz_attempts INSERT'; end if;
  if has_table_privilege('authenticated','private.quiz_answer_keys','select') then raise exception 'authenticated unexpectedly has answer-key SELECT'; end if;
  if has_table_privilege('anon','private.quiz_answer_keys','select') then raise exception 'anon unexpectedly has answer-key SELECT'; end if;
  if has_table_privilege('anon','public.quiz_attempts','select') then raise exception 'anon unexpectedly has quiz_attempts SELECT'; end if;
  if has_table_privilege('anon','public.exercise_results','select') then raise exception 'anon unexpectedly has exercise_results SELECT'; end if;
  if has_column_privilege('authenticated','public.profiles','role','update') then raise exception 'authenticated unexpectedly can update profile role'; end if;
end $$;

-- A pre-existing attempt belonging to learner two must remain invisible to learner one.
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
    perform public.mark_lesson_complete((select id from public.lessons where day_number=2));
    raise exception 'Completion without passing attempt unexpectedly succeeded';
  exception when insufficient_privilege then null;
  end;
  begin
    perform private.quiz_answer_keys.question_id from private.quiz_answer_keys;
    raise exception 'Answer-key read unexpectedly succeeded';
  exception when insufficient_privilege then null;
  end;
end $$;

-- Legacy progress must remain intact after the new schema is applied.
reset role;
do $
begin
  if not exists(select 1 from public.lesson_progress lp join public.lessons l on l.id=lp.lesson_id
    where lp.learner_id='10000000-0000-4000-8000-000000000001' and l.day_number=1 and lp.completed) then
    raise exception 'Pre-existing learner progress was not preserved';
  end if;
  if (select count(*) from public.lessons where day_number between 1 and 40)<>40 then
    raise exception 'Existing 40-day lesson catalogue was not preserved';
  end if;
end $;
set role authenticated;
select set_config('request.jwt.claim.sub','10000000-0000-4000-8000-000000000001',false);

-- RPC submission returns computed score and post-submission explanations.
select public.submit_quiz_attempt(
 '20000000-0000-4000-8000-000000000001',
 '[{"question_id":"30000000-0000-4000-8000-000000000001","option_id":"a"},{"question_id":"30000000-0000-4000-8000-000000000002","option_id":"a"}]'::jsonb
) as successful_submission;

select public.mark_lesson_complete((select id from public.lessons where day_number=1));

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

reset role;
select 'lesson_engine_security_tests_passed' as result;
