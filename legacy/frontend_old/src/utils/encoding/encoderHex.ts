const HEX_SYMBOLS = "0123456789abcdef";

const checkIsStringValidForHexSymbols = (input: string): boolean =>
  input.split("").every((sym) => HEX_SYMBOLS.includes(sym));

const splitStringIntoPairs = (input: string): string[] => {
  if (input.length % 2 !== 0) {
    throw new Error("Строка должна состоять из byty в hex формате!");
  }
  return input.match(/.{1,2}/g) || [];
};

const HEX_TO_BYTE_MAP = Array.from({ length: 256 }, (_, i) => i).reduce(
  (acc, num) => {
    const hex = num.toString(16).padStart(2, "0").toLowerCase();
    acc[hex] = num;
    return acc;
  },
  {} as Record<string, number>
);

const BYTE_TO_HEX_MAP: Record<number, string> = Object.entries(
  HEX_TO_BYTE_MAP
).reduce((acc, [str, num]) => {
  acc[num] = str;
  return acc;
}, {} as Record<number, string>);

export const stringHexToUint8Array = (input: string): Uint8Array => {
  if (input.length % 2 !== 0) {
    throw new Error("Длина строки должна быть четной");
  }

  if (!checkIsStringValidForHexSymbols(input)) {
    throw new Error("Строка должна содержать только hex символы");
  }

  const pairsString = splitStringIntoPairs(input);

  const bytes = new Uint8Array(pairsString.length);

  for (let i = 0; i <= pairsString.length; i++) {
    const byte = HEX_TO_BYTE_MAP[pairsString[i]];
    bytes[i] = byte;
  }

  return bytes;
};

export const uint8ArrayToStringHex = (bytes: Uint8Array): string => {
  let result = "";

  for (let i = 0; i < bytes.length; i++) {
    const byte = bytes[i];
    let hex = BYTE_TO_HEX_MAP[byte];

    result += hex;
  }

  return result;
};
