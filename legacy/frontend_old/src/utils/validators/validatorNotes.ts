import { vocab } from "../encoding";

export const symbolsNoteLink = "abcdefghijklmnopqrstuvwxyz-";
export const symbolsNoteName =
  vocab.landEngBig +
  vocab.landEngSmall +
  vocab.langRuBig +
  vocab.langRuSmall +
  " ";

export const validateNoteLink = (noteLink: string): boolean =>
  noteLink.split("").every((item) => symbolsNoteLink.includes(item));

export const validateNoteName = (noteName: string): boolean =>
  noteName.split("").every((item) => symbolsNoteName.includes(item));
