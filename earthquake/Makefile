all:
	docker build -t earthquake . --no-cache
	docker run --name earthquake -dt earthquake
clean:
	docker rm -f earthquake
	docker rmi -f earthquake
	python ./clear.py
