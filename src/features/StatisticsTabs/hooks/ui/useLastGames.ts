import { useQuery } from '@tanstack/react-query';

import { statisticsService } from '../../services';

export function useLastGames(userId: string) {
  const { data: lastGames, isLoading: isLoadingLastGames } = useQuery({
    queryKey: ['last games', userId],
    queryFn: () => statisticsService.getLastGames(userId),
    enabled: !!userId,
    select: data => data.data,
  });

  return {
    lastGames,
    isLoadingLastGames,
  };
}
