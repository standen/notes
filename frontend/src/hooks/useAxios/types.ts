export interface IResponse {
  status: "error" | "success";
  message: string | null;
  allowed_actions: string[] | null;
  login: string | null;
}
