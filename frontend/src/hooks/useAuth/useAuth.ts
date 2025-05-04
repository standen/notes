import { useCallback } from "react";

export const useAuth = () => {
  const loginAction = useCallback(async () => {}, []);
  
  return { loginAction };
};
