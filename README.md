# Baby Life Album

Baby Life Album is a production-style MVP for parents to save milestones, photo memories, doctor visits, and growth records in one private place.

## Description

This app helps parents keep a private record of their child's milestones, memories, doctor visits, and growth tracking in one place.

## Run locally

1. Copy `.env.example` to `.env`
2. Install dependencies:

```bash
npm install
```

3. Generate the Prisma client:

```bash
npm run prisma:generate
```

4. Create the local database and apply the initial migration:

```bash
npx prisma migrate dev --name init
```

5. Seed demo data:

```bash
npm run db:seed
```

6. Start the development server:

```bash
npm run dev
```

## Build

Create a production build with:

```bash
npm run build
```

## Database

The project now uses Prisma with PostgreSQL.

For local development and Vercel deployment, set `DATABASE_URL` in your environment:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE?schema=public"
```

## Vercel deployment

1. Provision a PostgreSQL database.
2. Add `DATABASE_URL` in Vercel project environment variables.
3. Apply migrations:

```bash
npm run prisma:deploy
```

4. Redeploy the app.
