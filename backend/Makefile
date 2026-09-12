include .env

.PHONY: migrate

DB_HOST ?= $(DB_HOST)
DB_PORT ?= $(DB_PORT)
DB_USER ?= $(DB_USER)
DB_PASSWORD ?= $(DB_PASSWORD)
DB_NAME ?= $(DB_NAME)

migrate:
	@echo "Running database migrations..."
	@go run cmd/migrate/main.go \
		-host=$(DB_HOST) \
		-port=$(DB_PORT) \
		-user=$(DB_USER) \
		-password=$(DB_PASSWORD) \
		-dbname=$(DB_NAME)
