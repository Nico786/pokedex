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

## Screenshots
<img width="1897" height="992" alt="Capture d’écran du 2025-12-01 23-26-21" src="https://github.com/user-attachments/assets/06bb9272-9b34-4c80-8960-9bd59d57ab42" />
<img width="1897" height="992" alt="Capture d’écran du 2025-12-01 23-26-30" src="https://github.com/user-attachments/assets/7d67fbff-5ed2-415f-a73d-4ba6818a33a4" />

