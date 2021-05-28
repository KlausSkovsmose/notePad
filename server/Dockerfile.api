FROM node:14-alpine3.10

LABEL version="1.0"
LABEL description="Development image for the Notepad MERN API"

WORKDIR /usr/src/app

COPY ["package.json","package-lock.json*", "./"]

RUN npm install && npm cache clean --force

COPY . .

EXPOSE 5000

CMD [ "npm", "start" ]