'use client';

import React, { FC } from 'react';

import { useLastGames, useRatingProgression, useUserStats } from '../hooks';

import { LastGamesTab } from './LastGamesTab';
import { RatingProgressionTab } from './RatingProgressionTab';
import { UserStatsTab } from './UserStatsTab';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/src/shared/ui/Tabs/Tabs';

interface Props {
  initialStatisticsState?: 'wins/losses' | 'rating' | 'history';
  userId: string;
}

export const StatisticsTabs: FC<Props> = ({
  initialStatisticsState = 'wins/losses',
  userId,
}) => {
  const { userStats, isLoadingUserStats } = useUserStats(userId);
  const { lastGames, isLoadingLastGames } = useLastGames(userId);
  const { ratingProgression, isLoadingRatingProgression } =
    useRatingProgression(userId);

  return (
    <div className='flex w-full flex-wrap items-center justify-start'>
      <h2 className='mb-5 w-full text-left text-2xl font-bold'>Statistics</h2>
      <Tabs defaultValue={initialStatisticsState} className='w-full'>
        <TabsList className='bg-primary/5 dark:bg-gray-700'>
          <TabsTrigger value='wins/losses' className='text-1xl'>
            Wins/Losses
          </TabsTrigger>
          <TabsTrigger value='rating' className='text-1xl'>
            Rating
          </TabsTrigger>
          <TabsTrigger value='history' className='text-1xl'>
            History
          </TabsTrigger>
        </TabsList>
        <TabsContent value='wins/losses'>
          <UserStatsTab userStats={userStats} isLoading={isLoadingUserStats} />
        </TabsContent>
        <TabsContent value='rating'>
          <RatingProgressionTab
            ratingProgression={ratingProgression}
            isLoading={isLoadingRatingProgression}
          />
        </TabsContent>
        <TabsContent value='history'>
          <LastGamesTab lastGames={lastGames} isLoading={isLoadingLastGames} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
