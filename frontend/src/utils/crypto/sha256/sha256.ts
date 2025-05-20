export const sha256 = async (message: string) => {
  // Преобразуем сообщение в Uint8Array
  const encoder = new TextEncoder();
  const data = encoder.encode(message);

  // Вычисляем хеш
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);

  // Конвертируем ArrayBuffer в hex-строку
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return hashHex;
};
