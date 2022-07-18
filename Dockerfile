FROM node:current-alpine3.16 as builder

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npm run docs

FROM node:current-alpine3.16

WORKDIR /usr/app

COPY package*.json ./

RUN npm install --omit=dev

COPY --from=builder /usr/app/dist ./dist

COPY --from=builder /usr/app/docs ./docs

COPY .env ./

EXPOSE 8080

CMD ["npm", "start"]