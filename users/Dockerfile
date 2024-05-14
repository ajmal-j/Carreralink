FROM node:21-alpine3.18

WORKDIR /users

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "run" , "dev"]