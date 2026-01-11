import { Dispatch, SetStateAction } from 'react';
import { Socket } from 'socket.io-client';

import { GameEvents } from '@/src/shared/lib/types';
import { InitialGameState } from '@/src/widgets/GameSession/types/initial-game-state.types';

export type GameSessionContextType = {
  socket: Socket | null;
  isConnected: boolean;
  gameState: InitialGameState | undefined;
  selectedEvent: GameEvents | null;
  openEventDialog: boolean;
  timeLeft: number;
  isTimerActive: boolean;
  setGameState: Dispatch<SetStateAction<InitialGameState | undefined>>;
  setSelectedEvent: Dispatch<SetStateAction<GameEvents | null>>;
  setOpenEventDialog: Dispatch<SetStateAction<boolean>>;
  handleFire: (x: number, y: number) => void;
  handleFireTimeout: () => void;
};
