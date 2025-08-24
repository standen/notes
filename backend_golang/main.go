package main

import (
	"encoding/json"
	"net/http"
	"time"
)

type User struct {
	ID    int    `json:"id"`
	Name  string `json:"name"`
	Email string `json:"email"`
}

func GetUser(w http.ResponseWriter, r *http.Request) {
	user := User{
		ID:    1,
		Name:  "John Doe",
		Email: "john@example.com",
	}

	w.Header().Set("Content-Type", "application/json")

	cookie := &http.Cookie{
		Name:     "exampleCookie",
		Value:    "Hello world!",
		Path:     "/",
		Expires:  time.Now().Add(24 * time.Hour),
		HttpOnly: true,
		Secure:   true, // Только для HTTPS
		SameSite: http.SameSiteLaxMode,
	}

	http.SetCookie(w, cookie)

	json.NewEncoder(w).Encode(user)
}

func main() {
	http.HandleFunc("/user", GetUser)
	http.ListenAndServe(":8080", nil)
}
