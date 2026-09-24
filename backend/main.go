package backend

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"

	"backend/internal/database"
	"backend/internal/handler"
	"backend/internal/router"
)

func main() {
	dsn := os.Getenv("DATABASE_URL")
	if dsn == "" {
		dsn = "postgres://user:password@localhost:5432/mydb?sslmode=disable"
	}

	if err := database.Init(context.Background(), dsn); err != nil {
		log.Fatalf("failed to connect to postgres: %v", err)
	}
	defer database.Close()

	h := handler.New(database.DB())

	srv := &http.Server{
		Addr:    ":3000",
		Handler: router.New(h),
	}

	go func() {
		sig := make(chan os.Signal, 1)
		signal.Notify(sig, syscall.SIGINT, syscall.SIGTERM)
		<-sig
		log.Println("shutting down...")
		_ = srv.Shutdown(context.Background())
	}()

	log.Println("server started on :3000")
	if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
		log.Fatal(err)
	}
}
