package utils

import (
	"encoding/json"
	"log"
	"net/http"

	"backend/internal/model"
)

func HttpResponse[T any](w http.ResponseWriter, statusCode int, res *model.Response[T]) {
	body, err := json.Marshal(res)
	if err != nil {
		log.Printf("http: failed to encode response: %v", err)

		statusCode = http.StatusInternalServerError
		body, _ = json.Marshal(&model.Response[struct{}]{
			Message: "Ошибка сериализации ответа",
			Error:   err.Error(),
		})
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(statusCode)
	_, _ = w.Write(body)
}

func HttpSuccessWithData[T any](w http.ResponseWriter, statusCode int, result *T) {
	HttpResponse(w, statusCode, &model.Response[T]{Result: result})
}

func HttpSuccessNoData(w http.ResponseWriter, statusCode int, msg string) {
	HttpResponse(w, statusCode, &model.Response[struct{}]{Message: msg})
}

func HttpError(w http.ResponseWriter, statusCode int, msg string) {
	writeError(w, statusCode, "", msg)
}

func HttpErrorWithCode(w http.ResponseWriter, statusCode int, code, msg string) {
	writeError(w, statusCode, code, msg)
}

func writeError(w http.ResponseWriter, statusCode int, code, msg string) {
	HttpResponse(w, statusCode, &model.Response[struct{}]{Error: code, Message: msg})
}
