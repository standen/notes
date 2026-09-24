.PHONY: run migrate

DB_URL ?= postgres://user:password@localhost:5432/mydb?sslmode=disable

run:
	DATABASE_URL="$(DB_URL)" go run .

migrate: 
	DATABASE_URL="$(DB_URL)" go run ./cmd/migrate -dir ./migrations