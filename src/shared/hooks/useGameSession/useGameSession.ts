import { useContext } from 'react';

import { GameSessionContext } from '@/src/app/contexts/GameSessionContext';

export const useGameSession = () => {
  const context = useContext(GameSessionContext);
  if (!context) {
    throw new Error('useGameSession must be used within a GameSessionProvider');
  }
  return context;
};
