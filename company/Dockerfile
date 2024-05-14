FROM node:21-alpine3.18

WORKDIR /company

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "run" , "dev"]