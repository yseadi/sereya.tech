-- Concha, Sereya's listening shell: the daily crawler.
-- Every morning it reads the RSS feeds in `sources`, scores each new item
-- against Yasmim's glossary (`concha_terms`) and files it:
--   fit >= 90 and auto-publish on  -> published
--   fit >= 60                      -> 'caught' (Today's catch, waits for Yasmim)
--   below 60                       -> 'skipped' (kept 14 days, can be brought back)

-- Posts gain Concha's fields and two new statuses.
alter table public.posts drop constraint posts_status_check;
alter table public.posts add constraint posts_status_check
  check (status in ('draft', 'published', 'caught', 'skipped'));
alter table public.posts
  add column origin text not null default 'studio' check (origin in ('studio', 'concha')),
  add column fit smallint check (fit between 0 and 100),
  add column matched text[] not null default '{}',
  add column caught_at timestamptz,
  add column body text not null default '' check (char_length(body) <= 100000),
  add column credit text not null default '' check (char_length(credit) <= 400);

comment on column public.posts.credit is 'License credit shown under a republished text.';
comment on column public.posts.body is
  'Full text, as plain paragraphs separated by blank lines. Written by Yasmim, or brought by Concha from sources whose license allows republishing.';
comment on column public.posts.fit is 'Concha''s Fit score, 0 to 100.';
comment on column public.posts.matched is 'Why Concha picked it: glossary terms and lenses that matched.';

-- One post per source article, so Concha never brings the same item twice.
-- Earlier posts that share a link (the first seed had three items pointing to
-- dezeen.com's home page) keep the link only on the oldest one.
update public.posts set source_url = ''
where id in (
  select id from (
    select id, row_number() over (partition by source_url order by created_at, id) as n
    from public.posts where source_url <> ''
  ) d where d.n > 1
);
create unique index posts_source_url_key on public.posts (source_url) where source_url <> '';
create index posts_catch_idx on public.posts (status, fit desc) where origin = 'concha';

-- ---------------------------------------------------------------------------
-- Sources: the RSS feeds Concha reads.
-- ---------------------------------------------------------------------------
create table public.sources (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 80),
  feed_url text not null unique check (feed_url ~* '^https?://'),
  active boolean not null default true,
  full_text boolean not null default false,
  license_note text not null default '',
  last_items integer,
  last_error text,
  last_read_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.sources enable row level security;
comment on column public.sources.full_text is
  'True only when the source lets others republish its articles (e.g. Creative Commons). Concha then keeps the whole text.';

create policy "Owner manages sources" on public.sources for all to authenticated
  using (public.is_owner()) with check (public.is_owner());

-- ---------------------------------------------------------------------------
-- Concha's universe: glossary terms (raise the Fit) and the never list.
-- ---------------------------------------------------------------------------
create table public.concha_terms (
  id uuid primary key default gen_random_uuid(),
  kind text not null default 'glossary' check (kind in ('glossary', 'never')),
  term text not null check (char_length(term) between 1 and 120),
  aliases text[] not null default '{}',
  created_at timestamptz not null default now(),
  unique (kind, term)
);

comment on column public.concha_terms.aliases is
  'Words Concha looks for in English feeds. Empty means it looks for the term itself.';

alter table public.concha_terms enable row level security;
create policy "Owner manages Concha terms" on public.concha_terms for all to authenticated
  using (public.is_owner()) with check (public.is_owner());

-- ---------------------------------------------------------------------------
-- Settings (one row per key) and the log of each morning's run.
-- ---------------------------------------------------------------------------
create table public.settings (
  key text primary key,
  value jsonb not null
);
alter table public.settings enable row level security;
create policy "Owner manages settings" on public.settings for all to authenticated
  using (public.is_owner()) with check (public.is_owner());

insert into public.settings (key, value) values ('concha_autopublish', 'false'::jsonb);

create table public.concha_runs (
  id uuid primary key default gen_random_uuid(),
  started_at timestamptz not null default now(),
  finished_at timestamptz,
  trigger text not null default 'schedule' check (trigger in ('schedule', 'manual')),
  sources_read integer not null default 0,
  items_read integer not null default 0,
  kept integer not null default 0,
  published integer not null default 0,
  skipped integer not null default 0,
  errors jsonb not null default '[]'
);
create index concha_runs_recent_idx on public.concha_runs (started_at desc);

alter table public.concha_runs enable row level security;
-- The footer shows the latest numbers to everyone. Only the server writes runs.
create policy "Anyone reads Concha's runs" on public.concha_runs for select to anon, authenticated using (true);
revoke insert, update, delete on public.concha_runs from anon, authenticated;
revoke all on public.sources, public.concha_terms, public.settings from anon;

-- ---------------------------------------------------------------------------
-- Starting universe: Yasmim's sources and her Glossário.
-- ---------------------------------------------------------------------------
insert into public.sources (name, feed_url, full_text, license_note) values
  ('Rest of World', 'https://restofworld.org/feed/latest/', true,
   'Republished under Creative Commons BY-NC-ND 4.0: credit and link to the original, no edits, non-commercial.')
on conflict (feed_url) do nothing;

insert into public.sources (name, feed_url) values
  ('MIT Technology Review', 'https://www.technologyreview.com/feed/'),
  ('Dezeen', 'https://www.dezeen.com/feed/'),
  ('TechCrunch', 'https://techcrunch.com/feed/'),
  ('Futurism', 'https://futurism.com/feed'),
  ('IEEE Spectrum', 'https://spectrum.ieee.org/feeds/feed.rss')
on conflict (feed_url) do nothing;

insert into public.concha_terms (kind, term, aliases) values
  ('never', 'Celebrity gossip', array['Kardashian', 'celebrity']::text[]),
  ('never', 'Sports scores', array['NFL', 'NBA', 'Premier League']::text[]),
  ('never', 'Deals and discounts', array['Black Friday deal', 'best deals', 'promo code']::text[])
on conflict (kind, term) do nothing;

insert into public.concha_terms (term, aliases) values
  ('1948 Palestinian expulsion from Lydda and Ramle', array['Lydda', 'Ramle']::text[]),
  ('Acordo Estados Unidos-México-Canadá (USMCA)', array['USMCA']::text[]),
  ('Acordo Sykes-Picot', array['Sykes-Picot']::text[]),
  ('Acordo de Livre-Comércio da América do Norte (NAFT', array['NAFTA']::text[]),
  ('Acordo de Paz de Oslo', array['Oslo Accords']::text[]),
  ('Acordos de Abraão', array['Abraham Accords']::text[]),
  ('Acordos de Camp David', array['Camp David']::text[]),
  ('African-American Vernacular English', array['AAVE', 'African American Vernacular English']::text[]),
  ('Air-gapped', array['Air-gapped']::text[]),
  ('Al-Qaeda', array['Al-Qaeda']::text[]),
  ('Art Washing', array['artwashing', 'art washing']::text[]),
  ('Artificial General Intelligence (AGI)', array['AGI', 'artificial general intelligence']::text[]),
  ('Artificial Narrow Intelligence (ANI)', array['narrow AI']::text[]),
  ('Artificial Superintelligence (ASI)', array['superintelligence']::text[]),
  ('Assentamento Israelense', array['Israeli settlement', 'Israeli settlements']::text[]),
  ('Assentamento Netzarim', array['Netzarim']::text[]),
  ('Automatic Content Recognition (ACR)', array['automatic content recognition']::text[]),
  ('Área de Livre Comércio das Américas (ALCA)', array['FTAA']::text[]),
  ('BAT (Baidu, Alibaba and Tencent)', array['Baidu', 'Alibaba', 'Tencent']::text[]),
  ('BRICS', array['BRICS']::text[]),
  ('Balance of Payments (BoP)', array['balance of payments']::text[]),
  ('Balança sectária', array['sectarian']::text[]),
  ('Balanço do Poder (Balance of Power)', array['balance of power']::text[]),
  ('Bandwagoning (aderência)', array['bandwagoning']::text[]),
  ('Bandwidth (Largura de Banda)', array['bandwidth']::text[]),
  ('Big Nine (Amy Webb Concept)', array['Big Nine', 'Amy Webb']::text[]),
  ('BotNet', array['BotNet']::text[]),
  ('Buffer Zone', array['Buffer Zone']::text[]),
  ('Bureau of Indian Affairs (BIA)', array['Bureau of Indian Affairs']::text[]),
  ('Califado Abássida', array['Abbasid']::text[]),
  ('Canal de Suez', array['Suez']::text[]),
  ('Cavalos de Troia (Trojan)', array['Trojan', 'trojan horse']::text[]),
  ('Centro de Prevenção, Tratamento e Resposta a Incid', array['CTIR Gov']::text[]),
  ('Cognitive war', array['cognitive war', 'cognitive warfare']::text[]),
  ('Comissão Interamericana de Direitos Humanos (CIDH)', array['Inter-American Commission on Human Rights', 'IACHR']::text[]),
  ('Communicative burden', array['Communicative burden']::text[]),
  ('Computer Security Incident Response Team (CSIRT)', array['CSIRT']::text[]),
  ('Computer Vision Dazzle', array['CV Dazzle', 'dazzle makeup', 'anti-surveillance']::text[]),
  ('Congresso Mundial Uigur', array['World Uyghur Congress']::text[]),
  ('Consenso de Washington', array['Washington Consensus']::text[]),
  ('Convenção de Viena sobre o Direito dos Tratados (C', array['Vienna Convention']::text[]),
  ('Cosmo-partisan (Kosmopartisan)', array['cosmo-partisan']::text[]),
  ('Criptomineração', array['crypto mining', 'cryptomining', 'bitcoin mining']::text[]),
  ('Crise dos Mísseis de Cuba (1962)', array['Cuban Missile Crisis']::text[]),
  ('Cultural genocide', array['Cultural genocide']::text[]),
  ('Cyber deterrence', array['Cyber deterrence']::text[]),
  ('DDoS (Distributed Denial of Service)', array['DDoS']::text[]),
  ('Dead Man''s Switch (Botão de Inatividade Interrupto', array['dead man''s switch', 'kill switch', 'off switch']::text[]),
  ('Declaração Balfour', array['Balfour Declaration']::text[]),
  ('Declaração Universal dos Direitos Humanos', array['Universal Declaration of Human Rights']::text[]),
  ('Denial-of-Service (DoS) attack', array['denial-of-service', 'denial of service']::text[]),
  ('Deterrence (dissuasão)', array['deterrence']::text[]),
  ('Détente', array['détente', 'detente']::text[]),
  ('Diáspora', array['diaspora']::text[]),
  ('Diplomacia das canhoneiras (Gunboat diplomacy)', array['gunboat diplomacy']::text[]),
  ('Dogfighting', array['Dogfighting']::text[]),
  ('Dossel Sagrado', array['Sacred Canopy']::text[]),
  ('Doutrina Monroe', array['Monroe Doctrine']::text[]),
  ('Doxxing', array['Doxxing']::text[]),
  ('Estado Islâmico (ISIS EIIL Daesh)', array['Islamic State', 'ISIS', 'Daesh']::text[]),
  ('Estatuto de Roma (1998)', array['Rome Statute', 'International Criminal Court']::text[]),
  ('Estratégia Nacional de Cibersegurança soberania, g', array['national cybersecurity strategy', 'cyber sovereignty', 'digital sovereignty']::text[]),
  ('Ethnographic purism', array['ethnographic']::text[]),
  ('Ethnopsychiatry (etnopsiquiatria – antropologia da', array['ethnopsychiatry']::text[]),
  ('Feminist Security Studies', array['feminist security']::text[]),
  ('G-MAFIA (Google, Microsoft, Amazon, Facebook, IBM', array['G-MAFIA', 'Big Tech']::text[]),
  ('G7 (Grupo dos Sete)', array['G7']::text[]),
  ('Gamal Abdel Nasser', array['Nasser']::text[]),
  ('Gastrodiplomacia', array['gastrodiplomacy']::text[]),
  ('Geoeconomia', array['geoeconomics', 'geoeconomic']::text[]),
  ('Global AI Action Alliance (GAIA)', array['Global AI Action Alliance']::text[]),
  ('Global Alliance on Intelligence Augmentation (GAIA', array['intelligence augmentation']::text[]),
  ('Glocalização', array['glocalization', 'glocal']::text[]),
  ('Great Vowel Shift', array['Great Vowel Shift']::text[]),
  ('Guerra da Criméia', array['Crimean War', 'Crimea']::text[]),
  ('Humint (Inteligência humana)', array['HUMINT', 'human intelligence']::text[]),
  ('Império Otomano', array['Ottoman']::text[]),
  ('Insurreição', array['insurgency', 'insurrection']::text[]),
  ('Intifada', array['Intifada']::text[]),
  ('Islamic Supreme Council of America', array['Islamic Supreme Council of America']::text[]),
  ('Jihadismo', array['jihadism', 'jihadist']::text[]),
  ('Jus solis 🩸 Jus sanguinis', array['jus soli', 'jus sanguinis', 'birthright citizenship']::text[]),
  ('Keffiyeh', array['Keffiyeh']::text[]),
  ('Kibutz', array['kibbutz']::text[]),
  ('Malware', array['Malware']::text[]),
  ('Mandato Britânico da Palestina', array['British Mandate']::text[]),
  ('Massacre da Praça da Paz Celestial em 1989', array['Tiananmen']::text[]),
  ('Massacre de Deir Yassin', array['Deir Yassin']::text[]),
  ('Māori Language Act (1987)', array['Māori', 'Maori']::text[]),
  ('Mercado Comum do Sul (Mercosul)', array['Mercosur', 'Mercosul']::text[]),
  ('Metapolítica', array['metapolitics']::text[]),
  ('Movimento para a independência do Tibete', array['Tibet', 'Tibetan']::text[]),
  ('Movimento para a independência do Turquestão Orien', array['East Turkestan', 'Xinjiang', 'Uyghur', 'Uyghurs']::text[]),
  ('Nakba', array['Nakba']::text[]),
  ('Narcopentecostalismo', array['narco-Pentecostal']::text[]),
  ('Native Land Act of 1862', array['Native Land Act of 1862']::text[]),
  ('OSINT (Open Source Intelligence)', array['OSINT', 'Open Source Intelligence']::text[]),
  ('Offshores', array['offshore']::text[]),
  ('Operação Lava Jato', array['Lava Jato', 'Car Wash']::text[]),
  ('Organização do Tratado do Atlântico Norte (OTAN)', array['NATO', 'OTAN']::text[]),
  ('Organização dos Estados Americanos (OEA)', array['Organization of American States']::text[]),
  ('Organização para a Libertação da Palestina', array['PLO', 'Palestine Liberation Organization']::text[]),
  ('Othering', array['Othering']::text[]),
  ('Países bálticos', array['Baltic states', 'Baltics']::text[]),
  ('Pan-americanismo', array['Pan-Americanism']::text[]),
  ('Pan-arabismo', array['pan-Arabism', 'pan-Arab']::text[]),
  ('Pen Register Trap-and-Trace (PRTT)', array['pen register']::text[]),
  ('Phishing', array['Phishing']::text[]),
  ('Plano Marshall', array['Marshall Plan']::text[]),
  ('Politiets Online Patrulje', array['online patrol']::text[]),
  ('Política Nacional de Cibersegurança (PNCiber)', array['PNCiber']::text[]),
  ('Povo han', array['Han Chinese']::text[]),
  ('Primavera Árabe', array['Arab Spring']::text[]),
  ('Proxy War (Guerra por Procuração)', array['proxy war', 'proxy wars']::text[]),
  ('Ransomware', array['Ransomware']::text[]),
  ('Rede Federal de Gestão de Incidentes Cibernéticos', array['ReGIC']::text[]),
  ('Regime de Controle de Tecnologia de Mísseis – MTCR', array['MTCR', 'Missile Technology Control Regime']::text[]),
  ('Réngōng Zhìnéng 人工智能 (Inteligência Artificial) Din', array['Chinese AI', '人工智能']::text[]),
  ('Rivest-Shamir-Adleman (RSA)', array['RSA encryption']::text[]),
  ('Rota da Seda (Silk Road)', array['Silk Road', 'Belt and Road']::text[]),
  ('SQLi', array['SQLi']::text[]),
  ('Salafismo', array['salafism', 'salafist']::text[]),
  ('Sapir-Whorf Hypothesis', array['Sapir-Whorf', 'linguistic relativity']::text[]),
  ('Scapegoat (Bode Expiatório)', array['scapegoat', 'scapegoating']::text[]),
  ('Secularização', array['secularization', 'secularisation']::text[]),
  ('Shamir''s Secret Sharing (Partilha de Segredo de Sh', array['Shamir''s Secret Sharing', 'secret sharing']::text[]),
  ('Shibboleth', array['Shibboleth']::text[]),
  ('Sionismo (Zionism)', array['Zionism', 'Zionist']::text[]),
  ('Sistema de Arquivos Interplanetário (InterPlanetar', array['IPFS', 'InterPlanetary File System']::text[]),
  ('Sociolect', array['Sociolect']::text[]),
  ('Speech acts (Ato de fala)', array['speech act', 'speech acts']::text[]),
  ('Spoofing', array['Spoofing']::text[]),
  ('Spyware', array['Spyware']::text[]),
  ('Standard Language Ideology (SLI)', array['standard language', 'language ideology']::text[]),
  ('Stuxnet attack on Iran''s nuclear enrichment progra', array['Stuxnet']::text[]),
  ('Sufismo', array['sufism', 'sufi']::text[]),
  ('Surveillance of Julian Assange', array['Assange', 'WikiLeaks']::text[]),
  ('Talibã', array['Taliban']::text[]),
  ('Taqwa تقوى', array['taqwa']::text[]),
  ('Terras-raras (minerais críticos)', array['rare earth', 'rare earths', 'critical minerals']::text[]),
  ('Terrorism Studies', array['terrorism', 'counterterrorism']::text[]),
  ('Title VII of the Civil Rights Act', array['Title VII', 'Civil Rights Act']::text[]),
  ('Transnational social field', array['transnational']::text[]),
  ('Tratado Interamericano de Assistência Recíproca (T', array['Rio Treaty']::text[]),
  ('Tratado de Não Proliferação de Armas Nucleares – T', array['Non-Proliferation Treaty', 'nuclear proliferation']::text[]),
  ('Tratado de Paris 1856', array['Treaty of Paris']::text[]),
  ('Treaty of Waitangi (1840)', array['Waitangi']::text[]),
  ('Ulamās', array['ulama']::text[]),
  ('Umma', array['Umma']::text[]),
  ('União Internacional de Química Pura e Aplicada (IU', array['IUPAC']::text[]),
  ('Vernacularização', array['vernacularization']::text[]),
  ('Watchdog organizations', array['watchdog']::text[]),
  ('Watergate', array['Watergate']::text[]),
  ('XSS (Cross-Site Scripting)', array['XSS', 'cross-site scripting']::text[]),
  ('YPJ (Yekîneyên Parastina Jin) – Unidades de Proteç', array['YPJ', 'Kurdish women']::text[]),
  ('Zero-Knowledge Architecture', array['zero-knowledge']::text[]),
  ('Zero-day Attack', array['zero-day', 'zero day']::text[])
on conflict (kind, term) do nothing;
