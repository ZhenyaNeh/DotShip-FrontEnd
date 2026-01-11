import { useContext } from 'react';

import { BattleRoyalContext } from '@/src/app/contexts/BattleRoyalContext';

export const useBattleRoyal = () => {
  const context = useContext(BattleRoyalContext);
  if (!context) {
    throw new Error('useBattleRoyal must be used within a BattleRoyalProvider');
  }
  return context;
};
