'use client';

import { Music, Settings, Volume2, VolumeOff } from 'lucide-react';
import { FC } from 'react';

import { useSound } from '@/src/shared/hooks';
import { Button } from '@/src/shared/ui/Button/Button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/src/shared/ui/Dialog/Dialog';
import { Label } from '@/src/shared/ui/Label/Label';
import { Slider } from '@/src/shared/ui/Slider/Slider';
import { Switch } from '@/src/shared/ui/Switch/Switch';

export const SoundControl: FC = () => {
  const {
    isMuted,
    toggleMute,
    masterVolume,
    setMasterVolume,
    playBackgroundMusic,
    stopBackgroundMusic,
    isBackgroundPlaying,
  } = useSound();

  const handleVolumeChange = (value: number[]) => {
    setMasterVolume(value[0]);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline'>
          <Settings className='h-4 w-4' />
          <span>Sound settings</span>
        </Button>
      </DialogTrigger>
      <DialogContent className='space-y-4 sm:max-w-[425px]'>
        <DialogHeader className='pb-3'>
          <DialogTitle className='flex items-center gap-2 text-lg'>
            <Volume2 className='h-5 w-5' />
            Sound settings
          </DialogTitle>
        </DialogHeader>
        <div className='space-y-2'>
          <div className='flex items-center justify-between'>
            <Label htmlFor='sound-toggle'>Game sound</Label>
            <Switch
              id='sound-toggle'
              checked={!isMuted}
              onCheckedChange={toggleMute}
            />
          </div>

          <div className='space-y-1'>
            <div className='flex items-center justify-between'>
              <Label htmlFor='volume-slider'>VolumeVolume</Label>
              <span className='text-muted-foreground text-sm'>
                {Math.round(masterVolume * 100)}%
              </span>
            </div>
            <div className='flex items-center gap-2'>
              <VolumeOff className='text-muted-foreground h-4 w-4' />
              <Slider
                id='volume-slider'
                value={[masterVolume]}
                min={0}
                max={1}
                step={0.01}
                onValueChange={handleVolumeChange}
                disabled={isMuted}
              />
              <Volume2 className='text-muted-foreground h-4 w-4' />
            </div>
          </div>
        </div>

        <div className='space-y-2 border-t pt-2'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <Music className='h-4 w-4' />
              <Label htmlFor='music-toggle'>Background music</Label>
            </div>
            <Switch
              id='music-toggle'
              checked={isBackgroundPlaying}
              onCheckedChange={() => {
                if (isBackgroundPlaying) {
                  stopBackgroundMusic();
                } else {
                  playBackgroundMusic();
                }
              }}
            />
          </div>

          <div className='text-muted-foreground flex items-center justify-between text-sm'>
            <span>Status</span>
            <span>{isBackgroundPlaying ? 'Playing' : 'Stopped'}</span>
          </div>
        </div>

        <div className='flex gap-2 pt-2'>
          <Button
            variant='outline'
            size='sm'
            className='flex-1'
            onClick={() => setMasterVolume(0.25)}
            disabled={isMuted}
          >
            25%
          </Button>
          <Button
            variant='outline'
            size='sm'
            className='flex-1'
            onClick={() => setMasterVolume(0.5)}
            disabled={isMuted}
          >
            50%
          </Button>
          <Button
            variant='outline'
            size='sm'
            className='flex-1'
            onClick={() => setMasterVolume(0.75)}
            disabled={isMuted}
          >
            75%
          </Button>
          <Button
            variant='outline'
            size='sm'
            className='flex-1'
            onClick={() => setMasterVolume(1)}
            disabled={isMuted}
          >
            100%
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
