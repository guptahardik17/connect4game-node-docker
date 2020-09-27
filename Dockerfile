FROM node:latest

WORKDIR "/app"

COPY package.json ./

RUN npm install

RUN npm install mysql2 --save

COPY . .

EXPOSE 4000

CMD ["npm", "run", "start"]