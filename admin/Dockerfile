FROM node:21-alpine3.18

WORKDIR /admin

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 9000

CMD ["npm", "run" , "dev"]