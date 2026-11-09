-- Sereya's public Glossary: each glossary term Concha listens for can also be
-- a card people read, written by Yasmim. Drafts stay private until she
-- publishes them. Safe to run more than once.
alter table public.concha_terms
  add column if not exists slug text,
  add column if not exists definition text not null default '' check (char_length(definition) <= 40000),
  add column if not exists category text check (category in ('res', 'zei', 'bio', 'art', 'geo')),
  add column if not exists published boolean not null default false,
  add column if not exists updated_at timestamptz not null default now();

comment on column public.concha_terms.definition is 'Yasmim''s text for the public Glossary card. Paragraphs separated by a blank line.';

-- A readable address for every glossary term, from its name.
create or replace function public.unaccent_simple(t text)
returns text language sql immutable set search_path = '' as $$
  select translate(t,
    'ÁÀÂÃÄÅáàâãäåÉÈÊËéèêëÍÌÎÏíìîïÓÒÔÕÖóòôõöÚÙÛÜúùûüÇçÑñŌōĀā',
    'AAAAAAaaaaaaEEEEeeeeIIIIiiiiOOOOOoooooUUUUuuuuCcNnOoAa');
$$;

create or replace function public.term_slug(t text)
returns text language sql immutable set search_path = '' as $$
  select trim(both '-' from left(regexp_replace(lower(public.unaccent_simple(t)), '[^a-z0-9]+', '-', 'g'), 80));
$$;

update public.concha_terms set slug = public.term_slug(term) where slug is null and kind = 'glossary';
-- Two terms with the same address: keep the first, number the others.
with d as (
  select id, slug, row_number() over (partition by slug order by created_at, id) as n
  from public.concha_terms where kind = 'glossary'
)
update public.concha_terms t set slug = d.slug || '-' || d.n from d where t.id = d.id and d.n > 1;

create unique index if not exists concha_terms_slug_key on public.concha_terms (slug) where kind = 'glossary';

create or replace function public.touch_term()
returns trigger language plpgsql set search_path = '' as $$
begin
  new.updated_at := now();
  if new.kind = 'glossary' and (new.slug is null or new.slug = '') then
    new.slug := public.term_slug(new.term);
  end if;
  return new;
end;
$$;

drop trigger if exists concha_terms_touch on public.concha_terms;
create trigger concha_terms_touch before insert or update on public.concha_terms
  for each row execute function public.touch_term();

-- Everyone can read published glossary cards.
drop policy if exists "Anyone reads published glossary" on public.concha_terms;
create policy "Anyone reads published glossary" on public.concha_terms for select to anon, authenticated
  using (kind = 'glossary' and published);
grant select on public.concha_terms to anon, authenticated;
