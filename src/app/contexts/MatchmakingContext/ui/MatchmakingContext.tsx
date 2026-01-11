'use client';

import { createContext } from 'react';

import { MatchmakingContextType } from '../types/MatchmakingContextType';

export const MatchmakingContext = createContext<MatchmakingContextType | null>(
  null
);
