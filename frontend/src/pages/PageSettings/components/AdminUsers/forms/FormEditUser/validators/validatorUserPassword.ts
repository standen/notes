import { vocab } from "@/utils/encoding";

export const SYMBOLS_USER_PASSWORD =
  vocab.langEngBig + vocab.langEngSmall + vocab.numbers + vocab.symbols;

export const validatorUserPassword = (value: string) =>
  value.split("").every((item) => SYMBOLS_USER_PASSWORD.includes(item));
