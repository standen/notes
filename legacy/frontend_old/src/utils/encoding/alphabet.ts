enum EEncodingType {
  numbers,
  landEngSmall,
  landEngBig,
  langRuSmall,
  langRuBig,
  symbols,
  sugar,
}

export const vocab: Record<keyof typeof EEncodingType, string> = {
  numbers: "0123456789",
  landEngSmall: "abcdefghijklmnopqrstuvwxyz",
  landEngBig: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  langRuSmall: "абвгдеёжзийклмнопрстуфхцчшщъыьэюя",
  langRuBig: "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ",
  symbols: "~`'\"!@#№$;:,^%&?*()-+=|\\<>[]{}._ ",
  sugar:
    "ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿĀāĂăĄąĆćĈĉĊċČčĎďĐđĒēĔĕĖėĘęĚěĜĝĞ",
};

export const ALPHABET = Object.values(vocab).join("");


