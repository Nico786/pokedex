# Pokémon Project

A full-stack Pokémon application built with React, TypeScript, GraphQL, Apollo Server, Prisma, and PostgreSQL. Browse the Pokédex, search for Pokémon, and create custom teams!

Using public Pokémon API data from [Tyradex](https://tyradex.vercel.app/).

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Security](#security)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Database Management](#database-management)
- [Troubleshooting](#troubleshooting)

## Features

- Search Pokémon by name
- Browse complete Pokédex with card reveals
- View detailed Pokémon information (stats, types, sprites)
- Toggle between normal and shiny sprites
- Create and manage multiple teams
- Add up to 6 Pokémon per team
- Remove Pokémon from teams or delete entire teams
- Persistent data storage with PostgreSQL

## Tech Stack

**Frontend:**
- React 18
- TypeScript
- Vite
- Apollo Client (GraphQL)
- React Bootstrap
- React Router

**Backend:**
- Node.js
- Apollo Server
- GraphQL
- Prisma ORM
- PostgreSQL

**DevOps:**
- Docker & Docker Compose

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [Docker](https://www.docker.com/get-started) and Docker Compose
- [Git](https://git-scm.com/)

## Security

⚠️ **Important**: This project uses environment variables to manage sensitive information.

**Before running the project:**

1. Copy `.env.example` to `.env` in the root directory:
   ```bash
   cp .env.example .env
   ```

2. Copy `server/.env.example` to `server/.env`:
   ```bash
   cp server/.env.example server/.env
   ```

3. **Update the values** in both `.env` files with your own credentials, especially for production:
   - Change default passwords
   - Use strong, unique passwords
   - Never commit `.env` files to version control

See [SECURITY.md](SECURITY.md) for more information about security best practices.

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd pokemon-project
```

### 2. Start the Application with Docker

The easiest way to run the application is using Docker Compose, which will start all services (frontend, backend, and database):

```bash
docker compose up -d
```

This command will:
- Build and start the PostgreSQL database
- Build and start the GraphQL server on port 4000
- Build and start the React frontend on port 5173

### 3. Run Database Migrations

After starting the containers, run the Prisma migrations to set up the database schema:

```bash
docker exec server npx prisma migrate dev
```

### 4. Access the Application

- **Frontend:** http://localhost:5173
- **GraphQL Server:** http://localhost:4000
- **Database:** localhost:5432

## Project Structure

```
pokemon-project/
├── src/                      # Frontend source code
│   ├── components/          # React components
│   ├── pages/              # Page components
│   ├── graphql/            # GraphQL queries & mutations
│   ├── layouts/            # Layout components
│   ├── routes/             # React Router configuration
│   └── assets/             # Static assets (images, styles)
├── server/                  # Backend source code
│   ├── src/
│   │   ├── index.ts        # Apollo Server setup
│   │   ├── resolvers.ts    # GraphQL resolvers
│   │   └── pokedex-api.ts  # External API data source
│   └── prisma/
│       ├── schema.prisma   # Database schema
│       └── migrations/     # Database migrations
├── docker-compose.yml      # Docker services configuration
└── package.json           # Frontend dependencies
```

### Docker Commands

```bash
# Start all services in detached mode
docker compose up -d

# Stop all services
docker compose down

# View logs
docker compose logs

# View logs for specific service
docker compose logs web      # Frontend
docker compose logs server   # Backend
docker compose logs db       # Database

# Restart a specific service
docker restart server
docker restart web
docker restart db

# Rebuild and restart services
docker compose up -d --build

# Stop and remove all containers, networks, and volumes
docker compose down -v
```

## Database Management

### Prisma Commands

All Prisma commands should be run inside the server container:

```bash
# Run migrations
docker exec server npx prisma migrate dev --name <migration_name>

# Reset database (⚠️ WARNING: This will delete all data)
docker exec server npx prisma migrate reset

# Check migration status
docker exec server npx prisma migrate status

# Generate Prisma Client
docker exec server npx prisma generate

# Open Prisma Studio (Database GUI)
docker exec server npx prisma studio
```

### Manual Database Access

```bash
# Access PostgreSQL CLI
docker exec -it db psql -U postgres -d db
```

## Troubleshooting

### Migration Errors

If migrations fail:

```bash
# Check migration status
docker exec server npx prisma migrate status

# Reset database (⚠️ deletes all data)
docker exec server npx prisma migrate reset

# Apply migrations again
docker exec server npx prisma migrate dev
```

## External Resources

- [Pokémon API](https://tyradex.vercel.app/) - External Pokémon data source
- [Prisma Documentation](https://www.prisma.io/docs)
- [Apollo Server Documentation](https://www.apollographql.com/docs/apollo-server/)
- [React Documentation](https://react.dev/)

## Notes

- The frontend runs on port **5173**
- The GraphQL server runs on port **4000**
- The PostgreSQL database runs on port **5432**
- Database credentials: `postgres` / `password` (change in production!)
- Data is persisted in a Docker volume named `postgres_data`

## License

This project is open source and available under the MIT License.
