import { vocab } from "../encoding";

export const symbolsLogin =
  vocab.landEngBig + vocab.landEngSmall + vocab.numbers;

export const symbolsPassword =
  vocab.landEngBig +
  vocab.landEngSmall +
  vocab.langRuBig +
  vocab.langRuSmall +
  vocab.numbers +
  vocab.symbols;

export const validateLogin = (login: string): boolean =>
  login.split("").every((item) => symbolsLogin.includes(item));

export const validatePassword = (password: string): boolean =>
  password.split("").every((item) => symbolsPassword.includes(item));
