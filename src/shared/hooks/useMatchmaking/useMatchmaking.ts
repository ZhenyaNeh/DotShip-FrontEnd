import { useContext } from 'react';

import { MatchmakingContext } from '@/src/app/contexts/MatchmakingContext';

export const useMatchmaking = () => {
  const context = useContext(MatchmakingContext);
  if (!context) {
    throw new Error('useMatchmaking must be used within a MatchmakingProvider');
  }
  return context;
};
