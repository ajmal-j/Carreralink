FROM node:21

WORKDIR /client

COPY package*.json .

RUN npm install

COPY . . 

RUN npm run build

EXPOSE 3000

CMD ["npm", "run" , "start"]
# CMD ["npm", "run" , "dev"]