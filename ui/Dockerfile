FROM node:12.12.0-alpine

WORKDIR /ui
COPY . /ui

RUN npm install --omit=dev
RUN npm rebuild node-sass

ENTRYPOINT ["npm"]
CMD ["start"]
