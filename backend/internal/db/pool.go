package db

import (
	"context"
	"fmt"
	"os"

	"github.com/jackc/pgx/v5/pgxpool"
)

func NewPool(ctx context.Context) (*pgxpool.Pool, error) {
	dsn := os.Getenv("POSTGRES_DSN")
	if dsn == "" {
		host := os.Getenv("POSTGRES_HOST")
		if host == "" {
			host = "localhost"
		}

		port := os.Getenv("POSTGRES_PORT")
		if port == "" {
			port = "5432"
		}

		user := os.Getenv("POSTGRES_USER")
		if user == "" {
			user = "postgres"
		}

		password := os.Getenv("POSTGRES_PASSWORD")
		dbname := os.Getenv("POSTGRES_DB")

		dsn = fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
			host, port, user, password, dbname)
	}

	pool, err := pgxpool.New(ctx, dsn)
	if err != nil {
		return nil, fmt.Errorf("unable to connect to database: %w", err)
	}

	return pool, nil
}
