-- Policy tests. Run after stub_auth.sql, the migration and seed.sql.
-- Every check raises an exception when a rule is broken.
\set ON_ERROR_STOP 1
begin;
insert into auth.users (id, email, raw_user_meta_data) values
  ('00000000-0000-0000-0000-00000000000a', 'owner@example.com', '{"display_name":"Yasmim"}'),
  ('00000000-0000-0000-0000-00000000000b', 'amiga@example.com', '{"display_name":"Amiga"}');
update public.profiles set role = 'owner' where id = '00000000-0000-0000-0000-00000000000a';

create function pg_temp.expect_fail(q text, label text) returns void language plpgsql as $$
begin
  begin
    execute q;
  exception when others then
    raise notice 'ok (blocked): %', label;
    return;
  end;
  raise exception 'SHOULD HAVE FAILED: %', label;
end $$;
grant execute on function pg_temp.expect_fail(text, text) to anon, authenticated;

-- Anonymous visitor
set local role anon;
do $$ begin
  if (select count(*) from public.posts) <> 14 then raise exception 'anon should see 14 published posts'; end if;
end $$;
select pg_temp.expect_fail('select * from public.comments', 'anon reads comments');
select pg_temp.expect_fail($q$insert into public.posts (slug,title,category) values ('x','x','zei')$q$, 'anon writes post');
reset role;

-- Member
set local role authenticated;
set local request.jwt.claim.sub = '00000000-0000-0000-0000-00000000000b';
select pg_temp.expect_fail($q$insert into public.posts (slug,title,category) values ('x','x','zei')$q$, 'member writes post');
select pg_temp.expect_fail($q$update public.profiles set role='owner' where id=auth.uid()$q$, 'member promotes self');
update public.profiles set display_name='Amiga Querida', categories=array['zei'], onboarded=true where id = auth.uid();
do $$ begin
  if (select count(*) from public.profiles where display_name='Amiga Querida') <> 1 then raise exception 'own profile update'; end if;
end $$;
update public.profiles set display_name='hack' where id = '00000000-0000-0000-0000-00000000000a';
do $$ begin
  if exists (select 1 from public.profiles where display_name='hack') then raise exception 'edited other profile'; end if;
end $$;
insert into public.post_likes (post_id) select id from public.posts where slug like 'ai-models%';
select pg_temp.expect_fail($q$insert into public.post_likes (post_id,user_id) select id,'00000000-0000-0000-0000-00000000000a' from public.posts limit 1$q$, 'like as someone else');
insert into public.comments (post_id, body) select id, 'Que sinal!' from public.posts where slug like 'ai-models%';
insert into public.comments (post_id, parent_id, body)
  select c.post_id, c.id, 'Respondendo a mim mesma' from public.comments c limit 1;
select pg_temp.expect_fail($q$insert into public.comments (post_id, parent_id, body)
  select p.id, c.id, 'wrong post' from public.posts p, public.comments c where p.slug like 'why-africa%' limit 1$q$, 'reply on another post');
select pg_temp.expect_fail($q$insert into public.comments (post_id, body) select id, '   ' from public.posts limit 1$q$, 'blank comment');
insert into public.comment_likes (comment_id) select id from public.comments limit 1;
reset role;

-- Owner
set local role authenticated;
set local request.jwt.claim.sub = '00000000-0000-0000-0000-00000000000a';
insert into public.posts (id, slug, title, category, take) values ('00000000-0000-0000-0000-0000000000d1', 'rascunho', 'Rascunho', 'geo', 'Minha visão');
update public.posts set take = 'Leitura da Yasmim' where slug like 'ai-models%';
insert into public.comments (post_id, body) select id, 'Comentário da dona' from public.posts where slug like 'ai-models%';
delete from public.comments where body = 'Respondendo a mim mesma';
do $$ begin
  if exists (select 1 from public.comments where body = 'Respondendo a mim mesma') then raise exception 'owner could not moderate'; end if;
  if (select published_at from public.posts where slug='rascunho') is not null then raise exception 'draft got published_at'; end if;
end $$;
reset role;

