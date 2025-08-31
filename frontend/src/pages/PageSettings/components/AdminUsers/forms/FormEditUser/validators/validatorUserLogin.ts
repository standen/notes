import { vocab } from "@/utils/encoding";

export const SYMBOLS_USER_LOGIN =
  vocab.langEngBig + vocab.langEngSmall + vocab.numbers;

export const validatorUserLogin = (value: string) =>
  value.split("").every((item) => SYMBOLS_USER_LOGIN.includes(item)) &&
  !vocab.numbers.includes(value[0]);
