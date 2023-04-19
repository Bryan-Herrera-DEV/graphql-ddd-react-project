# backend/Dockerfile
FROM node:18

WORKDIR /app

COPY . ./

RUN npm ci

COPY . .

EXPOSE 4000

CMD ["npm", "run", "dev"]