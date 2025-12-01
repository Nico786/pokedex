# Pokémon Project

A full-stack Pokémon CRUD app built with React, TypeScript, GraphQL, Apollo Server, Prisma, and PostgreSQL. Browse the Pokédex, search Pokémon, and create custom teams!

## Tech Stack
- **Frontend:** React, TypeScript, Vite, Apollo Client
- **Backend:** Node.js, Apollo Server, GraphQL, Prisma ORM, PostgreSQL
- **DevOps:** Docker, Docker Compose, Kubernetes (Minikube), GitHub Actions

## Quick Start

### Docker Compose (Local)
```bash
git clone <repository-url>
cd pokemon-project
docker compose up --build -d
```
- Frontend: http://localhost:5173
- Backend: http://localhost:4000

> ⚠️ See [SECURITY.md](SECURITY.md) for .env setup and secrets management before starting with Docker.

### Kubernetes (Minikube)
```bash
minikube start
minikube addons enable ingress
kubectl apply -f k8s/
# Add "<minikube_ip> pokemon.local" to /etc/hosts
```
- App: http://pokemon.local

## Features
- Search and browse Pokédex
- View Pokémon details
- Create/manage teams (CRUD)
- PostgreSQL persistent storage

## Links
- [Pokémon API](https://tyradex.vercel.app/)
- [Prisma Docs](https://www.prisma.io/docs)
- [Apollo Server Docs](https://www.apollographql.com/docs/apollo-server/)
- [React Docs](https://react.dev/)