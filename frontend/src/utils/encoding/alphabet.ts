export const EncodingTypes = [
  "numbers",
  "langEngSmall",
  "langEngBig",
  "langRuSmall",
  "langRuBig",
  "symbols",
  "sugar",
] as const;

type TEncodingTypes = (typeof EncodingTypes)[number];

export const vocab: Record<TEncodingTypes, string> = {
  numbers: "0123456789",
  langEngSmall: "abcdefghijklmnopqrstuvwxyz",
  langEngBig: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  langRuSmall: "абвгдеёжзийклмнопрстуфхцчшщъыьэюя",
  langRuBig: "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ",
  symbols: "~`'\"!@#№$;:,^%&?*()-+=|\\<>[]{}._ ",
  sugar:
    "ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿĀāĂăĄąĆćĈĉĊċČčĎďĐđĒēĔĕĖėĘęĚěĜĝĞ",
};

export const ALPHABET = Object.values(vocab).join("");
