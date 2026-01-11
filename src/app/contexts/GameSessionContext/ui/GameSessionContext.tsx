'use client';

import { createContext } from 'react';

import { GameSessionContextType } from '../types/GameSessionContextType';

export const GameSessionContext = createContext<GameSessionContextType | null>(
  null
);
