'use client';

import { useQueryClient } from '@tanstack/react-query';
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

import { BattleRoyalUpgradeDto } from '../dto/bonus.dto';

import { BattleRoyalContext } from '@/src/app/contexts/BattleRoyalContext';
import { useSound } from '@/src/shared/hooks';
import { GameResultSummary } from '@/src/widgets/BattleRoyal/types/battle-royal-game-over.types';
import {
  BattleRoyalGameData,
  BattleRoyalRoomStatus,
} from '@/src/widgets/BattleRoyal/types/battle-royal-initial.types';

export const BattleRoyalProvider: FC<PropsWithChildren> = props => {
  const { children } = props;
  const [gameState, setGameState] = useState<BattleRoyalGameData | undefined>(
    undefined
  );
  const [gameOverResult, setGameOverResult] = useState<
    GameResultSummary | undefined
  >(undefined);

  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [selectedEvent, setSelectedEvent] =
    useState<BattleRoyalUpgradeDto | null>(null);
  const [openEventDialog, setOpenEventDialog] = useState<boolean>(true);
  const { playSound } = useSound();

  const queryClient = useQueryClient();

  const socketInitializedRef = useRef(false);
  const reconnectAttemptRef = useRef(0);
  const MAX_RECONNECT_ATTEMPTS = 3;

  useEffect(() => {
    if (!gameState || socketInitializedRef.current || socket) return;

    const initializeSocket = () => {
      socketInitializedRef.current = true;

      const socketInstance = io('http://dot-ship.com:5000/game-session', {
        path: '/socket.io',
        auth: {
          userId: gameState.myPlayer.user.id,
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
        console.log('Socket connected successfully game-session');
        setIsConnected(true);
        reconnectAttemptRef.current = 0;
      });

      socketInstance.on('disconnect', reason => {
        console.log('Socket disconnected:', reason);
        setIsConnected(false);

        if (
          reason === 'io server disconnect' ||
          reason === 'io client disconnect'
        ) {
          toast.error('Connection lost');
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

      socketInstance.on(
        'upgrade_chose_battle_royal',
        (data: BattleRoyalUpgradeDto) => {
          setSelectedEvent(data);
          setOpenEventDialog(true);
        }
      );

      socketInstance.on(
        'update_attack_player_battle_royal',
        (data: BattleRoyalGameData) => {
          if (data.room.status === BattleRoyalRoomStatus.FINISHED) {
            queryClient.invalidateQueries({
              queryKey: ['game over battle royal data'],
            });
            queryClient.invalidateQueries({
              queryKey: ['initial battle royal state'],
            });
          }
          playSound('hit', 0.8);
          setGameState(data);
        }
      );

      socketInstance.on(
        'update_attack_bonus_battle_royal',
        (data: BattleRoyalGameData) => {
          if (data.room.status === BattleRoyalRoomStatus.FINISHED) {
            queryClient.invalidateQueries({
              queryKey: ['game over battle royal data'],
            });
            queryClient.invalidateQueries({
              queryKey: ['initial battle royal state'],
            });
          }
          setGameState(data);
          playSound('getBonus', 0.8);
        }
      );

      socketInstance.on(
        'update_attack_battle_royal',
        (data: BattleRoyalGameData) => {
          if (data.room.status === BattleRoyalRoomStatus.FINISHED) {
            queryClient.invalidateQueries({
              queryKey: ['game over battle royal data'],
            });
            queryClient.invalidateQueries({
              queryKey: ['initial battle royal state'],
            });
          }
          const liveGameState = data.myPlayer.lives < gameState.myPlayer.lives;

          const liveOpponentState = data.otherPlayers.some(player => {
            const previousPlayer = gameState.otherPlayers.find(
              p => p.user.id === player.user.id
            );
            return previousPlayer && player.lives < previousPlayer.lives;
          });
          if (liveGameState) {
            playSound('hit', 0.8);
          } else if (liveOpponentState) {
            playSound('hit', 0.8);
          } else {
            playSound('miss', 0.8);
          }

          setGameState(data);
        }
      );

      socketInstance.on(
        'update_move_battle_royal',
        (data: BattleRoyalGameData) => {
          if (data.room.status === BattleRoyalRoomStatus.FINISHED) {
            queryClient.invalidateQueries({
              queryKey: ['game over battle royal data'],
            });
            queryClient.invalidateQueries({
              queryKey: ['initial battle royal state'],
            });
          }
          playSound('miss', 0.8);
          setGameState(data);
        }
      );

      setSocket(socketInstance);
    };

    initializeSocket();

    return () => {
      socketInitializedRef.current = false;
    };
  }, [gameState, playSound, queryClient, socket]);

  const handleMove = useCallback(
    (x: number, y: number) => {
      if (!socket || !gameState) {
        toast.error('Connection error');
        return;
      }

      if (!gameState.room.isMyTurn) {
        toast.error('Is not you turn');
        return;
      }

      if (gameState.myPlayer.remainingMoves > 0) {
        socket.emit('move_event_battle_royal', {
          roomId: gameState?.room.id,
          x,
          y,
        });
      } else if (gameState.myPlayer.remainingAttacks > 0) {
        socket.emit('attack_event_battle_royal', {
          roomId: gameState?.room.id,
          x,
          y,
        });
      }
    },
    [gameState, socket]
  );

  const handleSetBonus = useCallback(
    (slotIndex: number, upgrade: BattleRoyalUpgradeDto) => {
      if (!socket || !gameState) {
        toast.error('Connection error');
        return;
      }

      if (!gameState.room.isMyTurn) {
        toast.error('Is not you turn');
        return;
      }

      socket.emit('set_bonus_battle_royal', {
        slotIndex,
        roomId: gameState?.room.id,
        upgrade,
      });
    },
    [gameState, socket]
  );

  return (
    <BattleRoyalContext.Provider
      value={{
        socket,
        isConnected,
        gameState,
        selectedEvent,
        openEventDialog,
        gameOverResult,
        setSelectedEvent,
        setOpenEventDialog,
        setGameState,
        handleMove,
        handleSetBonus,
        setGameOverResult,
      }}
    >
      {children}
    </BattleRoyalContext.Provider>
  );
};
