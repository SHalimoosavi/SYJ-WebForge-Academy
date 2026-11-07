-- Contract smoke test for the OLD main-branch frontend against schema 0002.
-- Run after bootstrap, 0001, seed, pre_migration_fixtures and 0002.
\set ON_ERROR_STOP on
begin;
set local role authenticated;
select set_config('request.jwt.claim.sub','10000000-0000-4000-8000-000000000001',true);

-- Reads performed by the original main App.tsx.
select id,full_name,role,preferred_language from public.profiles
 where id=auth.uid();
select batch_id from public.batch_memberships where learner_id=auth.uid() limit 1;
select completed,lessons(day_number) from public.lesson_progress
 where learner_id=auth.uid() and completed=true;
select id from public.lessons where day_number=1 limit 1;
select * from public.list_open_batches();

-- Original dashboard completion used direct lesson_progress upsert.
-- Preserve this contract so main can be deployed before the new UI is merged.
insert into public.lesson_progress(learner_id,lesson_id,completed,completed_at)
select auth.uid(),id,true,now() from public.lessons where day_number=1
on conflict(learner_id,lesson_id) do update
set completed=true,completed_at=coalesce(public.lesson_progress.completed_at,excluded.completed_at);

rollback;
