'use client';

import { createContext } from 'react';
import { PlacementContextType } from '../types/PlacementContextType';

export const PlacementContext = createContext<PlacementContextType | null>(
  null
);
