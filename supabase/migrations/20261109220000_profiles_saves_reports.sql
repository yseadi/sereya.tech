-- Profile photos, saved signals and downloadable report PDFs. Safe to run more than once.

-- 1. Profile photos ---------------------------------------------------------
alter table public.profiles add column if not exists avatar_url text not null default ''
  check (avatar_url = '' or (avatar_url ~ '^https?://' and char_length(avatar_url) <= 500));
grant update (avatar_url) on public.profiles to authenticated;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('avatars', 'avatars', true, 2097152, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do update set public = true, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;

-- Each member writes only inside a folder named after their own id.
drop policy if exists "Members add their photo" on storage.objects;
create policy "Members add their photo" on storage.objects for insert to authenticated
  with check (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);
drop policy if exists "Members change their photo" on storage.objects;
create policy "Members change their photo" on storage.objects for update to authenticated
  using (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);
drop policy if exists "Members remove their photo" on storage.objects;
create policy "Members remove their photo" on storage.objects for delete to authenticated
  using (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);

-- 2. Saved signals ----------------------------------------------------------
create table if not exists public.saved_posts (
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  post_id uuid not null references public.posts (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, post_id)
);
create index if not exists saved_posts_user_idx on public.saved_posts (user_id, created_at desc);
alter table public.saved_posts enable row level security;

drop policy if exists "Members see what they saved" on public.saved_posts;
create policy "Members see what they saved" on public.saved_posts for select to authenticated
  using (user_id = auth.uid());
drop policy if exists "Members save published signals" on public.saved_posts;
create policy "Members save published signals" on public.saved_posts for insert to authenticated
  with check (user_id = auth.uid() and exists (select 1 from public.posts p where p.id = post_id and p.status = 'published'));
drop policy if exists "Members unsave" on public.saved_posts;
create policy "Members unsave" on public.saved_posts for delete to authenticated
  using (user_id = auth.uid());
revoke all on public.saved_posts from anon;
grant select, insert, delete on public.saved_posts to authenticated;

-- 3. Report PDFs -------------------------------------------------------------
alter table public.posts add column if not exists pdf_url text not null default ''
  check (pdf_url = '' or (pdf_url ~ '^https?://' and char_length(pdf_url) <= 500));
alter table public.posts add column if not exists pdf_size integer not null default 0;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('reports', 'reports', true, 52428800, array['application/pdf'])
on conflict (id) do update set public = true, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Owner adds reports" on storage.objects;
create policy "Owner adds reports" on storage.objects for insert to authenticated
  with check (bucket_id = 'reports' and public.is_owner());
drop policy if exists "Owner changes reports" on storage.objects;
create policy "Owner changes reports" on storage.objects for update to authenticated
  using (bucket_id = 'reports' and public.is_owner());
drop policy if exists "Owner removes reports" on storage.objects;
create policy "Owner removes reports" on storage.objects for delete to authenticated
  using (bucket_id = 'reports' and public.is_owner());
