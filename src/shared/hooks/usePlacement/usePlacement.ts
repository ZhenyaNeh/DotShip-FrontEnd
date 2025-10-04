import { useContext } from 'react';

import { PlacementContext } from '@/src/app/contexts/PlacementContext';

export const usePlacement = () => {
  const context = useContext(PlacementContext);
  if (!context) {
    throw new Error('usePlacement must be used within a PlacementProvider');
  }
  return context;
};
