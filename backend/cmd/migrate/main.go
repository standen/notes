package main

import (
	"context"
	"fmt"
	"log"
	"os"
	"path/filepath"
	"sort"

	"github.com/jackc/pgx/v5"
	"github.com/joho/godotenv"
)

const migrationsDir = "migrations"
const envPath = "../.env"

func main() {
	ctx := context.Background()

	err := godotenv.Load(envPath)
	if err != nil {
		log.Fatal("Failed to load env")
	}

	files, err := filepath.Glob(filepath.Join(migrationsDir, "*.sql"))
	if err != nil {
		log.Fatalf("Failed to list migration files: %v", err)
	}
	sort.Strings(files)

	conn, err := pgx.Connect(ctx, os.Getenv("DATABASE_URL"))
	if err != nil {
		log.Fatalf("Failed to connect to postgres: %v", err)
	}
	defer conn.Close(ctx)

	for _, file := range files {
		query, err := os.ReadFile(file)
		if err != nil {
			log.Fatalf("Failed to read migration file %s: %v", file, err)
		}

		if _, err := conn.Exec(ctx, string(query)); err != nil {
			log.Fatalf("Failed to apply migration file %s: %v", file, err)
		}

		fmt.Printf("Applied %s\n", file)
	}
}
