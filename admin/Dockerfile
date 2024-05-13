FROM node:18-alpine

WORKDIR /admin

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 9000

CMD ["npm", "run" , "dev"]