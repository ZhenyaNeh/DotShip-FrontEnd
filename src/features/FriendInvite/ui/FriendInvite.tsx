import { Clock, Loader2, Search, Trophy, UserPlus } from 'lucide-react';
import React, { FC, useCallback, useEffect, useState } from 'react';

import { FriendAvatar } from '../../FriendTabs';

import { useFriends, useNotification, useProfile } from '@/src/shared/hooks';
import { GameMode } from '@/src/shared/lib/types';
import { Badge } from '@/src/shared/ui/Badge/Badge';
import { Button } from '@/src/shared/ui/Button/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/src/shared/ui/Dialog/Dialog';
import { Input } from '@/src/shared/ui/Input/Input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/src/shared/ui/Table/Table';

interface Props {
  gameId: string;
  gameMode: GameMode;
}

interface InviteState {
  friendId: string;
  timer: number; // секунды
  isActive: boolean;
}

export const FriendInvite: FC<Props> = ({ gameId }) => {
  const [open, setOpen] = useState<boolean>(false);
  const { user } = useProfile();
  const { friends, isLoading } = useFriends(user?.id || '');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeInvites, setActiveInvites] = useState<InviteState[]>([]);
  const { handleInviteFriendRequest } = useNotification();

  const startInviteTimer = useCallback((friendId: string) => {
    setActiveInvites(prev => [
      ...prev.filter(invite => invite.friendId !== friendId),
      {
        friendId,
        timer: 30,
        isActive: true,
      },
    ]);
  }, []);

  const cancelInvite = useCallback((friendId: string) => {
    setActiveInvites(prev =>
      prev.filter(invite => invite.friendId !== friendId)
    );
  }, []);

  const handleInvite = useCallback(
    (friendId: string) => {
      handleInviteFriendRequest(friendId, gameId);
      startInviteTimer(friendId);
    },
    [gameId, handleInviteFriendRequest, startInviteTimer]
  );

  useEffect(() => {
    if (activeInvites.length === 0) return;

    const interval = setInterval(() => {
      setActiveInvites(prev => {
        const updatedInvites = prev.map(invite => ({
          ...invite,
          timer: invite.timer - 1,
        }));

        const activeInvites = updatedInvites.filter(invite => invite.timer > 0);

        const expiredInvites = updatedInvites.filter(
          invite => invite.timer <= 0
        );

        if (expiredInvites.length > 0) {
          expiredInvites.forEach(invite => {
            console.log(`Invite to ${invite.friendId} expired`);
          });
        }

        return activeInvites;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [activeInvites]);

  const filteredFriends = friends?.filter(friend =>
    friend.user.displayName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getInviteStatus = (friendId: string) => {
    const invite = activeInvites.find(inv => inv.friendId === friendId);
    return invite || null;
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size='lg'
          variant='outline'
          className='w-full gap-2 py-6 text-base font-semibold'
        >
          <UserPlus className='mr-2 h-5 w-5' />
          Play with friend
        </Button>
      </DialogTrigger>

      <DialogContent className='sm:max-w-[600px]'>
        <DialogHeader>
          <DialogTitle>Invite Friend to Game</DialogTitle>
          <DialogDescription>
            Select a friend to invite to your game. They will receive a
            notification. Invite expires in 20 seconds.
          </DialogDescription>
        </DialogHeader>

        {/* Поиск */}
        <div className='relative'>
          <Search className='text-muted-foreground absolute top-3 left-3 h-4 w-4' />
          <Input
            placeholder='Search friends...'
            className='pl-9'
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Список друзей */}
        <div className='max-h-[400px] overflow-y-auto'>
          {isLoading ? (
            <div className='flex items-center justify-center py-8'>
              <div className='border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent'></div>
            </div>
          ) : filteredFriends && filteredFriends.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className='w-[60px]'>Avatar</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className='text-center'>Rating</TableHead>
                  <TableHead className='text-right'>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFriends.map(friend => {
                  const inviteStatus = getInviteStatus(friend.user.id);
                  const isInvitePending = !!inviteStatus;

                  return (
                    <TableRow key={friend.user.id}>
                      <TableCell>
                        <FriendAvatar
                          displayName={friend.user.displayName}
                          picture={friend.user.picture}
                        />
                      </TableCell>
                      <TableCell className='font-medium'>
                        <div className='flex flex-col'>
                          {friend.user.displayName}
                          {isInvitePending && (
                            <span className='mt-1 flex items-center gap-1 text-xs text-yellow-600'>
                              <Clock className='h-3 w-3' />
                              Waiting: {inviteStatus.timer}s
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className='text-center'>
                        <Badge variant='outline' className='gap-1'>
                          {friend.user.rating?.toFixed(1) || 'N/A'}
                          <Trophy className='h-3 w-3' />
                        </Badge>
                      </TableCell>
                      <TableCell className='text-right'>
                        {isInvitePending ? (
                          <div className='flex items-center justify-end gap-2'>
                            <Button
                              size='sm'
                              variant='secondary'
                              disabled
                              className='gap-2'
                            >
                              <Loader2 className='h-4 w-4 animate-spin' />
                              Pending...
                            </Button>
                            <Button
                              size='sm'
                              variant='destructive'
                              onClick={() => cancelInvite(friend.user.id)}
                            >
                              Cancel
                            </Button>
                          </div>
                        ) : (
                          <Button
                            size='sm'
                            onClick={() => handleInvite(friend.user.id)}
                            title={'Send invite'}
                            disabled={isInvitePending}
                          >
                            <UserPlus className='mr-2 h-4 w-4' />
                            Invite
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ) : (
            <div className='flex flex-col items-center justify-center py-8 text-center'>
              <UserPlus className='text-muted-foreground mb-4 h-12 w-12' />
              <h3 className='text-lg font-semibold'>No friends found</h3>
              <p className='text-muted-foreground'>
                {searchQuery
                  ? 'Try a different search term'
                  : "You don't have any friends to invite"}
              </p>
            </div>
          )}
        </div>

        <DialogFooter>
          <div className='flex w-full justify-between'>
            <div className='text-muted-foreground text-sm'>
              {filteredFriends?.length || 0} friend(s) available
              {activeInvites.length > 0 && (
                <span className='ml-2 text-yellow-600'>
                  • {activeInvites.length} pending invite(s)
                </span>
              )}
            </div>
            <div>
              <Button variant='outline' onClick={() => setOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
