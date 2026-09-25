package model

type Response[T any] struct {
	Error   string `json:"error,omitempty"`
	Message string `json:"message,omitempty"`
	Result  *T     `json:"result,omitempty"`
}
