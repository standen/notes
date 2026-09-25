BACKEND_DIR := backend

.PHONY: run
run:
	cd $(BACKEND_DIR) && go run ./cmd/api/

.PHONY: migrate
migrate:
	cd $(BACKEND_DIR) && go run ./cmd/migrate/
