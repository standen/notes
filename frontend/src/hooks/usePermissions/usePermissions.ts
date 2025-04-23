import { useState, useCallback, useEffect } from "react";
import axios from "axios";

export const usePermissions = () => {
  const [permissions, setPermissions] = useState<string[]>([]);

  const getPermissions = useCallback(async () => {}, []);

  useEffect(() => {
    getPermissions();
  }, []);

  return { permissions };
};
