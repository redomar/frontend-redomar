FROM node:13.0.1
WORKDIR /usr/src/app
COPY ./app/ .
ADD package.json ./
RUN npm install
COPY .env .
EXPOSE 3000
CMD ["node", "index.js"]