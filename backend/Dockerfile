FROM node:current-alpine

WORKDIR /app

COPY package.json ./
RUN npm install

COPY . .

EXPOSE 3000


CMD [ "node", "dist/server.js" ]