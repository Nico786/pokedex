# Base stage - dependencies and system pkgs
FROM node:22-alpine AS base
WORKDIR /app
RUN apk add --no-cache openssl
COPY package.json package-lock.json ./

# Prisma stage - generate shared Prisma client
FROM base AS prisma
RUN npm install
COPY prisma ./prisma
RUN npx prisma generate

# Development stage
FROM base AS development
RUN npm install
COPY --from=prisma /app/prisma ./prisma
COPY --from=prisma /app/node_modules/.prisma ./node_modules/.prisma
COPY tsconfig.json ./
COPY . .
EXPOSE 4000
CMD ["npm", "run", "dev"]

# Build stage
FROM base AS builder
RUN npm ci
COPY --from=prisma /app/node_modules/.prisma ./node_modules/.prisma
COPY tsconfig.json ./
COPY . .
RUN npm run compile

# Production dependencies stage
FROM base AS prod-dependencies
RUN npm ci --omit=dev && npm cache clean --force

# Production stage
FROM node:22-alpine AS production
WORKDIR /app
RUN apk add --no-cache openssl
COPY --from=prod-dependencies /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=prisma /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=prisma /app/prisma ./prisma
COPY package.json ./
EXPOSE 4000
CMD ["npm", "start"]
