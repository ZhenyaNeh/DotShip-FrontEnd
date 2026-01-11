import { GameResultSummary } from '../../types/battle-royal-game-over.types';
import { BattleRoyalGameData } from '../../types/battle-royal-initial.types';

import { api } from '@/src/shared/api';

class BattleRoyalService {
  public async getBattleRoyalGameData(roomId?: string) {
    const response = await api.get<BattleRoyalGameData>(
      `/battle-royal-room/initial-state/${roomId}`
    );

    return response;
  }
  public async getGameOverData(roomId?: string) {
    const response = await api.get<GameResultSummary | null>(
      `/battle-royal-room/game-over/${roomId}`
    );

    return response;
  }
}

export const battleRoyalService = new BattleRoyalService();
