This is a [Next.js](https://nextjs.org/) Starter Kit with some tech stack that i frequently used. I also include the basic of Role Based Authentication for protecting some action or resources with [Auth.js](https://authjs.dev/).

## Tech Stack 

- [Next.js](https://nextjs.org/learn)
- [Auth.js](https://authjs.dev/)
- [Prisma](https://www.prisma.io/)
- [Shadcn UI](https://ui.shadcn.com/)

## Getting Started

1. First, run `npm install`.
2. Copy the `.env.example` file and rename it to `.env`.
3. Run `npx auth secret` then copy the result to `AUTH_SECRET` value in `.env` file.
4. Create database, i use mysql for this starter kit, but you can use databases which you prefer. Then change `DATABASE_URL` value in `.env` file with database creadentials and name.
5. Run `npx prisma db push` to push schema to the database.
6. Seed the database use `npx prisma db seed` will run the `seed.ts` file that located in `./prisma` and create a user with **ADMIN** Roles.
7. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.