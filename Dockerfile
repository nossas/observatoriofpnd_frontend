FROM node:21.1.0-alpine3.18 as BUILD_IMAGE

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build


FROM nginx:1.21.6-alpine as PRODUCTION_IMAGE

COPY --from=BUILD_IMAGE /app/dist/ /usr/share/nginx/html

COPY env.sh /docker-entrypoint.d/env.sh

RUN chmod +x /docker-entrypoint.d/env.sh

