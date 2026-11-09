-- The rest of Yasmim's daily sources (her list from 16 Oct 2026). Full text on,
-- as she asked; she arranges permissions with each publication herself.
-- Safe to run more than once.
update public.sources set full_text = true where full_text = false;

insert into public.sources (name, feed_url, full_text) values
  ('The Verge', 'https://www.theverge.com/rss/index.xml', true),
  ('Wired', 'https://www.wired.com/feed/rss', true),
  ('Fast Company', 'https://www.fastcompany.com/latest/rss', true),
  ('HPE Newsroom', 'https://www.hpe.com/us/en/newsroom/rss.xml', true),
  ('Forbes Innovation', 'https://www.forbes.com/innovation/feed/', true),
  ('NBC News Science', 'https://feeds.nbcnews.com/nbcnews/public/science', true),
  ('Bloomberg Línea', 'https://www.bloomberglinea.com/arc/outboundfeeds/rss/?outputType=xml', true),
  ('Vice', 'https://www.vice.com/en/feed/', true),
  ('Revista Galileu', 'https://revistagalileu.globo.com/rss/ultimas/feed.xml', true),
  ('The Guardian World', 'https://www.theguardian.com/world/rss', true),
  ('The Guardian Technology', 'https://www.theguardian.com/uk/technology/rss', true),
  ('BBC Technology', 'https://feeds.bbci.co.uk/news/technology/rss.xml', true),
  ('Intercept Brasil', 'https://www.intercept.com.br/feed/', true)
on conflict (feed_url) do nothing;
