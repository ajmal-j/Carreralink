FROM node:alpine

WORKDIR /communication 

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 8000

CMD ["npm", "run" , "dev"]