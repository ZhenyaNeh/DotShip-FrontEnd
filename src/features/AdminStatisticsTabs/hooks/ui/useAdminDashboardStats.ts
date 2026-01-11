import { useQuery } from '@tanstack/react-query';

import { adminStatisticsService } from '../../services';

export function useAdminDashboardStats() {
  const { data: adminDashboardStats, isLoading: isLoadingAdminDashboardStats } =
    useQuery({
      queryKey: ['get admin dashboard stats'],
      queryFn: () => adminStatisticsService.getAdminDashboardStats(),
      select: data => data.data,
    });

  return {
    adminDashboardStats,
    isLoadingAdminDashboardStats,
  };
}
