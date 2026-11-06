# Supabase setup and security

1. Create a Supabase project and run `migrations/0001_initial_schema.sql` in SQL Editor.
2. Run `seed.sql` to publish the bilingual 40-day curriculum.\n3. Enable Email provider in Authentication.
4. Set Site URL to the GitHub Pages URL and add that URL to allowed redirect URLs.
5. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to GitHub Actions repository secrets.
6. Sign up with the trusted owner email, obtain the user's UUID from Authentication > Users, then run:
   `update public.profiles set role = 'admin' where id = '<AUTH_USER_UUID>';`

Do not promote users based on client-provided metadata. Do not expose the service-role key.

The anon key is designed to be public in browser apps; database RLS is mandatory. Review policies before handling real learner data. The initial migration intentionally grants no broad profile listing and does not expose other learners' submissions.

Open registration creates learner accounts. Trainers/admins must be provisioned by a trusted administrator. Batch membership is capped in the database (default capacity 50, hard maximum 50).

Note: production readiness still requires testing policies against a real Supabase project, configuring email confirmation/SMTP expectations, backup strategy, and privacy/retention notices.
