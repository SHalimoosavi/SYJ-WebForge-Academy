\set ON_ERROR_STOP on
insert into auth.users(id,raw_user_meta_data) values
 ('10000000-0000-4000-8000-000000000001','{"full_name":"Learner One"}'),
 ('10000000-0000-4000-8000-000000000002','{"full_name":"Learner Two"}'),
 ('10000000-0000-4000-8000-000000000003','{"full_name":"Learner Three"}')
on conflict(id) do nothing;
insert into public.lesson_progress(learner_id,lesson_id,completed,completed_at)
select '10000000-0000-4000-8000-000000000001',id,true,now()-interval '1 day'
from public.lessons where day_number=1
on conflict(learner_id,lesson_id) do nothing;
insert into public.lesson_progress(learner_id,lesson_id,completed,completed_at)
select '10000000-0000-4000-8000-000000000002',id,true,now()-interval '2 days'
from public.lessons where day_number=2
on conflict(learner_id,lesson_id) do nothing;
