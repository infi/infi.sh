FROM node:alpine

WORKDIR /app

COPY . /app

RUN apk add --update --no-cache \
    make \
    g++ \
    jpeg-dev \
    cairo-dev \
    giflib-dev \
    pango-dev \
    libtool \
    autoconf \
    automake

RUN npm i -D

RUN npm run build
EXPOSE 3000

CMD npm run start