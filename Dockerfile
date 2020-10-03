# TODO
FROM node:12.13.0 as node
WORKDIR /app
COPY package.json /app/
RUN npm install
COPY . .
EXPOSE 8070
CMD [ "npm", "run", "start:dev" ]
