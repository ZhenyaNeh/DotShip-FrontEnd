import { ActiveGame, AdminDashboardStats, AllNonAdminUsers } from '../../types';

import { api } from '@/src/shared/api';
import { GameMode } from '@/src/shared/lib/types';

class StatisticsService {
  public async getAllNonAdminUsers() {
    const response = await api.get<AllNonAdminUsers[]>(
      'statistics/non-admin-users'
    );

    return response;
  }

  public async getActiveGames() {
    const response = await api.get<ActiveGame[]>('statistics/active-games');

    return response;
  }

  public async getAdminDashboardStats() {
    const response = await api.get<AdminDashboardStats>(
      'statistics/admin-dashboard-stats'
    );

    return response;
  }

  public async deleteRoom(roomId: string, type: GameMode) {
    const response = await api.delete<AdminDashboardStats>(
      'statistics/delete-room',
      { params: { roomId, type } }
    );

    return response;
  }
}

export const adminStatisticsService = new StatisticsService();
