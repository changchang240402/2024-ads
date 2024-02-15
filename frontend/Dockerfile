FROM node:16-alpine as BUILD_IMAGE

WORKDIR /var/www/html

COPY package.json .

RUN npm install

COPY . .

CMD [ "npm", "run", "dev" ]
