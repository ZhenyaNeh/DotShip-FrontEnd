import React, { FC } from 'react';

// interface Props {
//   gameState: BattleRoyalGameData;
// }

export const BattleRoyalBoard: FC = () => {
  // const renderGrid = useMemo(() => {
  //   const calculateSafeZone = (x: number, y: number): boolean => {
  //     const center = gameState.room.fieldSize / 2;
  //     const distance = Math.sqrt(
  //       Math.pow(x - center, 2) + Math.pow(y - center, 2)
  //     );
  //     return distance <= gameState.room.safeZoneRadius;
  //   };

  //   const grid = [];
  //   const cellSize = Math.min(400 / gameState.room.fieldSize, 50);

  //   for (let y = 0; y < gameState.room.fieldSize; y++) {
  //     for (let x = 0; x < gameState.room.fieldSize; x++) {
  //       const isMyPlayer =
  //         gameState.myPlayer.x === x && gameState.myPlayer.y === y;
  //       const otherPlayer = gameState.otherPlayers.find(
  //         p => p.x === x && p.y === y && p.isAlive
  //       );
  //       const upgrade = gameState.upgrades.find(
  //         u => u.x === x && u.y === y && !u.isCollected
  //       );
  //       const isVisible = gameState.myPlayer.visibleCells.some(
  //         cell => cell.x === x && cell.y === y
  //       );
  //       const isSafeZone = calculateSafeZone(x, y);

  //       grid.push(
  //         <Cell
  //           key={`${x}-${y}`}
  //           x={x}
  //           y={y}
  //           size={cellSize}
  //           isVisible={isVisible}
  //           hasMyPlayer={isMyPlayer}
  //           hasPlayer={!!otherPlayer}
  //           playerId={otherPlayer?.id}
  //           hasUpgrade={!!upgrade}
  //           upgradeType={upgrade?.upgradeType}
  //           isSafeZone={isSafeZone}
  //           isCurrentTarget={
  //             gameState.room.playerTurn === gameState.myPlayer.id
  //           }
  //           onClick={() => console.log(x, y)}
  //           isShrinking={
  //             gameState.room.turnNumber >= gameState.room.nextShrinkTurn
  //           }
  //         />
  //       );
  //     }
  //   }

  //   return grid;
  // }, [
  //   gameState.room.fieldSize,
  //   gameState.room.safeZoneRadius,
  //   gameState.room.playerTurn,
  //   gameState.room.turnNumber,
  //   gameState.room.nextShrinkTurn,
  //   gameState.myPlayer.x,
  //   gameState.myPlayer.y,
  //   gameState.myPlayer.visibleCells,
  //   gameState.myPlayer.id,
  //   gameState.otherPlayers,
  //   gameState.upgrades,
  // ]);

  return (
    <div className='flex flex-col gap-8 p-4 lg:flex-row'>
      {/* <div className='relative'>
        <div
          className='grid rounded-xl border-2 border-blue-500/30 bg-gradient-to-br from-blue-900/30 to-slate-900/30 p-4'
          style={{
            gridTemplateColumns: `repeat(${gameState.room.fieldSize}, minmax(0, 1fr))`,
            gap: '2px',
          }}
        >
          {renderGrid}
        </div>

        <div className='mt-4 flex flex-wrap gap-3 text-sm'>
          <div className='flex items-center gap-2'>
            <div className='h-4 w-4 rounded-full bg-green-500'></div>
            <span>Ваш корабль</span>
          </div>
          <div className='flex items-center gap-2'>
            <div className='h-4 w-4 rounded-full bg-red-500'></div>
            <span>Противник</span>
          </div>
          <div className='flex items-center gap-2'>
            <div className='h-4 w-4 rounded-full bg-yellow-500'></div>
            <span>Улучшение</span>
          </div>
          <div className='flex items-center gap-2'>
            <div className='h-4 w-4 rounded-full border-2 border-green-400'></div>
            <span>Безопасная зона</span>
          </div>
        </div>
      </div> */}

      {/* Панель информации */}
      {/* <PlayerInfo gameData={gameData} /> */}
    </div>
  );
};
