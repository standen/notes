type entity = "notes";
export const NO_DATA: Record<entity, string> = {
  notes: "Заметки отсутствуют",
};

type errors = "error401" | "error403" | "error404";
export const ERRORS_TEXT: Record<errors, string> = {
  error401: "Требуется авторизация",
  error403: "Доступ к данной странице запрещен",
  error404: "Ошибка 404: страница отсутствует",
};
