'use client';

import { useRouter, useSearchParams } from 'next/navigation';
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

import { MatchmakingContext } from '@/src/app/contexts/MatchmakingContext';
import { useGames, usePlacement, useProfile } from '@/src/shared/hooks';
import { GameMode } from '@/src/shared/lib/types';

type SocketResponse = {
  status: string;
  roomId?: string;
};

type MatchFoundData = {
  roomId: string;
};

export const MatchmakingProvider: FC<PropsWithChildren> = ({ children }) => {
  const { ships } = usePlacement();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const searchParams = useSearchParams();
  const gameId = searchParams.get('gameId');
  const gameWithFriendId = searchParams.get('roomId');
  const friendId = searchParams.get('friendId');
  const router = useRouter();
  const { user } = useProfile();
  const { games } = useGames();
  const game = games?.find(game => game.id === gameId);

  const isSearchingRef = useRef(false);
  const toastIdRef = useRef<string | number | null>(null);
  const socketInitializedRef = useRef(false);
  const reconnectAttemptRef = useRef(0);
  const MAX_RECONNECT_ATTEMPTS = 3;

  useEffect(() => {
    if (!user || socketInitializedRef.current || socket) return;

    const initializeSocket = () => {
      socketInitializedRef.current = true;

      const socketInstance = io('http://dot-ship.com:5000/matchmaking', {
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
        console.log('Socket connected successfully matchmaking');
        setIsConnected(true);
        reconnectAttemptRef.current = 0;
      });

      socketInstance.on('disconnect', reason => {
        console.log('Socket disconnected matchmaking:', reason);
        setIsConnected(false);

        if (
          reason === 'io server disconnect' ||
          reason === 'io client disconnect'
        ) {
          setIsSearching(false);
          isSearchingRef.current = false;
          toast.dismiss();
          toastIdRef.current = null;
          toast.info('Search cancelled');
          toast.error('Connection lost matchmaking');
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

      socketInstance.on('match_found', (data: MatchFoundData) => {
        setIsSearching(false);
        isSearchingRef.current = false;
        toast.dismiss();
        toastIdRef.current = null;

        toast.success('Match Found!');
        router.push(`/sea-battle/${data.roomId}`);
      });

      socketInstance.on('match_found_battle_royal', (data: MatchFoundData) => {
        setIsSearching(false);
        isSearchingRef.current = false;
        toast.dismiss();
        toastIdRef.current = null;

        toast.success('Match Found!');
        router.push(`/sea-battle/battle-royal/${data.roomId}`);
      });

      socketInstance.on('opponent_cancelled', () => {
        toast.info('Opponent cancelled the search.');
        setIsSearching(false);
        isSearchingRef.current = false;
        toastIdRef.current = null;
      });

      socketInstance.on('match_ready_start', (data: MatchFoundData) => {
        setIsSearching(false);
        isSearchingRef.current = false;
        toast.dismiss();
        toastIdRef.current = null;

        toast.success('Match ready!');
        if (game?.gameMode === GameMode.BATTLE_ROYAL) {
          router.push(`/sea-battle/battle-royal/${data.roomId}`);
        } else {
          router.push(`/sea-battle/${data.roomId}`);
        }
      });

      socketInstance.on('player_ready_notification', () => {
        setIsSearching(false);
        isSearchingRef.current = false;
        toast.dismiss();
        toastIdRef.current = null;

        toast.info('Second player is ready');
      });

      socketInstance.on('player_ready_cancelled', () => {
        toast.info('Second player is canceled ready');
      });

      socketInstance.on('reconnect', () => {
        console.log('Reconnected to matchmaking server');
        toast.info('Reconnected to server');

        if (isSearchingRef.current && gameId && user) {
          if (!ships || ships.length === 0) return;

          socketInstance.emit(
            'search',
            {
              gameId,
              rating: user?.rating,
              ships: ships,
            },
            (response: SocketResponse) => {
              if (response.status === 'searching') {
                toastIdRef.current = toast.loading('Searching for opponent...');
              }
            }
          );
        }
      });

      setSocket(socketInstance);
    };

    initializeSocket();

    return () => {
      socketInitializedRef.current = false;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleSearch = useCallback(() => {
    if (!socket || !user) {
      toast.error('Connection error or user not found');
      return;
    }

    if (!ships || ships.length === 0) {
      toast.error('Please place your ships first');
      return;
    }

    setIsSearching(true);
    isSearchingRef.current = true;

    socket.emit(
      'search',
      {
        gameId,
        rating: user.rating,
        ships: ships,
      },
      (response: SocketResponse) => {
        if (response.status === 'searching') {
          toastIdRef.current = toast.loading('Searching for opponent...');
        } else if (response.status === 'error') {
          setIsSearching(false);
          isSearchingRef.current = false;
          toast.error('Failed to start search');
        }
      }
    );
  }, [socket, user, ships, gameId]);

  const handleCancelSearch = useCallback(() => {
    if (!socket || !gameId) return;

    socket.emit('cancel_search', { gameId }, (result: SocketResponse) => {
      if (result.status !== 'cancelled') return;
      setIsSearching(false);
      isSearchingRef.current = false;
      toast.dismiss();
      toastIdRef.current = null;
      toast.info('Search cancelled');
    });
  }, [socket, gameId]);

  const handleReady = useCallback(() => {
    if (!socket || !user) {
      toast.error('Connection error or user not found');
      return;
    }

    if (!gameWithFriendId) {
      toast.error('Room ID is missing');
      return;
    }

    if (game?.gameMode !== GameMode.BATTLE_ROYAL) {
      if (!ships || ships.length === 0) {
        toast.error('Please place your ships first');
        return;
      }
    }

    setIsSearching(true);
    isSearchingRef.current = true;

    socket.emit('ready_player', {
      gameId,
      roomId: gameWithFriendId,
      friendId: friendId,
      ships: ships,
    });
  }, [socket, user, gameWithFriendId, game?.gameMode, gameId, friendId, ships]);

  // const handleBattleRoyalReady = useCallback(() => {
  //   if (!socket || !user) {
  //     toast.error('Connection error or user not found');
  //     return;
  //   }

  //   if (!gameWithFriendId) {
  //     toast.error('Room ID is missing');
  //     return;
  //   }

  //   if (!ships || ships.length === 0) {
  //     toast.error('Please place your ships first');
  //     return;
  //   }

  //   setIsSearching(true);
  //   isSearchingRef.current = true;

  //   socket.emit('ready_player', {
  //     gameId,
  //     roomId: gameWithFriendId,
  //     friendId: friendId,
  //   });
  // }, [socket, user, gameWithFriendId, ships, gameId, friendId]);

  const handleCancelReady = useCallback(() => {
    if (!socket || !gameWithFriendId) return;

    socket.emit(
      'cancel_ready',
      {
        roomId: gameWithFriendId,
        friendId: friendId,
      },
      (result: SocketResponse) => {
        if (result.status !== 'cancelled') return;
        setIsSearching(false);
        isSearchingRef.current = false;
        toast.dismiss();
        toastIdRef.current = null;
        toast.info('Ready cancelled');
      }
    );
  }, [socket, gameWithFriendId, friendId]);

  useEffect(() => {
    isSearchingRef.current = isSearching;
  }, [isSearching]);

  useEffect(() => {
    return () => {
      if (socket && socket.connected) {
        if (isSearchingRef.current) {
          if (gameWithFriendId) {
            socket.emit('cancel_ready', {
              roomId: gameWithFriendId,
              friendId: friendId,
            });
          } else if (gameId) {
            socket.emit('cancel_search', { gameId });
          }
        }

        socket.disconnect();
      }

      toast.dismiss();
    };
  }, [socket, gameId, gameWithFriendId, friendId]);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (isSearchingRef.current && socket?.connected) {
        event.preventDefault();

        if (gameWithFriendId) {
          socket.emit('cancel_ready', {
            roomId: gameWithFriendId,
            friendId: friendId,
          });
        } else if (gameId) {
          socket.emit('cancel_search', { gameId });
        }
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [friendId, gameId, gameWithFriendId, socket]);

  if (!gameId) {
    router.push('/games-catalog');
  }

  if (!user) {
    return null;
  }

  return (
    <MatchmakingContext.Provider
      value={{
        socket,
        isConnected,
        isSearching,
        gameWithFriendId,
        ships,
        handleSearch,
        handleReady,
        handleCancelSearch,
        handleCancelReady,
      }}
    >
      {children}
    </MatchmakingContext.Provider>
  );
};
