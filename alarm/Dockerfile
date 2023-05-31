FROM node:18.16.0-alpine

WORKDIR /alarm
COPY . /alarm

RUN npm install --omit=dev

CMD ["npm", "start"]