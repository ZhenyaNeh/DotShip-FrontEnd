'use client';

import { useCallback, useMemo, useRef, useState } from 'react';

import { CropArea, Point } from '../../lib/types';

export const useImageCrop = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CropArea | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const resetImage = useCallback(() => {
    setImageSrc(null);
    setFileName(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels(null);
    setIsLoading(false);
  }, []);

  const readFile = useCallback((file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error('Не удалось прочитать файл'));
      reader.readAsDataURL(file);
    });
  }, []);

  const onFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      if (!file.type.startsWith('image/')) {
        console.error('Выбранный файл не является изображением');
        return;
      }

      // if (file.size > 5 * 1024 * 1024) {
      //   console.error('Размер файла превышает 5MB');
      //   return;
      // }

      setFileName(file.name);
      setIsLoading(true);

      try {
        const img = await readFile(file);
        setImageSrc(img);

        setCrop({ x: 0, y: 0 });
        setZoom(1);
        setCroppedAreaPixels(null);
      } catch (error) {
        console.error('Ошибка при загрузке изображения:', error);
        resetImage();
      } finally {
        setIsLoading(false);
      }

      if (inputRef.current) {
        inputRef.current.value = '';
      }
    },
    [readFile, resetImage]
  );

  const onCropComplete = useCallback((_: CropArea, croppedPixels: CropArea) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const createImage = useCallback((url: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error('Не удалось загрузить изображение'));
      img.src = url;
    });
  }, []);

  const optimizeImage = useCallback((canvas: HTMLCanvasElement): string => {
    const maxSize = 512;
    const quality = 0.85;

    const optimizedCanvas = document.createElement('canvas');
    const ctx = optimizedCanvas.getContext('2d');

    if (!ctx) {
      const dataUrl = canvas.toDataURL('image/png', 1.0);
      if (!dataUrl || dataUrl.length < 100) {
        throw new Error('Canvas is empty');
      }
      return dataUrl;
    }

    optimizedCanvas.width = maxSize;
    optimizedCanvas.height = maxSize;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(canvas, 0, 0, maxSize, maxSize);

    const dataUrl = optimizedCanvas.toDataURL('image/png', quality);

    const base64Data = dataUrl.split(',')[1];
    if (!base64Data || base64Data.length < 1000) {
      console.warn(
        'Generated base64 data seems too small:',
        base64Data?.length
      );
    }

    return dataUrl;
  }, []);

  const getCroppedImgRound = useCallback(async (): Promise<string | null> => {
    if (!imageSrc || !croppedAreaPixels) {
      console.error('Нет изображения или области для обрезки');
      return null;
    }

    try {
      setIsLoading(true);
      const image = await createImage(imageSrc);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        throw new Error('Не удалось получить контекст canvas');
      }

      const size = Math.max(croppedAreaPixels.width, croppedAreaPixels.height);
      canvas.width = size;
      canvas.height = size;

      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      ctx.drawImage(
        image,
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
        0,
        0,
        size,
        size
      );

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const isEmpty = imageData.data.every(channel => channel === 0);

      if (isEmpty) {
        throw new Error('Canvas is empty after drawing');
      }

      return optimizeImage(canvas);
    } catch (error) {
      console.error('Ошибка при обрезке изображения:', error);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [imageSrc, croppedAreaPixels, createImage, optimizeImage]);

  const getCroppedImgRect = useCallback(async (): Promise<string | null> => {
    if (!imageSrc || !croppedAreaPixels) {
      console.error('Нет изображения или области для обрезки');
      return null;
    }

    try {
      setIsLoading(true);
      const image = await createImage(imageSrc);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        throw new Error('Не удалось получить контекст canvas');
      }

      const width = croppedAreaPixels.width;
      const height = croppedAreaPixels.height;

      canvas.width = width;
      canvas.height = height;

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      ctx.drawImage(
        image,
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
        0,
        0,
        width,
        height
      );

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const isEmpty = imageData.data.every(channel => channel === 0);

      if (isEmpty) {
        throw new Error('Canvas is empty after drawing');
      }

      return optimizeImage(canvas);
    } catch (error) {
      console.error('Ошибка при обрезке изображения:', error);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [imageSrc, croppedAreaPixels, createImage, optimizeImage]);

  const state = useMemo(
    () => ({
      fileName,
      imageSrc,
      isLoading,
      crop,
      zoom,
      croppedAreaPixels,
      hasImage: !!imageSrc,
      canCrop: !!imageSrc && !!croppedAreaPixels,
    }),
    [fileName, imageSrc, isLoading, crop, zoom, croppedAreaPixels]
  );

  return {
    ...state,
    inputRef,
    setCrop,
    setZoom,
    getCroppedImgRound,
    getCroppedImgRect,
    resetImage,
    onFileChange,
    onCropComplete,
  };
};

export type UseImageCropReturn = ReturnType<typeof useImageCrop>;
