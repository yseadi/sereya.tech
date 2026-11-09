-- Sereya Tech V1: members, posts (signals), likes and forum-style comments.
-- Row Level Security is on for every table: the browser talks to the database
-- directly with the public key, so these policies are the real gatekeepers.

-- ---------------------------------------------------------------------------
-- Profiles
-- ---------------------------------------------------------------------------
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text not null default '' check (char_length(display_name) <= 80),
  bio text not null default '' check (char_length(bio) <= 400),
  role text not null default 'member' check (role in ('owner', 'member')),
  categories text[] not null default '{}',
  regions text[] not null default '{}',
  onboarded boolean not null default false,
  created_at timestamptz not null default now()
);

comment on column public.profiles.role is
  'owner = Yasmim (Studio access, moderation). Only the service role can change it.';

-- New auth user -> new profile, name taken from the signup metadata.
create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'display_name', split_part(new.email, '@', 1)));
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Is the current user the owner? Security definer so policies can call it
-- without recursing into the profiles policies.
create function public.is_owner()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.profiles where id = auth.uid() and role = 'owner'
  );
$$;

alter table public.profiles enable row level security;

create policy "Members can see each other's profiles"
  on public.profiles for select to authenticated using (true);

create policy "Members can edit their own profile"
  on public.profiles for update to authenticated
  using (id = auth.uid()) with check (id = auth.uid());

-- Members may only touch these columns. role stays with the service role.
revoke update on public.profiles from anon, authenticated;
grant update (display_name, bio, categories, regions, onboarded)
  on public.profiles to authenticated;
revoke insert, delete on public.profiles from anon, authenticated;

-- ---------------------------------------------------------------------------
-- Posts (signals). Yasmim writes them in the Studio.
-- ---------------------------------------------------------------------------
create table public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title text not null check (char_length(title) between 1 and 240),
  dek text not null default '' check (char_length(dek) <= 1200),
  take text not null default '' check (char_length(take) <= 8000),
  source_name text not null default '',
  source_url text not null default '',
  byline text not null default '',
  image_url text not null default '',
  category text not null check (category in ('res', 'zei', 'bio', 'art', 'geo')),
  format text not null default 'News' check (format in ('News', 'Essay', 'Report')),
  tags text[] not null default '{}',
  status text not null default 'draft' check (status in ('draft', 'published')),
  is_pearl boolean not null default false,
  published_at timestamptz,
  author_id uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on column public.posts.dek is 'Summary of the source piece.';
comment on column public.posts.take is 'Yasmim''s take, shown in its own card.';
comment on column public.posts.is_pearl is 'Pearl of the day. Only the newest pearl shows on Home.';

create index posts_published_idx on public.posts (status, published_at desc);
create index posts_category_idx on public.posts (category);

create function public.touch_post()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at := now();
  if new.status = 'published' and new.published_at is null then
    new.published_at := now();
  end if;
  return new;
end;
$$;

create trigger posts_touch
  before insert or update on public.posts
  for each row execute function public.touch_post();

alter table public.posts enable row level security;

create policy "Anyone can read published posts"
  on public.posts for select to anon, authenticated
  using (status = 'published' or public.is_owner());

create policy "Only the owner writes posts"
  on public.posts for insert to authenticated with check (public.is_owner());
create policy "Only the owner edits posts"
  on public.posts for update to authenticated using (public.is_owner()) with check (public.is_owner());
create policy "Only the owner deletes posts"
  on public.posts for delete to authenticated using (public.is_owner());

-- ---------------------------------------------------------------------------
-- Likes on posts
-- ---------------------------------------------------------------------------
create table public.post_likes (
  post_id uuid not null references public.posts (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade default auth.uid(),
  created_at timestamptz not null default now(),
  primary key (post_id, user_id)
);

alter table public.post_likes enable row level security;

create policy "Members see likes" on public.post_likes for select to authenticated using (true);
create policy "Members like as themselves" on public.post_likes for insert to authenticated
  with check (user_id = auth.uid());
create policy "Members unlike their own likes" on public.post_likes for delete to authenticated
  using (user_id = auth.uid());

-- ---------------------------------------------------------------------------
-- Comments, forum style: a comment can answer another one (parent_id).
-- ---------------------------------------------------------------------------
create table public.comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.posts (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade default auth.uid(),
  parent_id uuid references public.comments (id) on delete cascade,
  body text not null check (char_length(btrim(body)) between 1 and 4000),
  created_at timestamptz not null default now(),
  edited_at timestamptz
);

create index comments_post_idx on public.comments (post_id, created_at);
create index comments_recent_idx on public.comments (created_at desc);

-- A reply must belong to the same post as the comment it answers.
create function public.check_comment_parent()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if new.parent_id is not null and not exists (
    select 1 from public.comments c where c.id = new.parent_id and c.post_id = new.post_id
  ) then
    raise exception 'Reply must be on the same post as its parent';
  end if;
  return new;
end;
$$;

create trigger comments_parent_check
  before insert on public.comments
  for each row execute function public.check_comment_parent();

alter table public.comments enable row level security;

create policy "Members read comments" on public.comments for select to authenticated using (true);

create policy "Members comment as themselves on published posts"
  on public.comments for insert to authenticated
  with check (
    user_id = auth.uid()
    and exists (select 1 from public.posts p where p.id = post_id and p.status = 'published')
  );

create policy "Members edit their own comments" on public.comments for update to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "Authors and the owner delete comments" on public.comments for delete to authenticated
  using (user_id = auth.uid() or public.is_owner());

revoke update on public.comments from anon, authenticated;
grant update (body, edited_at) on public.comments to authenticated;

-- ---------------------------------------------------------------------------
-- Likes on comments
-- ---------------------------------------------------------------------------
create table public.comment_likes (
  comment_id uuid not null references public.comments (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade default auth.uid(),
  created_at timestamptz not null default now(),
  primary key (comment_id, user_id)
);

alter table public.comment_likes enable row level security;

create policy "Members see comment likes" on public.comment_likes for select to authenticated using (true);
create policy "Members like comments as themselves" on public.comment_likes for insert to authenticated
  with check (user_id = auth.uid());
create policy "Members unlike their own comment likes" on public.comment_likes for delete to authenticated
  using (user_id = auth.uid());

-- Anonymous visitors only read published posts. Everything else needs an account.
revoke all on public.post_likes, public.comments, public.comment_likes, public.profiles from anon;
