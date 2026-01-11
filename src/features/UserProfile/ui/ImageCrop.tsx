import { Camera } from 'lucide-react';
import React, { FC, HTMLAttributes, useEffect, useState } from 'react';
import Cropper from 'react-easy-crop';

import { useUpdateAvatarMutation } from '../hooks';
import { base64ToFile } from '../utils';

import { ProfileAvatar } from './ProfileAvatar';
import { useImageCrop } from '@/src/shared/hooks';
import { cn } from '@/src/shared/lib/clsx';
import { Button } from '@/src/shared/ui/Button/Button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/src/shared/ui/Dialog/Dialog';
import { Slider } from '@/src/shared/ui/Slider/Slider';

interface Props extends HTMLAttributes<HTMLDivElement> {
  imgSrc: string | undefined;
  displayName: string | undefined;
}

export const ImageCrop: FC<Props> = props => {
  const { imgSrc, displayName, className, ...otherProps } = props;
  const [open, setOpen] = useState<boolean>(false);

  const { updateAvatar } = useUpdateAvatarMutation();

  const {
    fileName,
    imageSrc,
    inputRef,
    crop,
    zoom,
    croppedAreaPixels,
    setCrop,
    setZoom,
    getCroppedImgRound,
    resetImage,
    onFileChange,
    onCropComplete,
  } = useImageCrop();

  useEffect(() => {
    if (!open) {
      const timer = setTimeout(() => {
        resetImage();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [open, resetImage]);

  if (!displayName) {
    return null;
  }

  const handleSave = async () => {
    try {
      const croppedImage = await getCroppedImgRound();
      if (!croppedImage) {
        return;
      }
      const file = base64ToFile(croppedImage);

      const formData = new FormData();
      formData.append('avatar', file);

      if (file.size === 0) {
        throw new Error('File size is zero');
      }

      updateAvatar(formData);

      setOpen(false);
    } catch (error) {
      console.error('Error saving image:', error);
    }
  };

  const handleFileSelect = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFileChange(e);
    if (e.target.files?.[0]) {
      setOpen(true);
    }
  };

  return (
    <div className={cn('space-y-4', className)} {...otherProps}>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant='ghost'
            size='lg'
            className='hover:text-muted relative size-30 rounded-xl p-0 hover:bg-transparent'
            aria-label='Изменить фото профиля'
          >
            <div className='group relative'>
              <ProfileAvatar imgSrc={imgSrc} displayName={displayName} />
              <div className='absolute inset-0 flex items-center justify-center rounded-full bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
                <Camera className='size-6 text-white' />
              </div>
            </div>
          </Button>
        </DialogTrigger>

        <DialogContent className='w-[430px] max-w-[90vw] space-y-4 rounded-2xl p-6'>
          <DialogHeader>
            <DialogTitle className='text-xl font-semibold'>
              Изменение фото профиля
            </DialogTitle>
          </DialogHeader>

          <div className='flex flex-col gap-4'>
            <div className='flex items-center justify-between gap-2'>
              <Button
                variant='outline'
                className='flex-1 rounded-xl'
                onClick={handleFileSelect}
              >
                {fileName
                  ? `Файл: ${fileName.substring(0, 20)}...`
                  : 'Выбрать файл'}
              </Button>

              {imageSrc && (
                <Button
                  variant='outline'
                  className='rounded-xl'
                  onClick={resetImage}
                >
                  Сбросить
                </Button>
              )}
            </div>

            <input
              type='file'
              accept='image/*'
              onChange={handleFileChange}
              ref={inputRef}
              className='hidden'
              aria-label='Выберите изображение'
            />

            {imageSrc ? (
              <>
                <div className='bg-muted relative h-[300px] w-full overflow-hidden rounded-xl'>
                  <Cropper
                    image={imageSrc}
                    crop={crop}
                    zoom={zoom}
                    aspect={1}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={onCropComplete}
                    cropShape='round'
                    showGrid={false}
                    objectFit='horizontal-cover'
                  />
                </div>
                <div className='space-y-2 pt-2'>
                  <div className='flex justify-between'>
                    <label className='text-sm font-medium'>Масштаб</label>
                    <span className='text-muted-foreground text-sm'>
                      {zoom.toFixed(2)}x
                    </span>
                  </div>
                  <Slider
                    value={[zoom]}
                    min={1}
                    max={3}
                    step={0.01}
                    onValueChange={(v: number[]) => setZoom(v[0])}
                    className='mt-2'
                  />
                </div>

                <div className='flex gap-2 pt-2'>
                  <DialogClose asChild>
                    <Button
                      variant='outline'
                      className='flex-1 rounded-xl'
                      onClick={resetImage}
                    >
                      Отмена
                    </Button>
                  </DialogClose>
                  <Button
                    className='flex-1 rounded-xl'
                    size='lg'
                    onClick={handleSave}
                    disabled={!croppedAreaPixels}
                  >
                    Сохранить
                  </Button>
                </div>
              </>
            ) : (
              <div className='flex flex-col items-center justify-center py-12 text-center'>
                <Camera className='text-muted-foreground mb-4 size-12' />
                <p className='text-muted-foreground'>
                  Выберите изображение для начала редактирования
                </p>
                <p className='text-muted-foreground mt-2 text-sm'>
                  Поддерживаются форматы: JPG, PNG, WebP
                </p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
