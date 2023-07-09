FROM node:14.15.5-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 80

CMD [ "node", "server.js"]