import { BattleRoyalUpgradeType } from '@/src/widgets/BattleRoyal/types/battle-royal-initial.types';

export interface BattleRoyalUpgradeDto {
  id: string;
  roomId: string;
  x: number;
  y: number;
  createdAt: Date;
  updatedAt: Date;
  upgradeType: BattleRoyalUpgradeType;
  isCollected: boolean;
  collectedBy: string | null;
  collectedAt: Date | null;
}
