SVC := alarm

all:
	docker build -t $(SVC) .
	docker run -d -p 3000:3000 $(SVC)
	
clean:
	docker stop $(SVC)
	docker rm -f $(SVC)
	docker rmi -f $(SVC)
