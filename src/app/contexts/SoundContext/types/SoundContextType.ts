import { SoundType } from '@/src/shared/lib/types';

export type SoundContextType = {
  playSound: (type: SoundType, volume?: number) => void;
  stopSound: (type: SoundType) => void;
  toggleMute: () => void;
  setMasterVolume: (val: number) => void;
  isMuted: boolean;
  masterVolume: number;
  playBackgroundMusic: () => void;
  stopBackgroundMusic: () => void;
  isBackgroundPlaying: boolean;
};
