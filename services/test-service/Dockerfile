# Base Image
FROM node:14

WORKDIR /Users/fetch/Projects/Pull-up/PullUp/services/test-service
COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "start"]