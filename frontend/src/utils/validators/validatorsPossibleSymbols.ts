import { ALPHABET } from "@standen/encoding";

import { type TValidateEntities } from "./types";

type TEntitiesSymbols = Record<TValidateEntities, string>;

export const SYMBOLS: Record<"ru" | "en" | "spaceSymbol", string> = {
  ru: [...ALPHABET.ruBig, ...ALPHABET.ruSmall].join(""),
  en: [...ALPHABET.enBig, ...ALPHABET.enSmall].join(""),
  spaceSymbol: " ",
};

export const POSSIBLE_SYMBOLS: TEntitiesSymbols = {
  login: [...ALPHABET.digits, ...SYMBOLS.en].join(""),
  password: [...ALPHABET.digits, ...SYMBOLS.en, ...ALPHABET.specChars].join(""),
  roleName: [...ALPHABET.digits, ...SYMBOLS.en].join(""),
  noteLink: [...ALPHABET.digits, ...SYMBOLS.en].join(""),
  noteName: [
    ...ALPHABET.digits,
    ...SYMBOLS.en,
    ...SYMBOLS.ru,
    ...SYMBOLS.spaceSymbol,
  ].join(""),
};
