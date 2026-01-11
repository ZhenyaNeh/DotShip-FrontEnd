import { Loader2, RefreshCcw, Wifi, WifiOff } from 'lucide-react';
import React, { FC } from 'react';

import { usePlacement } from '@/src/shared/hooks';
import { useMatchmaking } from '@/src/shared/hooks/useMatchmaking/useMatchmaking';
import { Button } from '@/src/shared/ui/Button/Button';

export const PlacementPanel: FC = () => {
  const { getRandomShipPositions } = usePlacement();
  const {
    isConnected,
    isSearching,
    gameWithFriendId,
    ships,
    handleSearch,
    handleReady,
    handleCancelSearch,
    handleCancelReady,
  } = useMatchmaking();

  const countShipsReady = ships.reduce(
    (acc, ship) => (ship.x >= 0 ? acc + 1 : acc),
    0
  );
  const areShipsReady = countShipsReady === 10;
  const isPlayDisabled = !isConnected || !areShipsReady;

  return (
    <div className='border-border bg-card m-3 h-full w-full flex-1 items-center justify-center rounded-lg border p-6'>
      <h2 className='text-primary text-center text-2xl font-bold'>
        Game Setup
      </h2>

      <div className='mt-6 flex items-center justify-center gap-2 rounded-lg border p-3'>
        {isConnected ? (
          <>
            <Wifi className='h-5 w-5' />
            <span className='font-medium'>Online</span>
          </>
        ) : (
          <>
            <WifiOff className='h-5 w-5' />
            <span className='font-medium'>Offline</span>
          </>
        )}
      </div>

      {/* Ships Placement Section */}
      <div className='bg-background mt-6 rounded-lg border p-4'>
        <div className='mb-4 flex items-center justify-between'>
          <div>
            <h3 className='font-semibold'>Ship Placement</h3>
            <p className='text-muted-foreground text-sm'>
              {areShipsReady
                ? 'All ships are placed correctly'
                : `Place ${10 - ships.length} more ships`}
            </p>
          </div>
          <div className='flex items-center gap-2'>
            <span className='text-sm'>Auto-place:</span>
            <Button
              size='sm'
              variant='outline'
              onClick={getRandomShipPositions}
              className='h-9 w-9 p-0'
              title='Randomize ship positions'
            >
              <RefreshCcw className='h-4 w-4' />
            </Button>
          </div>
        </div>

        <div className='flex items-center gap-2'>
          <div className='bg-muted h-2 flex-1 overflow-hidden rounded-full'>
            <div
              className='h-full bg-green-500 transition-all duration-300'
              style={{ width: `${(countShipsReady / 10) * 100}%` }}
            />
          </div>
          <span className='text-sm font-medium'>{countShipsReady}/10</span>
        </div>
      </div>

      {/* Game Actions */}
      <div className='mt-8'>
        {!isSearching ? (
          <div className='space-y-3'>
            {!gameWithFriendId ? (
              <Button
                className='w-full py-6 text-lg'
                size='lg'
                onClick={handleSearch}
                disabled={isPlayDisabled}
              >
                {isConnected ? 'Find Random Opponent' : 'Connect to Play'}
              </Button>
            ) : (
              <div className='space-y-3'>
                <p className='text-muted-foreground text-center text-sm'>
                  Playing with friend
                </p>
                <Button
                  className='w-full py-6 text-lg'
                  size='lg'
                  onClick={handleReady}
                  disabled={!areShipsReady}
                >
                  Ready to Start
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className='space-y-4'>
            <div className='flex flex-col items-center gap-3'>
              <div className='flex items-center gap-3'>
                <Loader2 className='text-primary h-6 w-6 animate-spin' />
                <span className='font-medium'>
                  {gameWithFriendId
                    ? 'Waiting for opponent...'
                    : 'Searching for opponent...'}
                </span>
              </div>
              <p className='text-muted-foreground text-sm'>
                This may take a few moments
              </p>
            </div>

            <Button
              variant='outline'
              className='w-full'
              onClick={
                gameWithFriendId ? handleCancelReady : handleCancelSearch
              }
            >
              Cancel
            </Button>
          </div>
        )}
      </div>

      {/* Status Messages */}
      <div className='mt-6 space-y-2'>
        {!isConnected && (
          <p className='text-center text-sm text-amber-600'>
            Please check your connection
          </p>
        )}
        {isConnected && !areShipsReady && (
          <p className='text-center text-sm text-amber-600'>
            Place all ships before starting
          </p>
        )}
      </div>
    </div>
  );
};
