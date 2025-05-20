import { ALPHABET } from "./alphabet";

export const checkIsStringValidForAlphabet = (input: string): boolean =>
  input.split("").every((sym) => ALPHABET.includes(sym));

const ALPHABET_MAP = ALPHABET.split("").reduce((acc, char, index) => {
  acc[char] = index;
  return acc;
}, {} as Record<string, number>);

export const stringAlphabetToUint8Array = (input: string): Uint8Array => {
  if (!checkIsStringValidForAlphabet(input)) {
    throw new Error("Присутствуют недопустимые символы!");
  }

  const result = new Uint8Array(input.length);

  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    const index = ALPHABET_MAP[char];

    result[i] = index;
  }

  return result;
};

export const uint8ArrayToStringAlphabet = (bytes: Uint8Array): string => {
  let result = "";

  for (let i = 0; i < bytes.length; i++) {
    const index = bytes[i];
    const char = ALPHABET[index];

    result += char;
  }

  return result;
};
