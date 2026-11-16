-- Festa: Yasmim's birthday RSVP (festa.sereya.tech).
-- Guests do not have accounts: they answer through festa_rsvp(), which validates
-- the answer and stores it. Only the owner can read, list or delete answers.

create table if not exists public.festa_rsvps (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  going boolean not null,
  contact_name text not null check (char_length(btrim(contact_name)) between 2 and 140),
  phone text not null default '' check (char_length(phone) <= 40),
  message text not null default '' check (char_length(message) <= 1000)
);

create table if not exists public.festa_people (
  id uuid primary key default gen_random_uuid(),
  rsvp_id uuid not null references public.festa_rsvps (id) on delete cascade,
  position smallint not null default 0,
  full_name text not null check (char_length(btrim(full_name)) between 2 and 140),
  is_child boolean not null default false,
  child_age smallint check (child_age between 0 and 17),
  wine boolean not null default false,
  soda boolean not null default false,
  gluten_free boolean not null default false,
  diet_note text not null default '' check (char_length(diet_note) <= 300)
);
-- What a child eats (asked only for children).
alter table public.festa_people add column if not exists kid_food text not null default '' check (char_length(kid_food) <= 300);
create index if not exists festa_people_rsvp_idx on public.festa_people (rsvp_id);

alter table public.festa_rsvps enable row level security;
alter table public.festa_people enable row level security;

drop policy if exists "owner reads festa rsvps" on public.festa_rsvps;
create policy "owner reads festa rsvps" on public.festa_rsvps
  for select to authenticated using (public.is_owner());
drop policy if exists "owner deletes festa rsvps" on public.festa_rsvps;
create policy "owner deletes festa rsvps" on public.festa_rsvps
  for delete to authenticated using (public.is_owner());
drop policy if exists "owner reads festa people" on public.festa_people;
create policy "owner reads festa people" on public.festa_people
  for select to authenticated using (public.is_owner());
drop policy if exists "owner deletes festa people" on public.festa_people;
create policy "owner deletes festa people" on public.festa_people
  for delete to authenticated using (public.is_owner());

revoke all on public.festa_rsvps, public.festa_people from anon, authenticated;
grant select, delete on public.festa_rsvps, public.festa_people to authenticated;

-- One answer from a guest: { replaces?, going, contact_name, phone, message, people: [{ full_name, is_child, child_age, wine, soda, gluten_free, diet_note, kid_food }] }
create or replace function public.festa_rsvp(p jsonb)
returns uuid
language plpgsql
volatile
security definer
set search_path = ''
as $$
declare
  v_id uuid;
  v_going boolean := coalesce((p ->> 'going')::boolean, true);
  v_contact text := btrim(coalesce(p ->> 'contact_name', ''));
  v_people jsonb := coalesce(p -> 'people', '[]'::jsonb);
  v_person jsonb;
  v_pos int := 0;
  v_age int;
begin
  if char_length(v_contact) < 2 then
    raise exception 'contact_name required';
  end if;
  if jsonb_typeof(v_people) <> 'array' then
    raise exception 'people must be a list';
  end if;
  if v_going and jsonb_array_length(v_people) = 0 then
    raise exception 'at least one person';
  end if;
  if jsonb_array_length(v_people) > 20 then
    raise exception 'too many people';
  end if;

  -- A guest changing their answer sends the id of the old one, which is replaced.
  if coalesce(p ->> 'replaces', '') ~ '^[0-9a-f-]{36}$' then
    delete from public.festa_rsvps where id = (p ->> 'replaces')::uuid;
  end if;

  insert into public.festa_rsvps (going, contact_name, phone, message)
  values (
    v_going,
    left(v_contact, 140),
    left(btrim(coalesce(p ->> 'phone', '')), 40),
    left(btrim(coalesce(p ->> 'message', '')), 1000)
  )
  returning id into v_id;

  if v_going then
    for v_person in select * from jsonb_array_elements(v_people) loop
      v_age := nullif(v_person ->> 'child_age', '')::int;
      if v_age is not null and (v_age < 0 or v_age > 17) then v_age := null; end if;
      insert into public.festa_people (rsvp_id, position, full_name, is_child, child_age, wine, soda, gluten_free, diet_note, kid_food)
      values (
        v_id,
        v_pos,
        left(btrim(coalesce(v_person ->> 'full_name', '')), 140),
        coalesce((v_person ->> 'is_child')::boolean, false),
        case when coalesce((v_person ->> 'is_child')::boolean, false) then v_age end,
        coalesce((v_person ->> 'wine')::boolean, false) and not coalesce((v_person ->> 'is_child')::boolean, false),
        coalesce((v_person ->> 'soda')::boolean, false),
        coalesce((v_person ->> 'gluten_free')::boolean, false),
        left(btrim(coalesce(v_person ->> 'diet_note', '')), 300),
        case when coalesce((v_person ->> 'is_child')::boolean, false)
          then left(btrim(coalesce(v_person ->> 'kid_food', '')), 300) else '' end
      );
      v_pos := v_pos + 1;
    end loop;
  end if;

  return v_id;
end;
$$;

revoke all on function public.festa_rsvp(jsonb) from public;
grant execute on function public.festa_rsvp(jsonb) to anon, authenticated;
