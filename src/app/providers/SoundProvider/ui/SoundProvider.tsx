'use client';

import {
  FC,
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { SOUND_FILES } from '../consts/sound-files';

import { SoundContext } from '@/src/app/contexts/SoundContext';
import { SoundType } from '@/src/shared/lib/types';

export const SoundProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [masterVolume, setMasterVolume] = useState(0.5);
  const [isBackgroundPlaying, setIsBackgroundPlaying] = useState(false);

  const audioRefs = useRef<Partial<Record<SoundType, HTMLAudioElement>>>({});

  useEffect(() => {
    Object.entries(SOUND_FILES).forEach(([key, src]) => {
      const audio = new Audio(src);
      audio.preload = 'auto';
      if (key === 'background') {
        audio.loop = true;
      }
      audioRefs.current[key as SoundType] = audio;
    });

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      Object.values(audioRefs.current).forEach(audio => {
        audio?.pause();
        if (audio) audio.src = '';
      });
    };
  }, []);

  useEffect(() => {
    Object.values(audioRefs.current).forEach(audio => {
      if (audio) {
        audio.muted = isMuted;
      }
    });
  }, [isMuted]);

  useEffect(() => {
    Object.entries(audioRefs.current).forEach(([key, audio]) => {
      if (audio) {
        if (key === 'background') {
          audio.volume = masterVolume * 0.6;
        } else {
          audio.volume = masterVolume;
        }
      }
    });
  }, [masterVolume]);

  const playSound = useCallback(
    (type: SoundType, volume = 1) => {
      const sound = audioRefs.current[type];
      if (sound) {
        if (type !== 'background') {
          sound.currentTime = 0;
        }
        sound.volume = masterVolume * volume;
        sound.play().catch(e => {
          console.warn(`Audio play failed for ${type}:`, e.message);
        });
      }
    },
    [masterVolume]
  );

  const stopSound = useCallback((type: SoundType) => {
    const sound = audioRefs.current[type];
    if (sound) {
      sound.pause();
      sound.currentTime = 0;
    }
  }, []);

  const playBackgroundMusic = useCallback(() => {
    const bgMusic = audioRefs.current.background;
    if (bgMusic) {
      bgMusic.volume = masterVolume * 0.6;
      bgMusic
        .play()
        .then(() => setIsBackgroundPlaying(true))
        .catch(console.error);
    }
  }, [masterVolume]);

  const stopBackgroundMusic = useCallback(() => {
    const bgMusic = audioRefs.current.background;
    if (bgMusic) {
      bgMusic.pause();
      setIsBackgroundPlaying(false);
    }
  }, []);

  const toggleMute = () => setIsMuted(prev => !prev);

  return (
    <SoundContext.Provider
      value={{
        playSound,
        stopSound,
        toggleMute,
        setMasterVolume,
        isMuted,
        masterVolume,
        playBackgroundMusic,
        stopBackgroundMusic,
        isBackgroundPlaying,
      }}
    >
      {children}
    </SoundContext.Provider>
  );
};
