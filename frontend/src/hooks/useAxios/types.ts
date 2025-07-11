export interface IResponse {
  status: "error" | "success";
  message?: string | null;
  userAllowedActions?: string[] | null;
  userLogin?: string | null;
}
