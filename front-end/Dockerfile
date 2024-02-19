FROM node:20-alpine3.18 as builder

COPY public /project/public
COPY src /project/src
COPY package.json /project/package.json
COPY tsconfig.json /project/tsconfig.json
COPY .env /project/.env

WORKDIR /project

RUN npm install && npm run build

FROM nginx:alpine

COPY --from=builder /project/build /usr/share/nginx/html
