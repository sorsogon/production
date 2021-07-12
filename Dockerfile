# Build
FROM node:alpine
WORKDIR /app

COPY . ./
RUN npm i -g serve && npm install && NODE_OPTIONS=--max_old_space_size=4096 npm run build

EXPOSE 80
CMD [ "serve", "-l", "80", "-s", "build" ]
