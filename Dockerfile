FROM node:14-alpine

RUN mkdir /app

WORKDIR /app

COPY . /app

RUN npm install

EXPOSE 80

CMD ["npm", "run", "server-start"]
