# Development stage
FROM node:22-bookworm-slim AS development
WORKDIR /app
RUN apt-get update -y && apt-get install -y openssl
COPY package.json tsconfig.json ./
RUN npm install
COPY prisma ./prisma
RUN npx prisma generate
COPY . .
EXPOSE 4000
CMD ["npm", "run", "dev"]

# Build stage
FROM node:22-bookworm-slim AS builder
WORKDIR /app
RUN apt-get update -y && apt-get install -y openssl
COPY package.json tsconfig.json ./
RUN npm ci --only=production=false
COPY prisma ./prisma
RUN npx prisma generate
COPY . .
RUN npm run compile

# Production stage
FROM node:22-bookworm-slim AS production
WORKDIR /app
RUN apt-get update -y && apt-get install -y openssl && apt-get clean && rm -rf /var/lib/apt/lists/*
COPY package.json ./
RUN npm ci --only=production
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/prisma ./prisma
EXPOSE 4000
CMD ["npm", "start"]
