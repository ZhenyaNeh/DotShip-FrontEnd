'use client';

import { motion } from 'framer-motion';
import {
  Clock,
  Eye,
  Gift,
  Heart,
  Navigation,
  Shield,
  Target,
  Trophy,
  User,
  Users,
  Zap,
} from 'lucide-react';
import React, { FC, useRef, useState } from 'react';

import {
  BattleRoyalGameData,
  BattleRoyalRoomStatus,
} from '../types/battle-royal-initial.types';
import {
  getUpgradeDisplayName,
  getUpgradeIcon,
} from '../utils/ get-upgrade.utils';

import { GameResultDialog } from './BattleRoyalGameResultDialog';
import { useSound } from '@/src/shared/hooks';
import { useBattleRoyal } from '@/src/shared/hooks/useBattleRoyal/useBattleRoyal';
import { Button } from '@/src/shared/ui/Button/Button';

interface Props {
  gameState: BattleRoyalGameData;
}

export const BattleRoyalPlayerInfo: FC<Props> = ({ gameState }) => {
  const { room, myPlayer, otherPlayers } = gameState;

  const { gameOverResult } = useBattleRoyal();
  const [open, setOpen] = useState<boolean>(false);
  const isAlreadySound = useRef<boolean>(false);
  const { playSound } = useSound();

  const alivePlayers = otherPlayers.filter(p => p.isAlive);
  const totalUpgrades = myPlayer.upgradeSlots.length;

  const handleOpen = () => {
    if (!isAlreadySound.current) {
      playSound('win', 0.8);
      isAlreadySound.current = true;
    } else {
      isAlreadySound.current = false;
    }
    setOpen(prev => !prev);
  };

  return (
    <div className='grid w-full grid-rows-2 space-y-5'>
      <div className='rounded-xl border p-4'>
        <div className='mb-4 flex items-center justify-between'>
          <h3 className='flex items-center gap-2 text-lg font-semibold'>
            <Trophy className='h-5 w-5' />
            Game status
          </h3>
        </div>

        <div className='space-y-3'>
          <div className='flex justify-between'>
            <span className='flex items-center gap-2 text-gray-400'>
              <Clock className='h-4 w-4' />
              Turn number:
            </span>
            <span className='font-bold'>#{room.turnNumber}</span>
          </div>

          <div className='flex justify-between'>
            <span className='flex items-center gap-2 text-gray-400'>
              <Clock className='h-4 w-4' />
              Next narrowing of the zone:
            </span>
            <span className='font-bold'>#{room.nextShrinkTurn}</span>
          </div>

          <div className='flex justify-between'>
            <span className='flex items-center gap-2 text-gray-400'>
              <Users className='h-4 w-4' />
              Players:
            </span>
            <span className='font-bold'>{alivePlayers.length + 1}</span>
          </div>

          <div className='flex justify-between'>
            <span className='flex items-center gap-2 text-gray-400'>
              <Shield className='h-4 w-4' />
              Safe zone:
            </span>
            <span className='font-bold'>
              {room.safeZoneRadius}x{room.safeZoneRadius}
            </span>
          </div>

          {gameOverResult && (
            <GameResultDialog
              isOpen={open}
              onClose={handleOpen}
              result={gameOverResult}
            />
          )}

          {/* {!gameOverResult && (
              <div className='bg-muted/40 border-muted mt-4 animate-pulse rounded-lg border p-3'>
                <p className='text-center font-bold'>
                  🎯 Wait until the game ends
                </p>
              </div>
            )} */}

          {room.status === BattleRoyalRoomStatus.FINISHED && (
            <Button
              variant={'link'}
              className='bg-muted/40 border-muted mt-4 h-12 w-full animate-pulse rounded-lg border p-3'
              onClick={handleOpen}
            >
              <h2 className='text-center text-lg font-bold'>
                🎯 Game is over. Click to see results
              </h2>
            </Button>
          )}

          {room.status !== BattleRoyalRoomStatus.FINISHED &&
            (room.isMyTurn ? (
              <div className='bg-muted/40 border-muted mt-4 animate-pulse rounded-lg border p-3'>
                <p className='text-center font-bold'>🎯 Your turn!</p>
              </div>
            ) : (
              <div className='bg-border/30 border-border mt-4 rounded-lg border p-3'>
                <p className='text-center font-bold'>🎯 Opponents turn!</p>
              </div>
            ))}
        </div>
      </div>

      <div className='rounded-xl border p-4'>
        <h3 className='mb-4 flex items-center gap-2 text-lg font-semibold'>
          <User className='h-5 w-5' />
          Your ship
        </h3>

        <div className='space-y-4'>
          <div>
            <div className='mb-2 flex items-center justify-between'>
              <span className='flex items-center gap-2 text-gray-400'>
                <Heart className='h-4 w-4' />
                Lives:
              </span>
              <span className='font-bold'>
                {myPlayer.lives}/{myPlayer.maxLives}
              </span>
            </div>
            <div className='h-2 overflow-hidden rounded-full bg-neutral-400/40 dark:bg-gray-700'>
              <motion.div
                className='bg-muted h-full'
                initial={{ width: '0%' }}
                animate={{
                  width: `${(myPlayer.lives / myPlayer.maxLives) * 100}%`,
                }}
                transition={{ duration: 1 }}
              />
            </div>
          </div>

          {/* Бонусы */}
          <div className='grid grid-cols-2 gap-3 sm:grid-cols-4'>
            <div className='rounded-lg border p-3'>
              <div className='mb-1 flex items-center gap-2'>
                <Zap className='h-4 w-4' />
                <span className='text-sm'>Speed</span>
              </div>
              <span className='text-lg font-bold'>
                +{myPlayer.movementBoost}
              </span>
            </div>

            <div className='rounded-lg border p-3'>
              <div className='mb-1 flex items-center gap-2'>
                <Target className='h-4 w-4' />
                <span className='text-sm'>Attack</span>
              </div>
              <span className='text-lg font-bold'>+{myPlayer.attackBoost}</span>
            </div>

            <div className='rounded-lg border p-3'>
              <div className='mb-1 flex items-center gap-2'>
                <Eye className='h-4 w-4' />
                <span className='text-sm'>Viewing</span>
              </div>
              <span className='text-lg font-bold'>
                {myPlayer.visionRadius}x{myPlayer.visionRadius}
              </span>
            </div>

            <div className='rounded-lg border p-3'>
              <div className='mb-1 flex items-center gap-2'>
                <Navigation className='h-4 w-4' />
                <span className='text-sm'>Position</span>
              </div>
              <span className='text-lg font-bold'>
                {myPlayer.x},{myPlayer.y}
              </span>
            </div>
          </div>

          {totalUpgrades > 0 && (
            <div>
              <h4 className='mb-2 text-sm font-medium text-gray-400'>
                Improvements ({totalUpgrades})
              </h4>
              <div className='grid grid-cols-3 gap-3'>
                {myPlayer.upgradeSlots
                  .sort((a, b) => a.slotIndex - b.slotIndex)
                  .map((slot, index) => {
                    const SlotIcon = slot.upgradeType
                      ? getUpgradeIcon(slot.upgradeType)
                      : Gift;
                    return (
                      <motion.div
                        key={index}
                        className='rounded-lg border border-yellow-500 bg-yellow-500/40 p-2'
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className='flex items-center justify-center gap-2'>
                          <SlotIcon />

                          {slot.upgradeType ? (
                            <span>
                              {getUpgradeDisplayName(slot.upgradeType)}
                            </span>
                          ) : (
                            <span className='text-xs'>
                              Slot {slot.slotIndex + 1}
                            </span>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
