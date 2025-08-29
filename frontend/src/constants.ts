type entity = "notes" | "roles" | "users";
export const NO_DATA: Record<entity, string> = {
  roles: "Роли отсутствуют",
  users: "Пользователи отсутствуют",
  notes: "Заметки отсутствуют",
};

type errors =
  | "error401"
  | "error403"
  | "error404"
  | "required"
  | "regexp"
  | "notAllValidate"
  | "loginExists"
  | "roleExists";
export const ERRORS_TEXT: Record<errors, string> = {
  error401: "Требуется авторизация",
  error403: "Доступ к данной странице запрещен",
  error404: "Ошибка 404: страница отсутствует",
  required: "Поле является обязательным",
  regexp: "Недопустимое значение поля",
  notAllValidate: "Не все поля прошли валидацию",
  loginExists: "Данный логин занят",
  roleExists: "Данная роль уже существует",
};
