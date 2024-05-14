FROM node:21-alpine3.18

WORKDIR /ai 

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 7000

CMD ["npm", "run" , "dev"]