FROM node:alpine

WORKDIR /users

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "run" , "dev"]