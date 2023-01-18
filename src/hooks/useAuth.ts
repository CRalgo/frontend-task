import { useEffect, useState } from "react";
import { configKeys } from "../utils/enums";

export const useAuth = (): string | boolean => {
  const [token, setToken] = useState<any>(false);
  useEffect(() => {
    let data = localStorage.getItem(configKeys.AUTH_TOKEN);
    setToken(data);
  });

  return token ? token : false;
};