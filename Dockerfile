FROM node:latest
WORKDIR /usr/src/app
COPY package*.json ./
# COPY config.json ./
RUN npm install
COPY . .
EXPOSE 8085 8085
CMD [ "node", "cookieblob.js" ]
