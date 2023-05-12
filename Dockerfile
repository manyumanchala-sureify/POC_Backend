FROM node:14.21-alpine3.15

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .

CMD npm run start:dev
