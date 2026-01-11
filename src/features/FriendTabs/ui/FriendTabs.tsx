'use client';

import { Loader2 } from 'lucide-react';
import React, { FC } from 'react';

import { useFriendsRequest } from '../hooks';

import { FriendsSearch } from './FriendsSearch';
import { FriendsTable } from './FriendsTable';
import { useFriends } from '@/src/shared/hooks';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/src/shared/ui/Tabs/Tabs';

interface Props {
  initialFriendState?: 'friends' | 'search' | 'request';
  userId: string;
  forAdmin?: boolean;
}

export const FriendTabs: FC<Props> = ({
  initialFriendState = 'friends',
  userId,
  forAdmin = false,
}) => {
  const { friends, isLoading } = useFriends(userId);
  const { friends: friendsRequest, isLoading: isLoadingRequest } =
    useFriendsRequest();

  return (
    <div className='flex w-full flex-wrap items-center justify-start'>
      <h2 className='mb-5 w-full text-left text-2xl font-bold'>Friends</h2>
      <Tabs
        defaultValue={initialFriendState ? initialFriendState : 'friends'}
        className='w-full'
      >
        <TabsList className='bg-primary/5 dark:bg-gray-700'>
          <TabsTrigger value='friends' className='text-1xl'>
            Friends
          </TabsTrigger>
          {!forAdmin && (
            <>
              <TabsTrigger value='search' className='text-1xl'>
                Search
              </TabsTrigger>
              <TabsTrigger value='request' className='text-1xl'>
                Requests
              </TabsTrigger>
            </>
          )}
        </TabsList>
        <TabsContent value='friends'>
          {!isLoading ? (
            <FriendsTable
              title='Your friends'
              description='Here you can find all your friends.'
              friends={friends}
              forAdmin={forAdmin}
            />
          ) : (
            <Loader2 className='animate-spin' />
          )}
        </TabsContent>
        <TabsContent value='search'>
          <FriendsSearch />
        </TabsContent>
        <TabsContent value='request'>
          {!isLoadingRequest ? (
            <FriendsTable
              title='Friend requests'
              description='Here you can accept friend requests.'
              friends={friendsRequest}
            />
          ) : (
            <Loader2 className='animate-spin' />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
