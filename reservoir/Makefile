all:
	docker build -t reservoir . --no-cache
	docker run --name reservoir -dt reservoir
clean:
	docker stop reservoir
	docker rm -f reservoir
	docker rmi -f reservoir
