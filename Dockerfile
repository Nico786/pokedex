# Base stage - shared dependencies
FROM node:22-alpine AS base
WORKDIR /app
COPY package.json package-lock.json ./

# Development stage
FROM base AS development
RUN npm install
COPY tsconfig*.json vite.config.ts ./
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev"]

# Dependencies stage for production
FROM base AS dependencies
RUN npm ci --omit=dev

# Build stage
FROM base AS builder
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}
RUN npm ci
COPY tsconfig*.json vite.config.ts ./
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine AS production
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
