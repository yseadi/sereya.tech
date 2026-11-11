-- Clusters: Yasmim's own named collections of signals ("isabela"), shared by link.
-- Only the owner creates and edits them. Anyone with the link sees the cards through
-- cluster_by_slug(), which returns one cluster at a time, so the list itself stays private.

create table public.clusters (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9][a-z0-9-]{2,90}$'),
  name text not null check (char_length(btrim(name)) between 1 and 80),
  note text not null default '' check (char_length(note) <= 2000),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.cluster_posts (
  cluster_id uuid not null references public.clusters (id) on delete cascade,
  post_id uuid not null references public.posts (id) on delete cascade,
  added_at timestamptz not null default now(),
  primary key (cluster_id, post_id)
);
create index cluster_posts_post_idx on public.cluster_posts (post_id);

alter table public.clusters enable row level security;
alter table public.cluster_posts enable row level security;

create policy "owner manages clusters" on public.clusters
  for all to authenticated using (public.is_owner()) with check (public.is_owner());
create policy "owner manages cluster posts" on public.cluster_posts
  for all to authenticated using (public.is_owner()) with check (public.is_owner());

revoke all on public.clusters, public.cluster_posts from anon, authenticated;
grant select, insert, update, delete on public.clusters, public.cluster_posts to authenticated;

-- One cluster by its link, with the published signals in it (newest added first).
create or replace function public.cluster_by_slug(p_slug text)
returns jsonb
language sql
stable
security definer
set search_path = ''
as $$
  select jsonb_build_object(
    'id', c.id, 'slug', c.slug, 'name', c.name, 'note', c.note, 'updated_at', c.updated_at,
    'post_ids', coalesce((
      select jsonb_agg(cp.post_id order by cp.added_at desc)
        from public.cluster_posts cp
        join public.posts p on p.id = cp.post_id
       where cp.cluster_id = c.id and p.status = 'published'
    ), '[]'::jsonb))
    from public.clusters c
   where c.slug = p_slug;
$$;
revoke all on function public.cluster_by_slug(text) from public;
grant execute on function public.cluster_by_slug(text) to anon, authenticated;
