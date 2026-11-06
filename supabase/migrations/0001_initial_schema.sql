-- SYJ WebAcademy initial schema
-- Apply in Supabase SQL Editor. RLS is enabled on every application table.
create extension if not exists pgcrypto;

create type public.app_role as enum ('learner', 'trainer', 'admin');
create type public.batch_status as enum ('upcoming', 'active', 'completed');
create type public.submission_status as enum ('submitted', 'reviewing', 'approved', 'revision_requested');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default '',
  preferred_language text not null default 'en' check (preferred_language in ('en','hi')),
  role public.app_role not null default 'learner',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.batches (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null default '',
  status public.batch_status not null default 'upcoming',
  trainer_id uuid not null references public.profiles(id),
  starts_on date,
  ends_on date,
  capacity integer not null default 50 check (capacity between 1 and 50),
  created_at timestamptz not null default now()
);

create table public.batch_memberships (
  id uuid primary key default gen_random_uuid(),
  batch_id uuid not null references public.batches(id) on delete cascade,
  learner_id uuid not null references public.profiles(id) on delete cascade,
  joined_at timestamptz not null default now(),
  unique(batch_id, learner_id)
);

create table public.lessons (
  id uuid primary key default gen_random_uuid(),
  day_number integer not null unique check (day_number between 1 and 40),
  title_en text not null,
  title_hi text not null,
  summary_en text not null default '',
  summary_hi text not null default '',
  content_en text not null default '',
  content_hi text not null default '',
  stage text not null default 'Foundations',
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.lesson_progress (
  id uuid primary key default gen_random_uuid(),
  learner_id uuid not null references public.profiles(id) on delete cascade,
  lesson_id uuid not null references public.lessons(id) on delete cascade,
  completed boolean not null default false,
  completed_at timestamptz,
  unique(learner_id, lesson_id)
);

create table public.assignments (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid not null references public.lessons(id) on delete cascade,
  batch_id uuid references public.batches(id) on delete cascade,
  title_en text not null,
  title_hi text not null,
  instructions_en text not null default '',
  instructions_hi text not null default '',
  due_at timestamptz,
  published boolean not null default false,
  created_by uuid not null references public.profiles(id),
  created_at timestamptz not null default now()
);

create table public.submissions (
  id uuid primary key default gen_random_uuid(),
  assignment_id uuid not null references public.assignments(id) on delete cascade,
  learner_id uuid not null references public.profiles(id) on delete cascade,
  repository_url text not null check (repository_url ~ '^https?://'),
  live_url text check (live_url is null or live_url ~ '^https?://'),
  notes text not null default '',
  status public.submission_status not null default 'submitted',
  feedback text not null default '',
  reviewed_by uuid references public.profiles(id),
  submitted_at timestamptz not null default now(),
  reviewed_at timestamptz,
  unique(assignment_id, learner_id)
);

create table public.attendance (
  id uuid primary key default gen_random_uuid(),
  batch_id uuid not null references public.batches(id) on delete cascade,
  learner_id uuid not null references public.profiles(id) on delete cascade,
  session_date date not null default current_date,
  present boolean not null default false,
  marked_by uuid not null references public.profiles(id),
  unique(batch_id, learner_id, session_date)
);

create index batch_memberships_learner_idx on public.batch_memberships(learner_id);
create index lesson_progress_learner_idx on public.lesson_progress(learner_id);
create index submissions_learner_idx on public.submissions(learner_id);
create index assignments_lesson_idx on public.assignments(lesson_id);

-- Security-definer helpers avoid recursive RLS policy evaluation.
create or replace function public.current_role()
returns public.app_role language sql stable security definer
set search_path = public, pg_temp
as $$ select role from public.profiles where id = (select auth.uid()) $$;

create or replace function public.is_batch_trainer(target_batch uuid)
returns boolean language sql stable security definer
set search_path = public, pg_temp
as $$
  select exists (
    select 1 from public.batches b
    where b.id = target_batch and ((b.trainer_id = (select auth.uid()) and public.current_role() in ('trainer','admin')) or public.current_role() = 'admin')
  )
$$;

create or replace function public.is_batch_member(target_batch uuid)
returns boolean language sql stable security definer
set search_path = public, pg_temp
as $$
  select exists (
    select 1 from public.batch_memberships m
    where m.batch_id = target_batch and m.learner_id = (select auth.uid())
  )
$$;

-- New signups always become learners; clients cannot select their role.
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer
set search_path = public, pg_temp
as $$
begin
  insert into public.profiles (id, full_name, preferred_language)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    case when new.raw_user_meta_data->>'preferred_language' = 'hi' then 'hi' else 'en' end
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Enforce capacity at the database layer (not just in the UI).
create or replace function public.enforce_batch_capacity()
returns trigger language plpgsql security definer
set search_path = public, pg_temp
as $$
declare current_capacity integer; current_count integer;
begin
  select capacity into current_capacity from public.batches where id = new.batch_id for update;
  if current_capacity is null then raise exception 'Batch not found'; end if;
  select count(*) into current_count from public.batch_memberships where batch_id = new.batch_id;
  if current_count >= current_capacity then raise exception 'This batch is full'; end if;
  return new;
end;
$$;

create trigger check_batch_capacity
  before insert on public.batch_memberships
  for each row execute procedure public.enforce_batch_capacity();

alter table public.profiles enable row level security;
alter table public.batches enable row level security;
alter table public.batch_memberships enable row level security;
alter table public.lessons enable row level security;
alter table public.lesson_progress enable row level security;
alter table public.assignments enable row level security;
alter table public.submissions enable row level security;
alter table public.attendance enable row level security;

-- Profiles: users can read/update their own profile; trainers/admins can read learners in their batches.
create policy "profiles_read_self_or_admin" on public.profiles for select to authenticated
using (id = (select auth.uid()) or public.current_role() = 'admin');
create policy "profiles_update_self" on public.profiles for update to authenticated
using (id = (select auth.uid())) with check (id = (select auth.uid()) and role = public.current_role());
create policy "trainer_reads_batch_learners" on public.profiles for select to authenticated
using (
  exists (select 1 from public.batch_memberships m join public.batches b on b.id=m.batch_id
          where m.learner_id=profiles.id and (b.trainer_id=(select auth.uid()) or public.current_role()='admin'))
);

-- Batches: visible to members and their trainer; active/upcoming batches are discoverable for open enrolment.
create policy "discover_open_batches" on public.batches for select to anon, authenticated
using (status in ('upcoming','active'));
create policy "batch_member_or_trainer_read" on public.batches for select to authenticated
using (trainer_id=(select auth.uid()) or public.is_batch_member(id) or public.current_role()='admin');
create policy "trainer_manage_own_batches" on public.batches for all to authenticated
using ((trainer_id=(select auth.uid()) and public.current_role() in ('trainer','admin')) or public.current_role()='admin')
with check ((trainer_id=(select auth.uid()) and public.current_role() in ('trainer','admin')) or public.current_role()='admin');

-- Membership: learner may join themselves; trainer/admin can inspect and manage their batch.
create policy "learner_join_batch" on public.batch_memberships for insert to authenticated
with check (learner_id=(select auth.uid()) and public.current_role()='learner' and exists (select 1 from public.batches b where b.id=batch_id and b.status in ('upcoming','active')));
create policy "membership_read_self_or_trainer" on public.batch_memberships for select to authenticated
using (learner_id=(select auth.uid()) or public.is_batch_trainer(batch_id));
create policy "trainer_remove_members" on public.batch_memberships for delete to authenticated
using (public.is_batch_trainer(batch_id));

-- Curriculum: published lessons are public; trainer/admin can manage content.
create policy "read_published_lessons" on public.lessons for select to anon, authenticated
using (published or public.current_role() in ('trainer','admin'));
create policy "trainer_manage_lessons" on public.lessons for all to authenticated
using (public.current_role() in ('trainer','admin'))
with check (public.current_role() in ('trainer','admin'));

create policy "learner_own_progress" on public.lesson_progress for select to authenticated
using (learner_id=(select auth.uid()));
create policy "learner_write_own_progress" on public.lesson_progress for insert to authenticated
with check (learner_id=(select auth.uid()) and exists (select 1 from public.lessons l where l.id=lesson_id and l.published));
create policy "learner_update_own_progress" on public.lesson_progress for update to authenticated
using (learner_id=(select auth.uid())) with check (learner_id=(select auth.uid()));

create policy "read_published_assignments" on public.assignments for select to authenticated
using ((published and (batch_id is null or public.is_batch_member(batch_id))) or public.current_role()='admin' or (public.current_role()='trainer' and batch_id is not null and public.is_batch_trainer(batch_id)));
create policy "trainer_manage_assignments" on public.assignments for all to authenticated
using (public.current_role()='admin' or (public.current_role()='trainer' and batch_id is not null and public.is_batch_trainer(batch_id)))
with check (public.current_role()='admin' or (public.current_role()='trainer' and batch_id is not null and public.is_batch_trainer(batch_id)));

create policy "learner_read_own_submissions" on public.submissions for select to authenticated
using (learner_id=(select auth.uid()) or public.current_role()='admin' or exists (
  select 1 from public.assignments a join public.batch_memberships m on m.batch_id=a.batch_id
  join public.batches b on b.id=a.batch_id
  where a.id=assignment_id and m.learner_id=submissions.learner_id
    and b.trainer_id=(select auth.uid()) and public.current_role()='trainer'
));
create policy "learner_submit_own_work" on public.submissions for insert to authenticated
with check (learner_id=(select auth.uid()) and exists (
  select 1 from public.assignments a where a.id=assignment_id and a.published
    and (a.batch_id is null or public.is_batch_member(a.batch_id))
));
create policy "learner_update_own_submission" on public.submissions for update to authenticated
using (learner_id=(select auth.uid()) and status in ('submitted','revision_requested'))
with check (learner_id=(select auth.uid()) and status in ('submitted','revision_requested'));
create policy "trainer_review_submissions" on public.submissions for update to authenticated
using (public.current_role()='admin' or exists (
  select 1 from public.assignments a join public.batches b on b.id=a.batch_id
  join public.batch_memberships m on m.batch_id=a.batch_id
  where a.id=assignment_id and m.learner_id=submissions.learner_id
    and b.trainer_id=(select auth.uid()) and public.current_role()='trainer'
))
with check (public.current_role()='admin' or exists (
  select 1 from public.assignments a join public.batches b on b.id=a.batch_id
  join public.batch_memberships m on m.batch_id=a.batch_id
  where a.id=assignment_id and m.learner_id=submissions.learner_id
    and b.trainer_id=(select auth.uid()) and public.current_role()='trainer'
));

create policy "learner_read_own_attendance" on public.attendance for select to authenticated
using (learner_id=(select auth.uid()) or public.is_batch_trainer(batch_id));
create policy "trainer_manage_attendance" on public.attendance for all to authenticated
using (public.is_batch_trainer(batch_id))
with check (public.is_batch_trainer(batch_id));

-- Expose aggregate seat counts only; never expose membership identities publicly.
create or replace function public.list_open_batches()
returns table(id uuid, name text, capacity integer, status public.batch_status, enrolled_count bigint)
language sql stable security definer
set search_path = public, pg_temp
as $batch_list$
  select b.id, b.name, b.capacity, b.status, count(m.id) as enrolled_count
  from public.batches b
  left join public.batch_memberships m on m.batch_id=b.id
  where b.status in ('upcoming','active')
  group by b.id
  order by b.created_at
$batch_list$;
grant execute on function public.list_open_batches() to anon, authenticated;

-- Grant only the minimum table privileges; RLS remains authoritative.
grant usage on schema public to anon, authenticated;
grant select on public.batches, public.lessons to anon;
grant select, update on public.profiles to authenticated;
grant select, insert, delete on public.batch_memberships to authenticated;
grant select, insert, update on public.lesson_progress to authenticated;
grant select, insert, update, delete on public.batches, public.lessons, public.assignments to authenticated;
grant select, insert, update on public.submissions to authenticated;
grant select, insert, update, delete on public.attendance to authenticated;

-- Trusted owner bootstrap (run manually after the owner account signs up):
-- update public.profiles set role = 'admin' where id = '<AUTH_USER_UUID>';
