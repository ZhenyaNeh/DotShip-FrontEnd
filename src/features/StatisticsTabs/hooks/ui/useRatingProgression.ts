import { useQuery } from '@tanstack/react-query';

import { statisticsService } from '../../services';

export function useRatingProgression(userId: string) {
  const { data: ratingProgression, isLoading: isLoadingRatingProgression } =
    useQuery({
      queryKey: ['rating progression', userId],
      queryFn: () => statisticsService.getRatingProgression(userId),
      enabled: !!userId,
      select: data => data.data,
    });

  return {
    ratingProgression,
    isLoadingRatingProgression,
  };
}
