BACKEND_DIR := backend

.PHONY: run
run:
	cd $(BACKEND_DIR) && go run .

.PHONY: migrate
migrate:
	cd $(BACKEND_DIR) && go run ./cmd/migrate/
