FROM df41022/crawler:1.0.0

WORKDIR /electricity

COPY . .

RUN chmod +x electricity.py

ENTRYPOINT ["python3"]
CMD ["electricity.py"]