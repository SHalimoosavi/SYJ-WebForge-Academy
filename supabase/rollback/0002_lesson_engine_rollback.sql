-- ROLLBACK ONLY after explicit production approval and a verified backup.
-- Refuses to discard assessment/exercise data. Existing lessons and lesson_progress are retained.
begin;
do $$
begin
  if exists(select 1 from public.quiz_attempts) then
    raise exception 'Rollback blocked: quiz_attempts contains learner data. Export and obtain owner approval first.';
  end if;
  if exists(select 1 from public.exercise_results) then
    raise exception 'Rollback blocked: exercise_results contains learner data. Export and obtain owner approval first.';
  end if;
end $$;

drop view if exists public.learner_course_progress;
drop function if exists public.submit_quiz_attempt(uuid,jsonb);
drop function if exists public.mark_lesson_complete(uuid);
drop table if exists public.quiz_attempts;
drop table if exists public.exercise_results;
drop table if exists lesson_private.quiz_answer_keys;
drop table if exists public.quiz_questions;
drop table if exists public.quizzes;
drop schema if exists lesson_private;
drop index if exists public.lessons_course_track_day_idx;
alter table public.lessons drop column if exists track_id;
alter table public.lessons drop column if exists course_id;
drop table if exists public.course_tracks;
drop table if exists public.courses;
commit;
