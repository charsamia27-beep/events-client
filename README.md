# Pashe

**Live site:** https://YOUR-SITE.vercel.app

Pashe (পাশে, "beside you") is a community service events platform. People create, find, join and track social service events in their local area, such as cleanups, plantations and blood drives.

**API repository:** https://github.com/YOUR-USERNAME/events-server

## Features

- Create events with a title, description, type, thumbnail, location and future date, with validation on the form and the API
- Browse upcoming events with search and type filters. Past events leave the list on their own
- Read event details without an account, and log in to join with one click
- See joined events sorted by date, and update or delete your own events from one page
- Log in with email and password or Google through Better Auth, with sessions that survive a reload
- Protected APIs that verify a short-lived JWT on every private request
- Light and dark themes, loading skeletons, a profile page and a responsive layout for phone, tablet and desktop

## Tech stack

Next.js App Router, TypeScript, HeroUI v3, Tailwind CSS v4, Better Auth with the MongoDB adapter and JWT plugin, Express and MongoDB.

## Run locally

1. Copy `.env.example` to `.env.local` and fill in the values.
2. Run `npm install`.
3. Start the API from the server repository.
4. Run `npm run dev` and open http://localhost:3000.

Use the same MongoDB database for both apps. Keep `BETTER_AUTH_URL` here identical to `CLIENT_URL` on the server, with no trailing slash.

## Deploy on Vercel

1. Import this repository and add every variable from `.env.example`, using your live URLs.
2. In Google Cloud, add `https://YOUR-SITE.vercel.app/api/auth/callback/google` as a redirect URI, and publish the consent screen.
3. Set `CLIENT_URL` on the server to the same site URL, then redeploy both apps.

## Photo credits

Photos are free to use under the [Unsplash License](https://unsplash.com/license), by Joel Muniz, Eyoel Kahssay, Vitaly Gariev, Larm Rmah, Yannis H, Hayes, Chris Briggs, Ismael Paramo, Quilia, The Tampa Bay Estuary Program, ray sangga kusuma and Annie Spratt.
