// utils/convertBase64ToFile.ts
/**
 * Конвертирует base64 строку в Blob или File
 * @param base64Data - строка base64 (data:image/...;base64,...)
 * @param fileName - имя файла (опционально)
 * @returns File или Blob
 */
export function base64ToFile(base64Data: string, fileName?: string): File {
  // Извлекаем MIME тип из base64 строки
  const matches = base64Data.match(/^data:(image\/\w+);base64,/);
  if (!matches || matches.length < 2) {
    throw new Error('Invalid base64 image data');
  }

  const mimeType = matches[1];
  const base64WithoutPrefix = base64Data.replace(
    /^data:image\/\w+;base64,/,
    ''
  );

  // Декодируем base64
  const byteCharacters = atob(base64WithoutPrefix);
  const byteNumbers = new Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: mimeType });

  // Если указано имя файла, возвращаем File, иначе Blob
  if (fileName) {
    const extension = mimeType.split('/')[1];
    const finalFileName = fileName.endsWith(`.${extension}`)
      ? fileName
      : `${fileName}.${extension}`;

    return new File([blob], finalFileName, { type: mimeType });
  }

  // Возвращаем File с дефолтным именем
  return new File([blob], 'avatar.png', { type: mimeType });
}

/**
 * Упрощенная версия для получения Blob
 */
export function base64ToBlob(base64Data: string): Blob {
  const matches = base64Data.match(/^data:(image\/\w+);base64,/);
  if (!matches || matches.length < 2) {
    throw new Error('Invalid base64 image data');
  }

  const mimeType = matches[1];
  const base64WithoutPrefix = base64Data.replace(
    /^data:image\/\w+;base64,/,
    ''
  );
  const byteCharacters = atob(base64WithoutPrefix);
  const byteNumbers = new Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: mimeType });
}
