package main

import (
	"context"
	"flag"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/joho/godotenv"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found, using environment variables or defaults")
	}

	host := flag.String("host", getEnv("DB_HOST", "localhost"), "Database host")
	port := flag.String("port", getEnv("DB_PORT", "5432"), "Database port")
	user := flag.String("user", getEnv("DB_USER", "postgres"), "Database user")
	password := flag.String("password", getEnv("DB_PASSWORD", "postgres"), "Database password")
	dbname := flag.String("dbname", getEnv("DB_NAME", "postgres"), "Database name")
	flag.Parse()

	connStr := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
		*host, *port, *user, *password, *dbname)

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	pool, err := pgxpool.New(ctx, connStr)
	if err != nil {
		log.Fatalf("Unable to connect to database: %v\n", err)
	}
	defer pool.Close()

	if err := createUsersTable(ctx, pool); err != nil {
		fmt.Fprintf(os.Stderr, "Error creating users table: %v\n", err)
		os.Exit(1)
	}
	fmt.Println("Table 'users' created successfully or already exists.")

	if err := createSessionsTable(ctx, pool); err != nil {
		fmt.Fprintf(os.Stderr, "Error creating sessions table: %v\n", err)
		os.Exit(1)
	}
	fmt.Println("Table 'sessions' created successfully or already exists.")

	fmt.Println("All migrations completed successfully.")
}

func getEnv(key, defaultValue string) string {
	value := os.Getenv(key)
	if value == "" {
		return defaultValue
	}
	return value
}

func createUsersTable(ctx context.Context, pool *pgxpool.Pool) error {
	query := `
	CREATE TABLE IF NOT EXISTS users (
		id UUID PRIMARY KEY,
		login VARCHAR(255) NOT NULL UNIQUE,
		password VARCHAR(255) NOT NULL,
		created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
		updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
	);
	`
	_, err := pool.Exec(ctx, query)
	return err
}

func createSessionsTable(ctx context.Context, pool *pgxpool.Pool) error {
	query := `
	CREATE TABLE IF NOT EXISTS sessions (
		id UUID PRIMARY KEY,
		user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
		token VARCHAR(512) NOT NULL UNIQUE,
		expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
		created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
		updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
	);
	CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);
	CREATE INDEX IF NOT EXISTS idx_sessions_token ON sessions(token);
	CREATE INDEX IF NOT EXISTS idx_sessions_expires_at ON sessions(expires_at);
	`
	_, err := pool.Exec(ctx, query)
	return err
}
