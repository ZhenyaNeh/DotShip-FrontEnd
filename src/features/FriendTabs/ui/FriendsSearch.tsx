// components/FriendSearch.tsx
import { Search, Trophy, UserPlus } from 'lucide-react';
import React, { FC } from 'react';

import { useFriendSearch } from '../hooks';

import { FriendAvatar } from './FriendAvatar';
import { useNotification } from '@/src/shared/hooks';
import { Badge } from '@/src/shared/ui/Badge/Badge';
import { Button } from '@/src/shared/ui/Button/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/src/shared/ui/Card/Card';
import { Input } from '@/src/shared/ui/Input/Input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/src/shared/ui/Table/Table';

export const FriendsSearch: FC = () => {
  const { friends, isLoading, searchTerm, handleSearch } = useFriendSearch();
  const { handleSendFriendRequest } = useNotification();

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-2xl'>Search for friends</CardTitle>
        <CardDescription className='text-1xl'>
          Here you can find new friends.
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-2'>
        <div className='relative'>
          <Search className='text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform' />
          <Input
            placeholder='Search friend by name of email...'
            value={searchTerm}
            onChange={e => handleSearch(e.target.value)}
            className='border-border pl-10'
          />
        </div>

        {isLoading && searchTerm && (
          <div className='py-4 text-center'>
            <div className='mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-blue-500'></div>
            <p className='mt-2 text-gray-600'>Searching...</p>
          </div>
        )}

        {friends && !isLoading && searchTerm && (
          <div>
            <h3 className='mb-3 text-lg font-semibold'>
              Search results ({friends.length})
            </h3>

            {friends.length === 0 ? (
              <p className='py-4 text-center text-gray-500'>
                {`No friends found for \"${searchTerm}\"`}
              </p>
            ) : (
              <div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className='w-[50px]'>Avatar</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead className='text-center'>Rating</TableHead>
                      <TableHead className='text-right'>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {friends.map(friend => (
                      <TableRow key={friend.id}>
                        <TableCell>
                          <FriendAvatar
                            displayName={friend.displayName}
                            picture={friend.picture}
                          />
                        </TableCell>
                        <TableCell className='font-medium'>
                          {friend.displayName}
                        </TableCell>
                        <TableCell className='text-center'>
                          <Badge className='gap-1' variant={'default'}>
                            {friend.rating?.toFixed(1) || '0.0'}{' '}
                            <Trophy className='h-3 w-3' />
                          </Badge>
                        </TableCell>
                        <TableCell className='text-right'>
                          <Button
                            size='sm'
                            onClick={() => handleSendFriendRequest(friend.id)}
                          >
                            <UserPlus className='mr-2 h-4 w-4' />
                            Add
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
