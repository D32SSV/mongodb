FROM node:latest
WORKDIR /usr/src/app
COPY package*.json ./
EXPOSE 3000
RUN npm i
COPY . .
CMD [ "npm", "start" ]