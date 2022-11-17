FROM node:16-alpine as development

WORKDIR /home/node/app

COPY . /home/node/app

RUN npm install

RUN npm run build

CMD ["yarn", "start"]
