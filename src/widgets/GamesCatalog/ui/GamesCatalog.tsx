'use client';

import { AlertCircle, Search } from 'lucide-react';
import { FC, useState } from 'react';

import { GameCardSkeleton } from './GameCardSkeleton';
import { GameFilters } from './GameFilters';
import { GameForm } from './GameForm/GameForm';
import { GamesCard } from './GamesCard';
import { UserRole } from '@/src/features/Auth/types';
import { useGames } from '@/src/shared/hooks';
import { useProfile } from '@/src/shared/hooks';
import { IGame } from '@/src/shared/lib/types';
import { Alert, AlertDescription } from '@/src/shared/ui/Alert/Alert';
import { Input } from '@/src/shared/ui/Input/Input';

export const GamesCatalog: FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMode, setSelectedMode] = useState<IGame['gameMode'] | 'ALL'>(
    'ALL'
  );

  const { user } = useProfile();
  const isUserAdmin = user?.role === UserRole.Admin;
  const { games, isLoading, error } = useGames(isUserAdmin);

  const filteredGames = games?.filter(game => {
    const matchesSearch =
      game.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (game.description?.toLowerCase() || '').includes(
        searchQuery.toLowerCase()
      );

    const matchesMode =
      selectedMode === 'ALL' || game.gameMode === selectedMode;

    return matchesSearch && matchesMode;
  });

  const maxPlayers =
    games && games.length > 0
      ? games.reduce((max, game) => Math.max(max, game.maxPlayers), 0)
      : 0;

  const maxEstimatedTime =
    games && games.length > 0
      ? games.reduce((max, game) => Math.max(max, game.estimatedTime), 0)
      : 0;

  return (
    <div className='container'>
      <div className='mb-8 flex items-center justify-between'>
        <div>
          <h1 className='mb-2 text-4xl font-bold'>Games catalog</h1>
          <p className='text-muted-foreground'>
            Choose a game and immerse yourself in the world of naval battles
          </p>
        </div>
        {isUserAdmin && <GameForm />}
      </div>

      <div className='mb-8 space-y-4'>
        <div className='relative'>
          <Search className='text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform' />
          <Input
            placeholder='Search game...'
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className='border-border pl-10'
          />
        </div>

        <GameFilters
          selectedMode={selectedMode}
          onModeChange={setSelectedMode}
        />
      </div>

      {error && (
        <Alert variant='destructive' className='mb-6 flex justify-center'>
          <AlertCircle className='h-4 w-4' />
          <AlertDescription>
            Failed to load games. Please try again later.
          </AlertDescription>
        </Alert>
      )}

      {isLoading ? (
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {Array.from({ length: 3 }).map((_, i) => (
            <GameCardSkeleton key={i} />
          ))}
        </div>
      ) : filteredGames?.length === 0 ? (
        <div className='py-12 text-center'>
          <AlertCircle className='text-muted-foreground mx-auto mb-4 h-12 w-12' />
          <h3 className='mb-2 text-xl font-semibold'>No games found</h3>
          <p className='text-muted-foreground'>
            {searchQuery
              ? `No results found for "${searchQuery}"`
              : 'There are currently no games available in this category'}
          </p>
        </div>
      ) : (
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {filteredGames?.map(game => (
            <GamesCard key={game.id} game={game} isUserAdmin={isUserAdmin} />
          ))}
        </div>
      )}

      <div className='mt-12 border-t pt-8'>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
          <div className='text-center'>
            <div className='text-primary mb-2 text-3xl font-bold'>
              {games?.length || 0}
            </div>
            <div className='text-muted-foreground'>Available games</div>
          </div>
          <div className='text-center'>
            <div className='text-primary mb-2 text-3xl font-bold'>
              {maxPlayers}
            </div>
            <div className='text-muted-foreground'>
              Maximum number of players
            </div>
          </div>
          <div className='text-center'>
            <div className='text-primary mb-2 text-3xl font-bold'>
              {maxEstimatedTime} min
            </div>
            <div className='text-muted-foreground'>Maximum play time</div>
          </div>
        </div>
      </div>
    </div>
  );
};
