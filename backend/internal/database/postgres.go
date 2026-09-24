package database

import (
	"context"
	"fmt"
	"log"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
)

var pool *pgxpool.Pool

func Init(ctx context.Context, dsn string) error {
	config, err := pgxpool.ParseConfig(dsn)
	if err != nil {
		return fmt.Errorf("parse dsn: %w", err)
	}

	config.MaxConns = 20
	config.MinConns = 2
	config.MaxConnLifetime = time.Hour
	config.MaxConnIdleTime = 30 * time.Minute
	config.HealthCheckPeriod = time.Minute

	p, err := pgxpool.NewWithConfig(ctx, config)
	if err != nil {
		return fmt.Errorf("create pool: %w", err)
	}

	pingCtx, cancel := context.WithTimeout(ctx, 5*time.Second)
	defer cancel()

	if err := p.Ping(pingCtx); err != nil {
		p.Close()
		return fmt.Errorf("ping postgres: %w", err)
	}

	pool = p
	log.Println("postgres: connected")
	return nil
}

func DB() *pgxpool.Pool {
	if pool == nil {
		panic("database is not initialized, call database.Init first")
	}
	return pool
}

func Close() {
	if pool != nil {
		pool.Close()
		log.Println("postgres: connection closed")
	}
}
