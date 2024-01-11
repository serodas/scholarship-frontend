FROM node:14.5.0-alpine

RUN apk update
RUN apk add git

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 4200 49153
CMD npm run start