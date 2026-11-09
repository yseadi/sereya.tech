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

select 'ALL RLS CHECKS PASSED' as result;
rollback;
