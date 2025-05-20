import { TABLE_L_OPERATION } from "./tableL";
import { KEYS_CONSTS, TABLE_L, TABLE_S, TABLE_S_INV } from "./operationsConsts";

import {
  uint8ArrayToStringAlphabet,
  uint8ArrayToStringHex,
  stringAlphabetToUint8Array,
  stringHexToUint8Array,
} from "@utils/encoding";

export class Kuznechik {
  private keys: Uint8Array[];

  constructor(key: Uint8Array) {
    this.keys = this.generateKeys(this.shareKey(key));
  }

  private splitInto16ByteBlocks = (data: Uint8Array): Uint8Array[] => {
    const blockSize = 16;
    const blocks: Uint8Array[] = [];

    for (let i = 0; i < data.length; i += blockSize) {
      const block = data.subarray(i, i + blockSize);

      if (block.length !== 16) {
        const temp: Uint8Array = new Uint8Array(16).fill(255);
        temp.set(block);
        blocks.push(temp);
      } else {
        blocks.push(block);
      }
    }

    return blocks;
  };

  private shareKey = (key: Uint8Array): Uint8Array => {
    let temp = [...key];
    while (temp.length < 32) {
      temp = [...temp, ...key];
    }

    const result: Uint8Array = new Uint8Array(32);
    result.set(temp.slice(0, 32), 0);

    return result;
  };

  private generateKeys = (key: Uint8Array): Uint8Array[] => {
    const keys: Uint8Array[] = [key.subarray(0, 16), key.subarray(16)];

    let temp: Uint8Array,
      left: Uint8Array = keys[0],
      right: Uint8Array = keys[1];

    for (let i = 0; i < 4; i++) {
      for (let k = 0; k < 8; k++) {
        temp = left;
        left = this.X(this.LSX(left, KEYS_CONSTS[8 * i + k]), right);
        right = temp;
      }
      keys.push(left, right);
    }

    return keys;
  };

  private X = (a: Uint8Array, b: Uint8Array): Uint8Array =>
    a.map((item, i) => item ^ b[i]);

  private S = (indata: Uint8Array): Uint8Array =>
    indata.map((item) => TABLE_S[item]);

  private Sinv = (indata: Uint8Array): Uint8Array =>
    indata.map((item) => TABLE_S_INV[item]);

  private L = (indata: Uint8Array): Uint8Array => {
    for (let i = 0; i < 16; i++) {
      let sum: number = 0;

      for (let k = 0; k < 16; k++) {
        sum ^= TABLE_L_OPERATION[indata[k] * 256 + TABLE_L[k]];
      }

      indata.set([sum, ...indata.subarray(0, indata.length - 1)]);
    }

    return indata;
  };

  private Linv = (indata: Uint8Array): Uint8Array => {
    const temp: Uint8Array = new Uint8Array(16);
    let sum: number;

    for (let i = 0; i < 16; i++) {
      temp.set([...indata.subarray(1), indata[0]]);
      sum = 0;
      for (let k = 0; k < 16; k++) {
        sum ^= TABLE_L_OPERATION[temp[k] * 256 + TABLE_L[k]];
      }
      indata.set([...temp.subarray(0, temp.length - 1), sum]);
    }

    return indata;
  };

  private LSX = (pt: Uint8Array, key: Uint8Array): Uint8Array =>
    this.L(this.S(this.X(pt, key)));

  private SLX = (pt: Uint8Array, key: Uint8Array): Uint8Array =>
    this.Sinv(this.Linv(this.X(pt, key)));

  public encrypt = (pt: Uint8Array): Uint8Array => {
    for (let i = 0; i < 9; i++) {
      pt = this.LSX(pt, this.keys[i]);
    }

    return this.X(pt, this.keys[9]);
  };

  public decrypt = (pt: Uint8Array): Uint8Array => {
    for (let i = 0; i < 9; i++) {
      pt = this.SLX(pt, this.keys[9 - i]);
    }
    return this.X(pt, this.keys[0]);
  };

  /**
   * alphabetString => hexString
   */
  public enc = (pt: string): string => {
    let result: string = "";

    const plainTextBlocks: Uint8Array[] = this.splitInto16ByteBlocks(
      stringAlphabetToUint8Array(pt)
    );

    for (const plainTextBlock of plainTextBlocks) {
      const cipherText = this.encrypt(plainTextBlock);
      result += uint8ArrayToStringHex(cipherText);
    }

    return result;
  };

  /**
   * hexString => alphabetString
   */
  public dec = (ct: string): string => {
    let result: string = "";

    const cipherTextBlocks: Uint8Array[] = this.splitInto16ByteBlocks(
      stringHexToUint8Array(ct)
    );

    for (const cipherTextBlock of cipherTextBlocks) {
      const cipherText = this.decrypt(cipherTextBlock).filter(
        (item) => item !== 255
      );
      result += uint8ArrayToStringAlphabet(cipherText);
    }

    return result;
  };
}
