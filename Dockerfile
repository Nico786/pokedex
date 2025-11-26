# Development stage
FROM node:22-bookworm-slim AS development
WORKDIR /app
RUN apt-get update -y && apt-get install -y openssl
COPY package.json tsconfig*.json vite.config.ts ./
RUN npm install
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev"]

# Build stage
FROM node:22-bookworm-slim AS builder
WORKDIR /app
COPY package.json package-lock.json tsconfig*.json vite.config.ts ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine AS production
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
