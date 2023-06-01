FROM df41022/crawler:1.0.0

WORKDIR /electricity

COPY . .

RUN pip install --upgrade pip \
    && pip install -r requirements.txt

RUN chmod +x electricity.py

ENTRYPOINT ["python3"]
CMD ["electricity.py"]