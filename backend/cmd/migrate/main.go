package main

import (
	"context"
	"flag"
	"fmt"
	"log"
	"os"
	"path/filepath"
	"sort"
	"strings"
	"time"

	"github.com/jackc/pgx/v5"
)

func main() {
	dir := flag.String("dir", "migrations", "папка с .sql-миграциями")
	flag.Parse()

	dsn := os.Getenv("DATABASE_URL")
	if dsn == "" {
		log.Fatal("переменная окружения DATABASE_URL не задана")
	}

	ctx, cancel := context.WithTimeout(context.Background(), 2*time.Minute)
	defer cancel()

	conn, err := pgx.Connect(ctx, dsn)
	if err != nil {
		log.Fatalf("connect to postgres: %v", err)
	}
	defer conn.Close(ctx)

	if err := ensureTable(ctx, conn); err != nil {
		log.Fatalf("create schema_migrations: %v", err)
	}

	applied, err := appliedSet(ctx, conn)
	if err != nil {
		log.Fatalf("read applied migrations: %v", err)
	}

	files, err := migrationFiles(*dir)
	if err != nil {
		log.Fatalf("read migrations dir: %v", err)
	}

	var pending int
	for _, f := range files {
		name := filepath.Base(f)
		if _, ok := applied[name]; ok {
			continue
		}
		pending++
		if err := apply(ctx, conn, f); err != nil {
			log.Fatalf("apply %s: %v", name, err)
		}
	}

	if pending == 0 {
		log.Println("migrate: новых миграций нет, база актуальна")
	}
}

func ensureTable(ctx context.Context, conn *pgx.Conn) error {
	_, err := conn.Exec(ctx, `
		CREATE TABLE IF NOT EXISTS schema_migrations (
			name       TEXT PRIMARY KEY,
			applied_at TIMESTAMPTZ NOT NULL DEFAULT now()
		)`)
	return err
}

func appliedSet(ctx context.Context, conn *pgx.Conn) (map[string]struct{}, error) {
	rows, err := conn.Query(ctx, `SELECT name FROM schema_migrations`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	set := make(map[string]struct{})
	for rows.Next() {
		var name string
		if err := rows.Scan(&name); err != nil {
			return nil, err
		}
		set[name] = struct{}{}
	}
	return set, rows.Err()
}

func migrationFiles(dir string) ([]string, error) {
	entries, err := os.ReadDir(dir)
	if err != nil {
		return nil, err
	}

	files := make([]string, 0, len(entries))
	for _, e := range entries {
		if e.IsDir() || !strings.HasSuffix(e.Name(), ".sql") {
			continue
		}
		files = append(files, filepath.Join(dir, e.Name()))
	}
	sort.Strings(files)
	return files, nil
}

func apply(ctx context.Context, conn *pgx.Conn, path string) error {
	sql, err := os.ReadFile(path)
	if err != nil {
		return err
	}

	tx, err := conn.Begin(ctx)
	if err != nil {
		return err
	}
	defer tx.Rollback(ctx)

	if _, err := tx.Exec(ctx, string(sql)); err != nil {
		return fmt.Errorf("exec sql: %w", err)
	}

	if _, err := tx.Exec(ctx,
		`INSERT INTO schema_migrations (name) VALUES ($1)`,
		filepath.Base(path),
	); err != nil {
		return fmt.Errorf("insert into schema_migrations: %w", err)
	}

	if err := tx.Commit(ctx); err != nil {
		return err
	}

	log.Printf("applied: %s", filepath.Base(path))
	return nil
}
