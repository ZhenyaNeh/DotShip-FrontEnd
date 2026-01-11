import { useQuery } from '@tanstack/react-query';

import { adminStatisticsService } from '../../services';

export function useAllNonAdminUsers() {
  const { data: allNonAdminUsers, isLoading: isLoadingAllNonAdminUsers } =
    useQuery({
      queryKey: ['get all non admin users'],
      queryFn: () => adminStatisticsService.getAllNonAdminUsers(),
      select: data => data.data,
    });

  return {
    allNonAdminUsers,
    isLoadingAllNonAdminUsers,
  };
}
