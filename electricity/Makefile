all:
	docker build -t electricity . --no-cache
	docker run --name electricity -dt electricity

clean:
	docker stop electricity
	docker rm -f electricity
	docker rmi -f electricity