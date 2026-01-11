'use client';

import { createContext } from 'react';

import { BattleRoyalContextType } from '../types/BattleRoyalContextType';

export const BattleRoyalContext = createContext<BattleRoyalContextType | null>(
  null
);
