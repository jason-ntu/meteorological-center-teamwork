# build 指令:  docker build -t electricity .  
# run 指令: docker run -dt electricity
# 查詢運行中 container: docker ps
# 進入 bash: docker exec -it [container_id] bash

FROM python:3.8-slim-buster

# 設定時區
ENV TZ=Asia/Taipei

# 安裝 linux 常用套件
RUN apt-get update && \
    apt-get install -y wget cron procps vim

# 安裝 google chrome
RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
RUN apt-get update && apt-get install -y glib2.0
RUN apt-get install -y ./google-chrome-stable_current_amd64.deb
RUN rm google-chrome-stable_current_amd64.deb
RUN rm -rf /var/lib/apt/lists/*