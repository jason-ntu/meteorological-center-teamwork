FROM python:3.8-slim-buster

ENV TZ=Asia/Taipei

RUN apt-get update \
    && apt-get install -y wget cron procps vim

RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
RUN apt-get install -y glib2.0 ./google-chrome-stable_current_amd64.deb

RUN rm google-chrome-stable_current_amd64.deb \
    && rm -rf /var/lib/apt/lists/*

COPY ./requirements.txt /requirements.txt
COPY ./serviceAccountKey.json /serviceAccountKey.json

RUN pip install --upgrade pip \
    && pip install -r requirements.txt