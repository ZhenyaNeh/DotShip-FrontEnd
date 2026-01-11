import { useQuery } from '@tanstack/react-query';

import { battleRoyalService } from '../../services';

export function useGameOverData(roomId?: string) {
  const {
    data: gameOverData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['game over battle royal data', roomId],
    queryFn: () => battleRoyalService.getGameOverData(roomId),
    enabled: !!roomId,
    select: data => data.data,
  });

  return { gameOverData, isLoading, error };
}
