# ServiHub Report System

A full-stack web application built with **Next.js 14 App Router**, **Prisma**, and **PostgreSQL**, designed to allow users to submit reports and for admins to manage them with authentication, filters, and sorting tools.

## Live Demo

Try out this [demo](https://servihub-report-handling-system-4qte.vercel.app/)! Simply use either user to test the features:
* User: {user_id: 2}
* Admin : {user_id: 1, email: admin@servihub.com}

---

## Features

- Submit reports by type, reason, and target ID
- Admin login with session-based authentication using JWT
- View, filter, and sort reports by:
  - Status (resolved/unresolved)
  - Type (user, review, etc.)
  - Reason (spam, harassment, etc.)
  - Date Submitted, Date Resolved, etc.
- Resolve reports and track admin handling
- Client/server-safe BigInt serialization
- Fully deployed on [Vercel](https://servihub-report-handling-system-4qte.vercel.app/)

---

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org)
- **Database**: PostgreSQL
- **ORM**: [Prisma](https://www.prisma.io/)
- **Authentication**: JWT with cookies
- **Styling**: Tailwind CSS, shadcn/ui
- **Deployment**: [Vercel](https://vercel.com)

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/servihub-report-system.git
cd servi-hub-report-system
```
### 2. Intall dependencies
* In your terminal, run the following:
```
npm install
```
### 3. Set up environment variables
* Create a new .env folder
* Follow this [Prisma Guide](https://www.prisma.io/nextjs) to set up an existing database. 
* In your .env folder, set your `DATABASE_URL` to your database.
* Create your `SESSION_SECRET` key.
```
// .env 

DATABASE_URL = "replace-with-your-url"
SESSION_SECRET = your-super-secret-session-key
```

### 4. Set up database
* In your terminal, run prisma migrations and generate the client.
```
npx prisma generate
npx prisma db push
```
* Seed the database with the seed file. You may add more inputs in the seed file to populate the user database.
* In your terminal, run:
```
npx prisma db seed
```

### 5. Run the developer server
* In your terminal, run:
```
npm run dev
```
* Your app will be running at `http://localhost:3000`.

---


## Acknowledgements 
* Next.js
* Prisma
* shadn/ui
* Vercel
* [Cosden Solutions](https://github.com/cosdensolutions/code) for implementation of JWT Token