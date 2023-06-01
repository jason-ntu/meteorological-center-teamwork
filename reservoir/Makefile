all:
	docker build -t reservoir . --no-cache
	docker run --name reservoir -dt reservoir

test:
	python3 -m unittest reservoirTest.py

coverage:
	coverage run -m unittest reservoirTest.py
	coverage report -m

clean:
	docker stop reservoir
	docker rm -f reservoir
	docker rmi -f reservoir
