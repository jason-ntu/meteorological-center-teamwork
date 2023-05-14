# build 指令:  docker build -t electricity .  
# run 指令: docker run -dt electricity
# 查詢運行中 container: docker ps
# 進入 bash: docker exec -it [container_id] bash

FROM python:3.8-slim-buster

# 設定時區
ENV TZ=Asia/Taipei

# 安裝 linux 常用套件
RUN apt-get update && apt-get install -y wget && apt-get -y install cron && apt-get install -y procps && apt-get -y install vim && rm -rf /var/lib/apt/lists/*

# 安裝 google chrome
RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
RUN apt-get update && apt-get install -y glib2.0
RUN apt-get install -y ./google-chrome-stable_current_amd64.deb

# 設定 container 內專案位置
WORKDIR /electricity

# 把本地端的檔案加到 container 的目錄
ADD . .

RUN pip install --upgrade pip

RUN pip install -r requirements.txt

RUN chmod +x electricity.py

# Run the reservior.py file when the container starts
CMD [ "python", "./electricity.py" ]