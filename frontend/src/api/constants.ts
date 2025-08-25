export const PORT = import.meta.env.VITE_BACKEND_PORT;
export const BASE_URL = `http://localhost:${PORT}`;

export interface IResponse {
  message?: string;
  userAllowedActions?: string[] | null;
  userLogin?: string | null;
}

export const ERRORS_TEXT = {
  required: "Поле является обязательным",
};
