import { Dispatch, SetStateAction } from 'react';
import { Socket } from 'socket.io-client';

import { BattleRoyalUpgradeDto } from '@/src/app/providers/BattleRoyalProvider/dto/bonus.dto';
import { GameResultSummary } from '@/src/widgets/BattleRoyal/types/battle-royal-game-over.types';
import { BattleRoyalGameData } from '@/src/widgets/BattleRoyal/types/battle-royal-initial.types';

export type BattleRoyalContextType = {
  socket: Socket | null;
  isConnected: boolean;
  gameState: BattleRoyalGameData | undefined;
  selectedEvent: BattleRoyalUpgradeDto | null;
  openEventDialog: boolean;
  gameOverResult: GameResultSummary | undefined;
  setGameState: Dispatch<SetStateAction<BattleRoyalGameData | undefined>>;
  setSelectedEvent: Dispatch<SetStateAction<BattleRoyalUpgradeDto | null>>;
  setOpenEventDialog: Dispatch<SetStateAction<boolean>>;
  handleMove: (x: number, y: number) => void;
  handleSetBonus: (slotIndex: number, upgrade: BattleRoyalUpgradeDto) => void;
  // handleGetMatchResult: () => void;
  setGameOverResult: Dispatch<SetStateAction<GameResultSummary | undefined>>;
};
