# SYJ WebAcademy

An open-source, bilingual (English/Hindi) learning platform for a 40-day practical web development and deployment bootcamp. Designed for trainer-led and self-paced learning, with an initial batch capacity of 50 learners.

## Stack
- React + Vite + TypeScript
- Supabase Auth + PostgreSQL + Row Level Security
- GitHub Pages deployment via GitHub Actions
- MIT License

## Local development
1. Install Node.js 20+.
2. Run `npm install`.
3. Copy `.env.example` to `.env.local` and set the Supabase project URL and anon/publishable key.
4. Run `npm run dev`.

Without Supabase credentials the app runs in **preview mode** with clearly labelled demo data. Authentication and writes require a configured Supabase project.

## Supabase setup
1. Create a free Supabase project.
2. Open SQL Editor and run `supabase/migrations/0001_initial_schema.sql`.\n3. Run `supabase/seed.sql` to publish all 40 bilingual lesson records.
4. In Authentication settings, enable email/password sign-up and configure the deployed GitHub Pages URL as a redirect URL.
5. Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` as GitHub Actions repository secrets (or variables).
5. Never put a Supabase service-role key in this frontend repository.

The first registered user is **not automatically an administrator**. Promote the trusted trainer account manually in the Supabase SQL editor using the documented admin bootstrap statement in `supabase/README.md`.

## GitHub Pages
Enable Pages using **GitHub Actions** as the source. The included workflow builds and deploys on pushes to `main`. The Vite base path is derived from the repository name.

## Security model
- Public registration creates a learner profile only.
- Trainer privileges are assigned out-of-band by a trusted project owner.
- RLS controls all database access; the frontend is not a security boundary.
- Learners can read published curriculum and their own records.
- Learners cannot read other learners' profiles, submissions or progress.
- Batch membership is capped at 50 by a database trigger.
- Do not store secrets, passwords or service-role keys in Git.

## Scope of this MVP
Included: landing page, bilingual shell, 40-day curriculum catalogue, dashboard, registration/login UI, batch overview, Supabase schema and policies, Pages workflow.

Next: trainer assignment review UI, attendance, quiz engine, certificate verification, file storage policies and richer lesson content.

## Free-tier note
GitHub Pages and Supabase offer free tiers subject to provider limits and terms. Free plans can change or pause inactive projects. This is a zero-cost-to-start design, not a guarantee of unlimited or permanent free hosting.

## License
MIT. See [LICENSE](LICENSE).
