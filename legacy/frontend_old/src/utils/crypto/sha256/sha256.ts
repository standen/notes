import {
  stringAlphabetToUint8Array,
  uint8ArrayToStringHex,
} from "@/utils/encoding";

export const sha256 = async (message?: string) => {
  if (!message) return "";
  const hashBuffer = await crypto.subtle.digest(
    "SHA-256",
    stringAlphabetToUint8Array(message)
  );

  const hashArray = new Uint8Array(hashBuffer);

  return uint8ArrayToStringHex(hashArray);
};
