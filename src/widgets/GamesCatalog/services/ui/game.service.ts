import { TypeGameFormSchema } from '../../schemas';

import { api } from '@/src/shared/api';
import { IGame } from '@/src/shared/lib/types';

class GameService {
  public async getGames(isAdminUser: boolean = false) {
    if (isAdminUser) {
      const response = await api.get<IGame[]>('/game/full');
      return response;
    }
    const response = await api.get<IGame[]>('/game');

    return response;
  }

  public async createGame(gameData: TypeGameFormSchema) {
    const response = await api.post<IGame>('/game', gameData);

    return response;
  }

  public async updateGame(gameId: string, gameData: TypeGameFormSchema) {
    const response = await api.patch<IGame>(`/game/${gameId}`, gameData);

    return response;
  }

  public async updateGamePhoto(gameId: string, body: FormData) {
    const response = await api.patch<IGame>(
      `/game/photo/upload/${gameId}`,
      body,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response;
  }

  public async deleteGame(gameId: string) {
    const response = await api.delete<IGame>(`/game/${gameId}`);

    return response;
  }
}

export const gameService = new GameService();
