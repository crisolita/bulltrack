<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Bulltrack Pro – Backend API</title>
</head>
<body>

  <h1>🐂 Bulltrack Pro – Backend API</h1>

  <p>
    Backend API for <strong>Bulltrack Pro</strong>, an advanced bovine genetic ranking platform.
    This project was developed as part of the
    <strong>Full-Stack Engineering Challenge (Level 2 – Robustness & Persistence)</strong>
    for <strong>Seed28</strong>.
  </p>

  <p>
    The main focus of this implementation is data integrity, scalability,
    server-side filtering, authentication, and persistence, following real-world
    backend best practices.
  </p>

  <hr />

  <h2>🚀 Tech Stack</h2>
  <ul>
    <li>Node.js</li>
    <li>NestJS</li>
    <li>TypeScript</li>
    <li>Prisma ORM</li>
    <li>PostgreSQL</li>
    <li>JWT Authentication</li>
    <li>Docker & Docker Compose</li>
    <li>Swagger (OpenAPI)</li>
  </ul>

  <hr />

  <h2>🧠 Core Features</h2>

  <h3>Authentication</h3>
  <ul>
    <li>JWT-based authentication</li>
    <li>Default seeded user for evaluation purposes:</li>
  </ul>

  <pre>
email: admin@seed28.com
password: seed28
  </pre>

  <h3>Bulls Management</h3>
  <ul>
    <li>Bulls are persisted in a PostgreSQL database</li>
    <li>
      Dynamic <strong>Bull Score</strong> calculation performed on the backend
      using a weighted formula:
    </li>
  </ul>

  <pre>
Score = (C * 0.30) + (F * 0.25) + (R * 0.20) + (M * 0.15) + (Ca * 0.10)
  </pre>

  <h3>Advanced Server-Side Filtering</h3>
  <p>All filtering logic is handled at the API / database level.</p>
  <ul>
    <li>Search by <strong>caravana</strong> or <strong>nombre</strong></li>
    <li>Origen: propio | catalogo | favoritos</li>
    <li>Pelaje: negro | colorado</li>
    <li>Uso: vaca | vaquillona</li>
    <li>Sorting by bull score (high / low)</li>
    <li>User-specific favorites</li>
  </ul>

  <h3>Pagination</h3>
  <ul>
    <li>Server-side pagination</li>
    <li>Efficient queries using Prisma</li>
  </ul>

  <h3>Favorites</h3>
  <ul>
    <li>Bulls can be marked as favorites</li>
    <li>Favorites are user-specific</li>
    <li>Many-to-many relationship via a <code>Favorite</code> table</li>
  </ul>

  <hr />

  <h2>📦 Project Structure</h2>

  <pre>
bulltrack-backend/
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── src/
│   ├── auth/
│   ├── bulls/
│   ├── favorites/
│   ├── prisma/
│   └── common/
├── docker-compose.yml
├── Dockerfile
└── README.md
  </pre>

  <hr />

  <h2>🐳 Running the Project with Docker</h2>

  <h3>1. Environment variables</h3>
  <pre>
DATABASE_URL=postgresql://bulltrack:bulltrack@db:5432/bulltrack
JWT_SECRET=supersecret
  </pre>

  <h3>2. Build and start containers</h3>
  <pre>
docker compose build
docker compose up -d
  </pre>

  <h3>3. Run database migrations</h3>
  <pre>
docker compose exec api npx prisma migrate dev
  </pre>

  <h3>4. Seed the database</h3>
  <pre>
docker compose exec api npx prisma db seed
  </pre>

  <hr />

  <h2>📊 Prisma Studio</h2>
  <p>
    Prisma Studio is intended to be run from the host machine and connects to the
    Dockerized database.
  </p>

  <pre>
npx prisma studio
  </pre>

  <p>Available at: <code>http://localhost:5555</code></p>

  <hr />

  <h2>📚 API Documentation</h2>
  <p>
    Swagger documentation is enabled for easy API exploration.
  </p>
  <p>
    <strong>URL:</strong> <code>http://localhost:3000/api</code>
  </p>

  <hr />

  <h2>📌 Assumptions & Technical Decisions</h2>

  <h3>Bull Identifier (UUID)</h3>
  <p>
    Although the provided seed data includes numeric IDs, the Bull entity uses a
    <strong>UUID</strong> as its primary key.
  </p>
  <ul>
    <li>Better suited for distributed and scalable systems</li>
    <li>Avoids ID collisions across environments</li>
    <li>Prevents exposing sequential identifiers</li>
    <li>Seed numeric IDs are treated as external/reference values</li>
  </ul>

  <h3>Dynamic Bull Score</h3>
  <p>
    The bull score is not persisted in the database and is calculated dynamically
    to ensure consistency and avoid data duplication.
  </p>

  <h3>Server-Side Filtering Only</h3>
  <p>
    All filtering, sorting, and pagination logic lives in the backend to improve
    scalability and performance.
  </p>

  <h3>Prisma Studio Usage</h3>
  <p>
    Prisma Studio is intentionally excluded from the Docker runtime as it is a
    development-only tool.
  </p>

  <h3>Default User</h3>
  <p>
    A default user is seeded to simplify evaluation without introducing a full
    registration flow.
  </p>

  <hr />

  <h2>👤 Author</h2>
  <p>
    <strong>Crisol Cova</strong><br />
    Backend & Blockchain developer
  </p>

</body>
</html>
