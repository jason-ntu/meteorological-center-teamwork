FROM node:12.12.0-alpine

WORKDIR /ui
COPY . /ui

RUN npm install --omit=dev

ENTRYPOINT ["npm"]
CMD ["start"]
