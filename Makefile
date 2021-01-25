all:

up:
	docker-compose up -d

develop:
	docker-compose -f docker-compose.yml -f docker-compose.develop.yml up --build

.PHONY: all up develop
