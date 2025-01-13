FROM node:18
WORKDIR /usr/src/app
COPY package*.json ./
EXPOSE 3000
RUN npm i
RUN npm i -g nodemon
COPY . .
CMD [ "npm", "start" ]