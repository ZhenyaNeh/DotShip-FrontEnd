import { motion } from 'framer-motion';
import {
  CrosshairIcon,
  Loader2,
  ShipIcon,
  SwordIcon,
  TrophyIcon,
} from 'lucide-react';
import React, { FC } from 'react';

import { useMatchmaking } from '@/src/shared/hooks/useMatchmaking/useMatchmaking';
import { IGame } from '@/src/shared/lib/types';
import { Button } from '@/src/shared/ui/Button/Button';

interface Props {
  game: IGame;
}

export const BattleRoyalStart: FC<Props> = ({ game }) => {
  const {
    isSearching,
    gameWithFriendId,
    handleSearch,
    handleCancelSearch,
    handleCancelReady,
    handleReady,
  } = useMatchmaking();

  const handleStartGame = () => {
    if (isSearching) {
      handleCancelSearch();
      return;
    }
    handleSearch();
  };

  const handleReadyGame = () => {
    if (isSearching) {
      handleCancelReady();
      return;
    }
    handleReady();
  };

  return (
    <div className='overflow-hidden bg-gradient-to-br'>
      <div className='absolute inset-0 overflow-hidden'>
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className='bg-muted absolute h-1 w-1 rounded-full'
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, -30, 30, -20, 20],
              x: [null, 20, -20, 15, -15],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.1,
            }}
          />
        ))}
      </div>

      <div className='relative container mx-auto flex min-h-200 flex-col items-center justify-center px-4 py-12'>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className='mb-12 text-center'
        >
          <div className='mb-6 flex items-center justify-center gap-4'>
            <ShipIcon className='h-12 w-12 text-blue-400' />
            <CrosshairIcon className='h-12 w-12 text-red-400' />
            <SwordIcon className='h-12 w-12 text-yellow-400' />
          </div>

          <h1 className='mb-4 text-5xl font-bold md:text-7xl'>
            {game.displayName}
          </h1>
          <h2 className='mb-2 text-3xl font-semibold text-gray-400 md:text-4xl'>
            {game.description}
          </h2>
        </motion.div>

        {/* Основная кнопка запуска */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className='mb-12'
        >
          {!gameWithFriendId ? (
            <Button
              size='lg'
              onClick={handleStartGame}
              className='group relative overflow-hidden px-12 py-8 text-xl font-bold shadow-2xl transition-all duration-800'
            >
              <motion.div
                className='absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent'
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />

              <div className='relative flex items-center gap-4'>
                {isSearching ? (
                  <>
                    <Loader2 className='animate-spin' />
                    <span>Cancel Battle Royal</span>
                  </>
                ) : (
                  <>
                    <TrophyIcon className='h-8 w-8' />
                    <span>Start Battle Royal</span>
                  </>
                )}
              </div>
            </Button>
          ) : (
            <Button
              size='lg'
              onClick={handleReadyGame}
              className='group relative overflow-hidden px-12 py-8 text-xl font-bold shadow-2xl transition-all duration-800'
            >
              <motion.div
                className='absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent'
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />

              <div className='relative flex items-center gap-4'>
                {isSearching ? (
                  <>
                    <Loader2 className='animate-spin' />
                    <span>Cancel Battle Royal</span>
                  </>
                ) : (
                  <>
                    <TrophyIcon className='h-8 w-8' />
                    <span>Ready Battle Royal</span>
                  </>
                )}
              </div>
            </Button>
          )}
        </motion.div>
      </div>
    </div>
  );
};
