FROM node:alpine

WORKDIR /ai 

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 7000

CMD ["npm", "run" , "dev"]