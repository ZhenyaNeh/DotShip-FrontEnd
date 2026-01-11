import { InitialGameState } from '../../types/initial-game-state.types';

import { api } from '@/src/shared/api';

class GameSessionService {
  public async getInitialGameState(roomId?: string) {
    const response = await api.get<InitialGameState>(
      `/room/initial-state/${roomId}`
    );

    return response;
  }
}

export const gameSessionService = new GameSessionService();
