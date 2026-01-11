import { useQuery } from '@tanstack/react-query';

import { statisticsService } from '../../services';

export function useUserStats(userId: string) {
  const { data: userStats, isLoading: isLoadingUserStats } = useQuery({
    queryKey: ['user stats', userId],
    queryFn: () => statisticsService.getUserStats(userId),
    enabled: !!userId,
    select: data => data.data,
  });

  return {
    userStats,
    isLoadingUserStats,
  };
}
