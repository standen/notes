package utils

import (
	"encoding/json"
	"net/http"

	"backend/internal/model"
)

func HttpResponse[T any](w http.ResponseWriter, statusCode int, res *model.Response[T]) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(statusCode)

	if err := json.NewEncoder(w).Encode(res); err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		_, _ = w.Write([]byte(`{"error":"Ошибка сериализации ответа","message":"Ошибка сериализации ответа"}`))
	}
}

func HttpSuccessWithData[T any](w http.ResponseWriter, statusCode int, result *T) {
	res := model.Response[T]{
		Result: result,
	}
	HttpResponse(w, statusCode, &res)
}

func HttpSuccessNoData(w http.ResponseWriter, msg string) {
	res := model.Response[struct{}]{
		Message: msg,
	}
	HttpResponse(w, http.StatusOK, &res)
}

func HttpError(w http.ResponseWriter, statusCode int, msg string, errArgs ...string) {
	res := model.Response[struct{}]{
		Message: msg,
	}
	
	if len(errArgs) > 0 {
		res.Error = errArgs[0]
	}
	HttpResponse(w, statusCode, &res)
}
