# Security Policy

## Environment Variables

This project uses environment variables.

### Required Environment Variables

#### Root `.env` file:
- `DATABASE_URL` - PostgreSQL connection string
- `POSTGRES_USER` - Database user
- `POSTGRES_PASSWORD` - Database password
- `POSTGRES_DB` - Database name
- `NODE_ENV` - Environment (development/production)

#### Server `.env` file:
- `DATABASE_URL` - PostgreSQL connection string
- `PORT` - Server port (default: 4000)
- `NODE_ENV` - Environment (development/production)

### Setup Instructions

1. Copy `.env.example` to `.env` in the root directory
2. Copy `server/.env.example` to `server/.env`
3. Update the values with your own credentials
