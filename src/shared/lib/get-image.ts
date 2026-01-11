export const getImage = (imgSrc: string | undefined) => {
  if (!imgSrc) {
    return '';
  }

  if (imgSrc.includes('https://webdav.yandex.ru/avatars/')) {
    const img = imgSrc.replace('https://webdav.yandex.ru/avatars/', '');
    return `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://dot-ship.com:5000'}/users/avatar/${img}?t=${1}`;
  }
  if (imgSrc.includes('https://webdav.yandex.ru/game/')) {
    const img = imgSrc.replace('https://webdav.yandex.ru/game/', '');
    return `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://dot-ship.com:5000'}/game/photo/${img}?t=${1}`;
  }

  return imgSrc;
};
