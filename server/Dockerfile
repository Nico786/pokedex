FROM node:22-bookworm-slim
WORKDIR /app
COPY . /app/
RUN apt-get update -y && apt-get install -y openssl
RUN npm install
EXPOSE 4000
CMD ["npm", "run","dev"]
