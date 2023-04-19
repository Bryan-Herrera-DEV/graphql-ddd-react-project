# frontend/Dockerfile
FROM node:18

WORKDIR /app

COPY . ./

RUN npm ci

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]