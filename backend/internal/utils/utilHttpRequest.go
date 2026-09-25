package utils

import (
	"encoding/json"
	"net/http"
)

func ParseJSONBody[T any](r *http.Request) (*T, error) {
	var body T

	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		return nil, err
	}

	return &body, nil
}
