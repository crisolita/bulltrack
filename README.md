🐂 Bulltrack Pro – Backend API

Backend API for Bulltrack Pro, an advanced bovine genetic ranking platform.
This project was developed as part of the Full-Stack Engineering Challenge (Level 2 – Robustness & Persistence) for Seed28.

The main focus of this implementation is data integrity, scalability, server-side filtering, authentication, and persistence, following real-world backend best practices.

🚀 Tech Stack

Node.js

NestJS

TypeScript

Prisma ORM

PostgreSQL

JWT Authentication

Docker & Docker Compose

Swagger (OpenAPI)
🧠 Core Features
✅ Authentication

JWT-based authentication

Default seeded user for testing:

email: admin@seed28.com
password: seed28

✅ Bulls Management

Bulls are persisted in a PostgreSQL database

Dynamic Bull Score calculation on the backend using a weighted formula:

Score = (C \* 0.30) + (F \* 0.25) + (R \* 0.20) + (M \* 0.15) + (Ca \* 0.10)

✅ Advanced Server-Side Filtering

All filtering is handled at the API / database level, not in frontend state.

Supported filters:

Search by caravana or nombre

Origen: propio | catalogo | favoritos

Pelaje: negro | colorado

Uso: vaca | vaquillona

Sorting by bull score (high / low)

User-specific favorites

✅ Pagination

Server-side pagination

Efficient queries using Prisma

✅ Favorites

Bulls can be marked as favorites

Favorites are user-specific

Many-to-many relationship via a Favorite table

📦 Project Structure
bulltrack-backend/
├── prisma/
│ ├── schema.prisma
│ └── seed.ts
├── src/
│ ├── auth/
│ ├── bulls/
│ ├── favorites/
│ ├── prisma/
│ └── common/
├── docker-compose.yml
├── Dockerfile
└── README.md

🐳 Running the Project with Docker
1️⃣ Environment variables

Create a .env file:
DATABASE_URL=postgresql://bulltrack:bulltrack@db:5432/bulltrack
JWT_SECRET=supersecret

2️⃣ Build and start containers
docker compose build
docker compose up -d

3️⃣ Run database migrations
docker compose exec api npx prisma migrate dev

4️⃣ Seed the database
docker compose exec api npx prisma db seed

📚 API Documentation (Swagger)

Swagger is enabled for easy API exploration.

Once the API is running, access:

http://localhost:3000/docs

🧪 Validation & Error Handling

DTO-based validation using class-validator

Global validation pipe enabled

Clear validation error messages for invalid query params

Proper HTTP status codes and error handling

🎯 Design Decisions

All business logic (filters, score calculation, pagination) lives in the backend

Prisma is used as the single source of truth for data access

Dockerized setup to ensure environment consistency

Prisma Studio intentionally excluded from Docker runtime (dev-only tool)

Integration with this API

👤 Author
Crisol Cova
Blockchain & Backend Developer
