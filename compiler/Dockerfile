FROM node:21-alpine3.18

# install dependencies
RUN apk update && apk add --no-cache build-base g++ python3 py3-pip php php-cli && rm -rf /var/cache/apk/*

WORKDIR /compiler

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 11000

CMD ["npm", "run" , "dev"]