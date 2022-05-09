FROM node:latest As development

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install --only=development

COPY . .

RUN yarn build

FROM node:latest as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]