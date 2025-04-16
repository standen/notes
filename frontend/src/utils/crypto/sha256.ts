import * as crypto from "node:crypto";

export const getSha256 = (text: string) =>
  crypto.createHash("sha256").update(text).digest("hex");
