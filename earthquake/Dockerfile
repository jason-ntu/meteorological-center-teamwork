FROM df41022/crawler:1.0.0

WORKDIR /earthquake

COPY . .

RUN pip install --upgrade pip \
    && pip install -r requirements.txt

ENTRYPOINT ["python3"]
CMD ["run_earthquake.py"]