-- Member cannot see drafts nor delete others' comments
set local role authenticated;
set local request.jwt.claim.sub = '00000000-0000-0000-0000-00000000000b';
do $$ begin
  if exists (select 1 from public.posts where slug='rascunho') then raise exception 'member sees draft'; end if;
end $$;
delete from public.comments where body = 'Comentário da dona';
do $$ begin
  if not exists (select 1 from public.comments where body = 'Comentário da dona') then raise exception 'member deleted owner comment'; end if;
end $$;
select pg_temp.expect_fail($q$insert into public.comments (post_id, body) values ('00000000-0000-0000-0000-0000000000d1', 'oi')$q$, 'comment on draft');
reset role;

-- Concha: only the owner sees the catch, the sources and the glossary; everyone sees run stats.
insert into public.posts (id, slug, title, category, status, origin, fit) values ('00000000-0000-0000-0000-0000000000c1', 'pego', 'Pego pela Concha', 'zei', 'caught', 'concha', 70);
insert into public.concha_runs (trigger, sources_read, kept) values ('schedule', 6, 3);
set local role anon;
do $$ begin
  if exists (select 1 from public.posts where slug='pego') then raise exception 'anon sees caught'; end if;
  if (select count(*) from public.concha_runs where sources_read = 6 and kept = 3 and trigger = 'schedule') < 1 then raise exception 'anon should see run stats'; end if;
end $$;
select pg_temp.expect_fail('select * from public.sources', 'anon reads sources');
do $$ begin
  if exists (select 1 from public.concha_terms where kind <> 'glossary' or not published) then
    raise exception 'anon sees unpublished or never-list terms';
  end if;
end $$;
select pg_temp.expect_fail($q$insert into public.concha_terms (kind, term) values ('glossary','x')$q$, 'anon writes glossary');
select pg_temp.expect_fail($q$insert into public.concha_runs (trigger) values ('manual')$q$, 'anon writes run');
reset role;
set local role authenticated;
set local request.jwt.claim.sub = '00000000-0000-0000-0000-00000000000b';
do $$ begin
  if exists (select 1 from public.posts where slug='pego') then raise exception 'member sees caught'; end if;
  if exists (select 1 from public.sources) or exists (select 1 from public.concha_terms where not (kind = 'glossary' and published)) or exists (select 1 from public.settings) then
    raise exception 'member sees Concha settings';
  end if;
end $$;
select pg_temp.expect_fail($q$insert into public.sources (name, feed_url) values ('x','https://x')$q$, 'member adds source');
select pg_temp.expect_fail($q$insert into public.comments (post_id, body) values ('00000000-0000-0000-0000-0000000000c1', 'oi')$q$, 'comment on caught');
reset role;
set local role authenticated;
set local request.jwt.claim.sub = '00000000-0000-0000-0000-00000000000a';
do $$ begin
  if not exists (select 1 from public.posts where slug='pego') then raise exception 'owner cannot see catch'; end if;
  if (select count(*) from public.sources) < 6 then raise exception 'owner cannot see sources'; end if;
end $$;
update public.posts set status = 'published' where slug = 'pego';
insert into public.concha_terms (kind, term) values ('glossary', 'teste');
insert into public.concha_terms (kind, term, definition, published) values ('glossary', 'Termo Público', 'Texto.', true);
insert into public.concha_terms (kind, term) values ('never', 'proibido');
do $$ begin
  if (select slug from public.concha_terms where term='Termo Público') <> 'termo-publico' then raise exception 'glossary slug not made'; end if;
end $$;
update public.settings set value = 'true' where key = 'concha_autopublish';
do $$ begin
  if (select published_at from public.posts where slug='pego') is null then raise exception 'publishing caught has no date'; end if;
end $$;
reset role;
set local role anon;
do $$ begin
  if not exists (select 1 from public.concha_terms where slug='termo-publico') then raise exception 'anon cannot read published glossary'; end if;
  if exists (select 1 from public.concha_terms where term in ('teste','proibido')) then raise exception 'anon sees draft or never term'; end if;
end $$;
reset role;

select 'ALL RLS CHECKS PASSED' as result;
rollback;
