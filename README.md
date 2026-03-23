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
# Baby-Life-Album-MVP
