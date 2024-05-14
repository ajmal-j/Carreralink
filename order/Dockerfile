FROM node:18

WORKDIR /order

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 10000

CMD ["npm", "run" , "dev"]