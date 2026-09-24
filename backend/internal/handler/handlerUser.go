package handler

import (
	"encoding/json"
	"errors"
	"net/http"
	"strconv"

	"github.com/go-chi/chi/v5"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

type Handler struct {
	db *pgxpool.Pool
}

func New(db *pgxpool.Pool) *Handler {
	return &Handler{db: db}
}

func (h *Handler) GetUser(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.Atoi(chi.URLParam(r, "id"))
	if err != nil {
		http.Error(w, "invalid id", http.StatusBadRequest)
		return
	}

	var name string
	err = h.db.QueryRow(r.Context(),
		`SELECT name FROM users WHERE id = $1`, id,
	).Scan(&name)

	if errors.Is(err, pgx.ErrNoRows) {
		http.Error(w, "user not found", http.StatusNotFound)
		return
	}
	if err != nil {
		http.Error(w, "internal error", http.StatusInternalServerError)
		return
	}

	writeJSON(w, map[string]any{"id": id, "name": name})
}

func (h *Handler) ListUsers(w http.ResponseWriter, r *http.Request) {
	rows, err := h.db.Query(r.Context(), `SELECT id, name FROM users ORDER BY id LIMIT 100`)
	if err != nil {
		http.Error(w, "internal error", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	type user struct {
		ID   int    `json:"id"`
		Name string `json:"name"`
	}
	users := make([]user, 0)

	for rows.Next() {
		var u user
		if err := rows.Scan(&u.ID, &u.Name); err != nil {
			http.Error(w, "internal error", http.StatusInternalServerError)
			return
		}
		users = append(users, u)
	}

	writeJSON(w, users)
}

func (h *Handler) CreateUser(w http.ResponseWriter, _ *http.Request) {
	http.Error(w, "not implemented", http.StatusNotImplemented)
}

func (h *Handler) UpdateUser(w http.ResponseWriter, _ *http.Request) {
	http.Error(w, "not implemented", http.StatusNotImplemented)
}

func (h *Handler) DeleteUser(w http.ResponseWriter, _ *http.Request) {
	http.Error(w, "not implemented", http.StatusNotImplemented)
}

func writeJSON(w http.ResponseWriter, v any) {
	w.Header().Set("Content-Type", "application/json")
	_ = json.NewEncoder(w).Encode(v)
}
