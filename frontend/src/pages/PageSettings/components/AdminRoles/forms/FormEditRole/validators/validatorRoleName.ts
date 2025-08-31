import { vocab } from "@/utils/encoding";

export const SYMBOLS_ROLE_NAME =
  vocab.langEngBig + vocab.langEngSmall + vocab.numbers;

export const validateRoleName = (value: string) =>
  value.split("").every((item) => SYMBOLS_ROLE_NAME.includes(item)) &&
  !vocab.numbers.includes(value[0]);
