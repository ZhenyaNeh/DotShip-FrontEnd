'use client';

import { Gift, Ship, Target } from 'lucide-react';
import React, { FC } from 'react';

import { BattleRoyalUpgradeType } from '../types/battle-royal-initial.types';
import { getUpgradeIcon } from '../utils/ get-upgrade.utils';

import { cn } from '@/src/shared/lib/clsx';

interface CellProps {
  isVisible: boolean;
  showAllInfoOnBoard: boolean;
  isMyPlayerAlive: boolean;
  hasMyPlayer: boolean;
  hasPlayer: boolean;
  playerId?: string;
  hasUpgrade: boolean;
  upgradeType?: BattleRoyalUpgradeType;
  isSafeZone: boolean;
  isCurrentTarget: boolean;
  isShrinking: boolean;
  onClick: () => void;
}

export const BattleRoyalCell: FC<CellProps> = ({
  isVisible,
  showAllInfoOnBoard,
  isMyPlayerAlive,
  hasMyPlayer,
  hasPlayer,
  hasUpgrade,
  upgradeType,
  isSafeZone,
  isCurrentTarget,
  isShrinking,
  onClick,
}) => {
  const UpgradeIcon = upgradeType ? getUpgradeIcon(upgradeType) : Gift;

  const shouldShowInfo = showAllInfoOnBoard || isVisible;

  const showMyPlayer = isMyPlayerAlive
    ? hasMyPlayer
    : hasMyPlayer && !showAllInfoOnBoard;

  const showOtherPlayer = shouldShowInfo && hasPlayer && !hasMyPlayer;
  const showUpgrade = hasUpgrade && upgradeType && shouldShowInfo;
  const showHiddenUpgrade = hasUpgrade && upgradeType && !shouldShowInfo;

  return (
    <div
      className={cn(
        'relative flex h-[40px] w-[40px] items-center justify-center rounded-lg',
        {
          'bg-neutral-300 dark:bg-gray-700': shouldShowInfo,
          'cursor-pointer': shouldShowInfo && !hasMyPlayer,
          'opacity-50 dark:opacity-50': !shouldShowInfo,
          'animate-pulse bg-red-400': isShrinking && !isSafeZone,
        }
      )}
      onClick={() => onClick()}
    >
      {!isSafeZone && (
        <div className='pointer-events-none absolute inset-0 rounded-lg bg-red-400/50' />
      )}

      {showMyPlayer && (
        <div className='absolute z-1 flex h-full w-full items-center justify-center'>
          <Ship className='h-3/4 w-3/4' />
          {isCurrentTarget && (
            <div className='absolute -top-1 -right-1'>
              <Target className='h-3 w-3 text-yellow-400' />
            </div>
          )}
        </div>
      )}

      {showOtherPlayer && (
        <div className='flex h-full w-full items-center justify-center'>
          <Ship className='h-3/4 w-3/4 text-red-500' />
        </div>
      )}

      {showHiddenUpgrade && (
        <div className='absolute z-1 flex h-full w-full items-center justify-center'>
          <Gift className='h-3/4 w-3/4 text-amber-800 dark:text-amber-400' />
        </div>
      )}

      {showUpgrade && (
        <div className='flex h-full w-full items-center justify-center'>
          <UpgradeIcon className='text-muted h-3/4 w-3/4' />
        </div>
      )}

      {isSafeZone && (
        <div className='pointer-events-none absolute inset-0 rounded-lg border-2' />
      )}
    </div>
  );
};
