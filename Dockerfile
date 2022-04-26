FROM node:lts-bullseye

WORKDIR /app

COPY . /app

RUN apt update
RUN apt install -y build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev

RUN npm i -D

RUN npm run build
EXPOSE 3000

CMD npm run start