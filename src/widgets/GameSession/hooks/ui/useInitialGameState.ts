import { useQuery } from '@tanstack/react-query';

import { gameSessionService } from '../../services';

export function useInitialGameState(roomId?: string) {
  const {
    data: initialGameState,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['initial game state', roomId],
    queryFn: () => gameSessionService.getInitialGameState(roomId),
    enabled: !!roomId,
    select: data => data.data,
  });

  return { initialGameState, isLoading, error };
}
