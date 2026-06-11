create table if not exists public.course_follows (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (course_id, user_id)
);

create index if not exists course_follows_course_id_idx
  on public.course_follows (course_id);

create index if not exists course_follows_user_id_idx
  on public.course_follows (user_id);

alter table public.course_follows enable row level security;

create policy "Users can view follows"
on public.course_follows
for select
to public
using (true);

create policy "Users can follow courses"
on public.course_follows
for insert
to authenticated
with check (auth.uid() = user_id);

create policy "Users can unfollow courses"
on public.course_follows
for delete
to authenticated
using (auth.uid() = user_id);
