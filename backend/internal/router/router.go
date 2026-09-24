package router

import (
	"net/http"
	"time"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"

	"backend/internal/handler"
)

func New(h *handler.Handler) http.Handler {
	r := chi.NewRouter()

	r.Use(middleware.RequestID)
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)
	r.Use(middleware.Timeout(30 * time.Second))

	r.Get("/health", func(w http.ResponseWriter, _ *http.Request) {
		w.WriteHeader(http.StatusOK)
		_, _ = w.Write([]byte("ok"))
	})

	r.Route("/api/v1", func(r chi.Router) {
		r.Route("/users", func(r chi.Router) {
			r.Get("/", h.ListUsers)
			r.Post("/", h.CreateUser)

			r.Route("/{id}", func(r chi.Router) {
				r.Get("/", h.GetUser)
				r.Put("/", h.UpdateUser)
				r.Delete("/", h.DeleteUser)
			})
		})
	})

	return r
}
