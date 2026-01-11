import { LastGames, RatingProgression, UserStats } from '../../types';

import { api } from '@/src/shared/api';

class StatisticsService {
  public async getUserStats(userId: string) {
    const response = await api.get<UserStats>(
      `statistics/user-stats/${userId}`
    );

    return response;
  }

  public async getRatingProgression(userId: string) {
    const response = await api.get<RatingProgression>(
      `statistics/rating-progression/${userId}`
    );

    return response;
  }

  public async getLastGames(userId: string) {
    const response = await api.get<LastGames>(
      `statistics/last-games/${userId}`
    );

    return response;
  }
}

export const statisticsService = new StatisticsService();
