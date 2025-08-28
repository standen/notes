import { vocab } from "@/utils/encoding";

export const SYMBOLS_LOGIN =
  vocab.langEngBig + vocab.langEngSmall + vocab.numbers;

export const validateLogin = (value: string) =>
  value.split("").every((item) => SYMBOLS_LOGIN.includes(item));
