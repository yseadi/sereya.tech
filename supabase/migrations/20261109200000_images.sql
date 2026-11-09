-- Photos Yasmim uploads by hand when a source's photo doesn't come.
-- A public bucket: anyone can see the photos, only the owner adds or removes them.
-- Safe to run more than once.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('images', 'images', true, 5242880, array['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif'])
on conflict (id) do update set public = true, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Owner adds images" on storage.objects;
create policy "Owner adds images" on storage.objects for insert to authenticated
  with check (bucket_id = 'images' and public.is_owner());

drop policy if exists "Owner changes images" on storage.objects;
create policy "Owner changes images" on storage.objects for update to authenticated
  using (bucket_id = 'images' and public.is_owner());

drop policy if exists "Owner removes images" on storage.objects;
create policy "Owner removes images" on storage.objects for delete to authenticated
  using (bucket_id = 'images' and public.is_owner());
