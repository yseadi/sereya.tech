# Sereya Tech

Signals, trends and readings on technology, culture and the world outside the usual centres.
Made in Brasil, reading the world.

This is the V1 of the platform: accounts, onboarding, Yasmim's Studio, likes and
forum-style conversations on every signal.

## What is in the V1

| Who | What they can do |
| --- | --- |
| Visitor | See Home and the Signals (summary, source, Yasmim's take). Join or log in. |
| Member | Join with an invite code, pick categories and regions. Get a Home filtered by their categories, like signals, comment, reply to each other, like comments, edit or delete their own comments. Community page with the latest comments and the most talked-about signals. Settings for name, bio, categories, regions. |
| Owner (Yasmim) | Everything above, plus the **Studio** tab: create, edit, publish, unpublish and delete signals, "Fill from link" (reads the source's title, summary and photo), mark the Pearl of the day, see members, likes and comments. On every post a dark owner bar lets her write or edit **her take** right there. Her comments carry a "Sereya" badge and she can delete any comment. |

Not in the V1 yet: Trends, Sonar, Readings/Carta, plans and payments (everything is free for now), Concha (the crawler) feeding signals automatically, image upload (photos are links for now), Google login.

## How it is built

- **Next.js 15** (App Router, Server Actions) in `src/`.
- **Supabase**: login, Postgres database. Every table has Row Level Security, so the rules live in the database: `supabase/migrations/20261109120000_init.sql`.
- The owner is whoever joins with the email in `OWNER_EMAIL`. Members can never change their own role.
- Public sign-up is turned off in Supabase. Accounts are created by the server after it checks the invite code (`INVITE_CODE`), so no confirmation email is needed.
- `supabase/seed.sql` brings 14 real signals from 6 Nov 2026 (Rest of World, MIT Technology Review, Dezeen) without takes.

## Putting the V1 online (free: Supabase + Vercel)

About 20 minutes. No credit card.

### 1. Supabase (database and login)

1. Create an account at [supabase.com](https://supabase.com) and a **New project**. Name: `sereya`. Region: **South America (São Paulo)**. Save the database password somewhere safe.
2. In the project, open **SQL Editor**, paste the whole content of `supabase/migrations/20261109120000_init.sql` and click **Run**. Then do the same with `supabase/seed.sql`.
3. **Authentication → Sign In / Providers**: turn **off** "Allow new users to sign up". Keep the **Email** provider on (the app creates accounts itself, after checking the invite code).
4. **Project Settings → API Keys**: copy the **Project URL**, the **anon / publishable** key and the **service_role / secret** key. The secret key is like a master password: only paste it in Vercel, never anywhere else.

### 2. Vercel (the website)

1. Create an account at [vercel.com](https://vercel.com) with **Continue with GitHub**.
2. **Add New → Project**, pick `yseadi/sereya.tech`, and before **Deploy** open **Environment Variables** and add:

   | Name | Value |
   | --- | --- |
   | `NEXT_PUBLIC_SUPABASE_URL` | Project URL from Supabase |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | anon / publishable key |
   | `SUPABASE_SERVICE_ROLE_KEY` | service_role / secret key |
   | `OWNER_EMAIL` | the email you will join with |
   | `INVITE_CODE` | a word for your friends, e.g. `perola` |
   | `NEXT_PUBLIC_SITE_URL` | leave for now, fill after step 3 |

3. Click **Deploy**. Vercel gives you an address like `sereya-tech.vercel.app`. Put it in `NEXT_PUBLIC_SITE_URL` (Settings → Environment Variables) and **Redeploy**.
4. Back in Supabase, **Authentication → URL Configuration**: Site URL = your Vercel address, and add `https://<your address>/auth/callback` to Redirect URLs.

### 3. First login

1. Open the site, click **Join Sereya** and join with the `OWNER_EMAIL` and the invite code. You become the owner and the **Studio** tab appears.
2. Write your takes on the seeded signals, publish new ones, then send your friends the link and the invite code.

Every time a change is merged into `main`, Vercel publishes it by itself. Later, the `sereya.tech` domain can point to Vercel (Project → Settings → Domains).

### Good to know for the beta

- **Forgot password emails**: Supabase's built-in email only reaches members of the Supabase team. Until a free email sender (e.g. Resend) is connected under Authentication → Emails → SMTP, a friend who forgets her password can be removed in Authentication → Users and join again.
- Supabase's free plan pauses a project after 7 days with no visits. Opening the dashboard wakes it up.

## Running it on a computer

```bash
npm install
npx supabase start          # needs Docker. Runs a local Supabase with the migration and seed
cp .env.example .env.local  # fill with the keys `npx supabase status -o env` prints
npm run dev                 # http://localhost:3000
```

Database rule tests (plain Postgres is enough):

```bash
createdb sereya_test
psql -d sereya_test -f supabase/tests/stub_auth.sql \
  -f supabase/migrations/20261109120000_init.sql -f supabase/seed.sql \
  -f supabase/tests/rls_test.sql   # ends with "ALL RLS CHECKS PASSED"
```

## Map of the code

```
src/app/            pages: / (Home), /signals, /signals/[slug], /community,
                    /login, /join, /welcome, /forgot, /reset, /settings, /studio
src/app/auth/       log in, join, log out, password reset (server actions)
src/app/studio/     owner actions and the post form
src/components/     menu, Concha footer, pearl, cards, like button
src/lib/            Supabase clients, categories and colours, plans, helpers
supabase/           config, migration (tables + rules), seed, tests
```
