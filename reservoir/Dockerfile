FROM df41022/crawler:1.0.0

WORKDIR /reservoir

COPY . .

RUN pip install --upgrade pip \
    && pip install -r requirements.txt

ENTRYPOINT ["python3"]
CMD ["reservoir.py"]
