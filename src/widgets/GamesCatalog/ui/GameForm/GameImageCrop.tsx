'use client';

import { Camera } from 'lucide-react';
import React, { FC, HTMLAttributes, useEffect, useState } from 'react';
import Cropper from 'react-easy-crop';

import { useUpdateGamePhotoMutation } from '../../hooks';

import { base64ToFile } from '@/src/features/UserProfile/utils';
import { useImageCrop } from '@/src/shared/hooks';
import { cn } from '@/src/shared/lib/clsx';
import { IGame } from '@/src/shared/lib/types';
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

interface GameImageCropProps extends HTMLAttributes<HTMLDivElement> {
  game: IGame;
}

export const GameImageCrop: FC<GameImageCropProps> = props => {
  const { game, className, ...otherProps } = props;
  const [open, setOpen] = useState<boolean>(false);

  const { updateGamePhoto } = useUpdateGamePhotoMutation();

  const {
    fileName,
    imageSrc,
    inputRef,
    crop,
    zoom,
    croppedAreaPixels,
    setCrop,
    setZoom,
    getCroppedImgRect,
    resetImage,
    onFileChange,
    onCropComplete: onCropCompleteInternal,
  } = useImageCrop();

  useEffect(() => {
    if (!open) {
      const timer = setTimeout(() => {
        resetImage();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [open, resetImage]);

  if (!game) {
    return null;
  }

  const handleSave = async () => {
    try {
      const croppedImage = await getCroppedImgRect();
      if (!croppedImage) {
        return;
      }

      const file = base64ToFile(croppedImage);

      const formData = new FormData();
      formData.append('photo', file);

      // if (onCropComplete) {
      //   onCropComplete(croppedImage);
      // }

      updateGamePhoto({ gameId: game.id, body: formData });

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

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  return (
    <div className={cn('space-y-2', className)} {...otherProps}>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          <Button variant='outline'>Upload & Crop</Button>
        </DialogTrigger>

        <DialogContent className='w-[430px] max-w-[90vw] space-y-4 rounded-2xl p-6'>
          <DialogHeader>
            <DialogTitle className='text-xl font-semibold'>
              Add game photo
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
                  ? `File: ${fileName.substring(0, 20)}...`
                  : 'Select file'}
              </Button>

              {imageSrc && (
                <Button
                  variant='outline'
                  className='rounded-xl'
                  onClick={resetImage}
                >
                  Reset
                </Button>
              )}
            </div>

            <input
              type='file'
              accept='image/*'
              onChange={handleFileChange}
              ref={inputRef}
              className='hidden'
              aria-label='Select an image'
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
                    onCropComplete={onCropCompleteInternal}
                    cropShape='rect'
                    cropSize={{ width: 360, height: 240 }}
                    showGrid={false}
                    objectFit='horizontal-cover'
                  />
                </div>
                <div className='space-y-2 pt-2'>
                  <div className='flex justify-between'>
                    <label className='text-sm font-medium'>Scale</label>
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
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button
                    className='flex-1 rounded-xl'
                    size='lg'
                    onClick={handleSave}
                    disabled={!croppedAreaPixels}
                  >
                    Save
                  </Button>
                </div>
              </>
            ) : (
              <div className='flex flex-col items-center justify-center py-12 text-center'>
                <Camera className='text-muted-foreground mb-4 size-12' />
                <p className='text-muted-foreground'>
                  Select an image to start editing
                </p>
                <p className='text-muted-foreground mt-2 text-sm'>
                  Supported formats: JPG, PNG, WebP
                </p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
