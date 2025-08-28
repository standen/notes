import { vocab } from "@/utils/encoding";

export const SYMBOLS_PASSWORD =
  vocab.langEngBig +
  vocab.langEngSmall +
  vocab.langRuBig +
  vocab.langRuSmall +
  vocab.numbers +
  vocab.symbols;

export const validatePassword = (value: string) =>
  value.split("").every((item) => SYMBOLS_PASSWORD.includes(item));
