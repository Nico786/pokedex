FROM node:22-bookworm-slim
WORKDIR /app
COPY package.json tsconfig*.json vite.config.ts ./
RUN npm install
COPY src /app/src
RUN apt-get update -y && apt-get install -y openssl
EXPOSE 5173
CMD ["npm", "run", "dev"]
