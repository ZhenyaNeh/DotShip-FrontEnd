import { useQuery } from '@tanstack/react-query';

import { battleRoyalService } from '../../services';

export function useBattleRoyalGameData(roomId?: string) {
  const {
    data: battleRoyalGameData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['initial battle royal state', roomId],
    queryFn: () => battleRoyalService.getBattleRoyalGameData(roomId),
    enabled: !!roomId,
    select: data => data.data,
  });

  return { battleRoyalGameData, isLoading, error };
}
