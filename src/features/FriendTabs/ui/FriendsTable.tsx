import { Check, Trophy, UserMinus } from 'lucide-react';
import { FC } from 'react';

import { FriendRequest } from '../types/ui/friend-request.types';

import { FriendAvatar } from './FriendAvatar';
import { useNotification } from '@/src/shared/hooks';
import { FriendRequestStatus } from '@/src/shared/lib/types';
import { Badge } from '@/src/shared/ui/Badge/Badge';
import { Button } from '@/src/shared/ui/Button/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/src/shared/ui/Card/Card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/src/shared/ui/Table/Table';

interface Props {
  title: string;
  description: string;
  friends: FriendRequest[] | undefined;
  forAdmin?: boolean;
}

export const FriendsTable: FC<Props> = props => {
  const { title, description, friends, forAdmin = false } = props;
  const {
    handleAcceptFriendRequest,
    handleRejectFriendRequest,
    handleRemoveFriendRequest,
  } = useNotification();

  if (!friends) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-2xl'>{title}</CardTitle>
        <CardDescription className='text-1xl'>{description}</CardDescription>
      </CardHeader>
      <CardContent className=''>
        {friends && friends.length > 0 ? (
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
                  <TableRow key={friend.user.id}>
                    <TableCell>
                      <FriendAvatar
                        displayName={friend.user.displayName}
                        picture={friend.user.picture}
                      />
                    </TableCell>
                    <TableCell className='font-medium'>
                      {friend.user.displayName}
                    </TableCell>
                    <TableCell className='text-center'>
                      <Badge variant={'default'}>
                        {friend.user.rating?.toFixed(1)} <Trophy />
                      </Badge>
                    </TableCell>
                    {!forAdmin &&
                      (friend.status === FriendRequestStatus.ACCEPTED ? (
                        <TableCell className='text-right'>
                          <Button
                            size='sm'
                            onClick={() =>
                              handleRemoveFriendRequest(friend.user.id)
                            }
                          >
                            <UserMinus className='mr-2 h-4 w-4' />
                            Remove
                          </Button>
                        </TableCell>
                      ) : (
                        <TableCell className='text-right'>
                          <Button
                            size='sm'
                            className='mr-3'
                            onClick={() =>
                              handleAcceptFriendRequest(friend.user.id)
                            }
                          >
                            <Check className='mr-2 h-4 w-4' />
                            Accept
                          </Button>
                          <Button
                            size='sm'
                            onClick={() =>
                              handleRejectFriendRequest(friend.user.id)
                            }
                          >
                            <UserMinus className='mr-2 h-4 w-4' />
                            Reject
                          </Button>
                        </TableCell>
                      ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className='flex w-full justify-start'>
            <h2>{"You don't have any friends right now, add them soon!"}</h2>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
