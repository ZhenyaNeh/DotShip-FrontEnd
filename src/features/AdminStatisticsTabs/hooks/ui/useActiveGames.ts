import { useQuery } from '@tanstack/react-query';

import { adminStatisticsService } from '../../services';

export function useActiveGames() {
  const { data: activeGames, isLoading: isLoadingActiveGames } = useQuery({
    queryKey: ['get active games'],
    queryFn: () => adminStatisticsService.getActiveGames(),
    select: data => data.data,
  });

  return {
    activeGames,
    isLoadingActiveGames,
  };
}
