import { Eye, Gift, Heart, Target, Zap } from 'lucide-react';

import { BattleRoyalUpgradeType } from '../types/battle-royal-initial.types';

export const getUpgradeIcon = (type: BattleRoyalUpgradeType) => {
  switch (type) {
    case BattleRoyalUpgradeType.EXTRA_LIFE:
      return Heart;
    case BattleRoyalUpgradeType.MOVEMENT_BOOST:
      return Zap;
    case BattleRoyalUpgradeType.ATTACK_BOOST:
      return Target;
    case BattleRoyalUpgradeType.VISION_BOOST:
      return Eye;
    default:
      return Gift;
  }
};

export const getUpgradeDisplayName = (type: BattleRoyalUpgradeType) => {
  switch (type) {
    case BattleRoyalUpgradeType.EXTRA_LIFE:
      return 'Health Boost';
    case BattleRoyalUpgradeType.MOVEMENT_BOOST:
      return 'Movement Boost';
    case BattleRoyalUpgradeType.ATTACK_BOOST:
      return 'Attack Boost';
    case BattleRoyalUpgradeType.VISION_BOOST:
      return 'Vision Boost';
    default:
      return 'Empty';
  }
};

export const getUpgradeDescription = (type: BattleRoyalUpgradeType) => {
  switch (type) {
    case BattleRoyalUpgradeType.EXTRA_LIFE:
      return '+1 to health';
    case BattleRoyalUpgradeType.MOVEMENT_BOOST:
      return '+2 to the number of moves per round';
    case BattleRoyalUpgradeType.ATTACK_BOOST:
      return '+1 to attack';
    case BattleRoyalUpgradeType.VISION_BOOST:
      return '+2 to vision radius';
    default:
      return '';
  }
};
