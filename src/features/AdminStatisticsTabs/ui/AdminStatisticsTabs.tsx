'use client';

import React, { FC } from 'react';

import {
  useActiveGames,
  useAdminDashboardStats,
  useAllNonAdminUsers,
} from '../hooks';

import { ActiveGamesTab } from './ActiveGamesTab';
import { AdminDashboardTab } from './AdminDashboardStatsTab';
import { AllNonAdminUsersTab } from './AllNonAdminUsersTab';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/src/shared/ui/Tabs/Tabs';

interface Props {
  initialStatisticsState?: 'users' | 'games' | 'dashboard';
}

export const AdminStatisticsTabs: FC<Props> = ({
  initialStatisticsState = 'users',
}) => {
  const { allNonAdminUsers, isLoadingAllNonAdminUsers } = useAllNonAdminUsers();
  const { activeGames, isLoadingActiveGames } = useActiveGames();
  const { adminDashboardStats, isLoadingAdminDashboardStats } =
    useAdminDashboardStats();

  return (
    <div className='flex w-full flex-wrap items-center justify-start'>
      <h2 className='mb-5 w-full text-left text-2xl font-bold'>Statistics</h2>
      <Tabs defaultValue={initialStatisticsState} className='w-full'>
        <TabsList className='bg-primary/5 dark:bg-gray-700'>
          <TabsTrigger value='users' className='text-1xl'>
            Users
          </TabsTrigger>
          <TabsTrigger value='games' className='text-1xl'>
            Games
          </TabsTrigger>
          <TabsTrigger value='dashboard' className='text-1xl'>
            Dashboard
          </TabsTrigger>
        </TabsList>
        <TabsContent value='users'>
          <AllNonAdminUsersTab
            allNonAdminUsers={allNonAdminUsers}
            isLoading={isLoadingAllNonAdminUsers}
          />
        </TabsContent>
        <TabsContent value='games'>
          <ActiveGamesTab
            activeGames={activeGames}
            isLoading={isLoadingActiveGames}
          />
        </TabsContent>
        <TabsContent value='dashboard'>
          <AdminDashboardTab
            adminDashboardStats={adminDashboardStats}
            isLoading={isLoadingAdminDashboardStats}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
