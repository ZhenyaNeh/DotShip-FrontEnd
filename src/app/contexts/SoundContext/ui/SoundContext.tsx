'use client';

import { createContext } from 'react';

import { SoundContextType } from '../types/SoundContextType';

export const SoundContext = createContext<SoundContextType | null>(null);
