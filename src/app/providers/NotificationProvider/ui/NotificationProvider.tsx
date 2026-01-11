'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import {
  FC,
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Socket, io } from 'socket.io-client';
import { toast } from 'sonner';

import { RequestResultDto } from '../dto/request-result.dto';

import { NotificationContext } from '@/src/app/contexts/NotificationContext';
import { useProfile } from '@/src/shared/hooks';
import { Button } from '@/src/shared/ui/Button/Button';

export const NotificationProvider: FC<PropsWithChildren> = props => {
  const { children } = props;
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const { user, isLoading } = useProfile();
  const router = useRouter();
  const queryClient = useQueryClient();

  const socketInitializedRef = useRef(false);
  const reconnectAttemptRef = useRef(0);
  const MAX_RECONNECT_ATTEMPTS = 3;

  useEffect(() => {
    if (!user || isLoading || socketInitializedRef.current || socket) return;

    const initializeSocket = () => {
      socketInitializedRef.current = true;

      const socketInstance = io('http://dot-ship.com:5000/notification', {
        path: '/socket.io',
        auth: {
          userId: user.id,
        },
        transports: ['websocket'],
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        timeout: 10000,
        autoConnect: true,
        forceNew: false,
      });

      socketInstance.on('connect', () => {
        console.log('Socket connected successfully notification');
        setIsConnected(true);
        reconnectAttemptRef.current = 0;
      });

      socketInstance.on('disconnect', reason => {
        console.log('Socket disconnected notification:', reason);
        setIsConnected(false);

        if (
          reason === 'io server disconnect' ||
          reason === 'io client disconnect'
        ) {
          toast.error('Connection lost notification');
        }
      });

      socketInstance.on('connect_error', err => {
        console.error('Connection error:', err.message);
        reconnectAttemptRef.current += 1;

        if (reconnectAttemptRef.current >= MAX_RECONNECT_ATTEMPTS) {
          toast.error('Failed to connect to server. Please refresh the page.');
          socketInstance.disconnect();
        } else {
          toast.error(
            `Connection error. Attempt ${reconnectAttemptRef.current}/${MAX_RECONNECT_ATTEMPTS}`
          );
        }
      });

      socketInstance.on('error', (error: { message: string }) => {
        console.error('Socket error:', error);
        toast.error(error.message || 'An error occurred');
      });

      socketInstance.on('game_updated', () => {
        queryClient.invalidateQueries({ queryKey: ['games'] });
      });

      socketInstance.on('request_result', (data: RequestResultDto) => {
        queryClient.invalidateQueries({ queryKey: ['friend request'] });
        toast('Friend request received!', {
          description: `${data.sendFrom} sent you a friend request`,
          action: {
            label: 'Show',
            onClick: () => router.push('/friends'),
          },
        });
      });

      socketInstance.on('request_result_success', () => {
        queryClient.invalidateQueries({ queryKey: ['friend search'] });
        toast('Friend request sent!');
      });

      socketInstance.on('accept_result', (data: RequestResultDto) => {
        queryClient.invalidateQueries({ queryKey: ['friend'] });
        toast('Friend request accepted!', {
          description: `${data.sendFrom} accepted your friend request`,
          action: {
            label: 'Show',
            onClick: () => router.push('/friends'),
          },
        });
      });

      socketInstance.on('accept_result_success', () => {
        queryClient.invalidateQueries({ queryKey: ['friend request'] });
        queryClient.invalidateQueries({ queryKey: ['friend'] });
        toast('Friend request accepted!');
      });

      socketInstance.on('reject_result', (data: RequestResultDto) => {
        queryClient.invalidateQueries({ queryKey: ['friend'] });
        toast('Friend request rejected!', {
          description: `${data.sendFrom} rejected your friend request`,
          action: {
            label: 'Show',
            onClick: () => router.push('/friends'),
          },
        });
      });

      socketInstance.on('reject_result_success', () => {
        queryClient.invalidateQueries({ queryKey: ['friend request'] });
        queryClient.invalidateQueries({ queryKey: ['friend'] });
        toast('Friend request rejected!');
      });

      socketInstance.on('remove_result', (data: RequestResultDto) => {
        queryClient.invalidateQueries({ queryKey: ['friend'] });
        toast('Friend request removed!', {
          description: ` You removed ${data.sendFrom} from your friends list`,
        });
      });

      socketInstance.on('remove_result_success', () => {
        queryClient.invalidateQueries({ queryKey: ['friend'] });
      });

      socketInstance.on(
        'invite_game_request',
        (data: { gameId: string; senderId: string }) => {
          toast.custom(
            t => (
              <div className='bg-background border-border flex items-center gap-4 rounded-lg border p-4 shadow-lg'>
                <div>
                  <p className='font-medium'>Invitation to the game</p>
                  <p className='text-sm'>Your friend invites you to play</p>
                </div>
                <div className='flex gap-2'>
                  <Button
                    onClick={() => {
                      toast.dismiss(t);
                      socketInstance.emit('invite_accept', {
                        receiverId: data.senderId,
                        gameId: data.gameId,
                      });
                    }}
                  >
                    Accept
                  </Button>
                  <Button
                    onClick={() => {
                      toast.dismiss(t);
                      socketInstance.emit('invite_reject', {
                        receiverId: data.senderId,
                      });
                    }}
                    variant='outline'
                  >
                    Dismiss
                  </Button>
                </div>
              </div>
            ),
            {
              duration: 30000,
            }
          );
        }
      );

      socketInstance.on(
        'invite_game_accept',
        (data: { gameId: string; roomId: string; friendId: string }) => {
          router.push(
            `/sea-battle?gameId=${data.gameId}&roomId=${data.roomId}&friendId=${data.friendId}`
          );
        }
      );

      socketInstance.on('invite_game_reject', () => {
        toast('Friend cancelled the invite.', {
          description: `Maybe later :)`,
        });
      });

      socketInstance.on('reconnect', () => {
        console.log('Reconnected to matchmaking server');
        toast.info('Reconnected to server');
      });

      setSocket(socketInstance);
    };

    initializeSocket();

    return () => {
      socketInitializedRef.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleSendFriendRequest = useCallback(
    (receiverId: string) => {
      if (!socket) {
        toast.error('Connection error');
        return;
      }

      socket.emit('friend_request', { receiverId });
    },
    [socket]
  );

  const handleAcceptFriendRequest = useCallback(
    (receiverId: string) => {
      if (!socket) {
        toast.error('Connection error');
        return;
      }

      socket.emit('accept_request', { receiverId });
    },
    [socket]
  );

  const handleRejectFriendRequest = useCallback(
    (receiverId: string) => {
      if (!socket) {
        toast.error('Connection error');
        return;
      }

      socket.emit('reject_request', { receiverId });
    },
    [socket]
  );

  const handleRemoveFriendRequest = useCallback(
    (receiverId: string) => {
      if (!socket) {
        toast.error('Connection error');
        return;
      }

      socket.emit('remove_request', { receiverId });
    },
    [socket]
  );

  const handleInviteFriendRequest = useCallback(
    (receiverId: string, gameId: string) => {
      if (!socket) {
        toast.error('Connection error');
        return;
      }

      socket.emit('invite_request', { receiverId, gameId });
    },
    [socket]
  );

  const handleInviteFriendExpire = useCallback(
    (receiverId: string) => {
      if (!socket) {
        toast.error('Connection error');
        return;
      }

      socket.emit('invite_expire', { receiverId });
    },
    [socket]
  );

  return (
    <NotificationContext.Provider
      value={{
        socket,
        isConnected,
        handleSendFriendRequest,
        handleAcceptFriendRequest,
        handleRejectFriendRequest,
        handleRemoveFriendRequest,
        handleInviteFriendRequest,
        handleInviteFriendExpire,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
