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

import { FireResultDto } from '../dto/fire-result.dto';
import { PlayerTurnDto } from '../dto/player-turn.dto';
import { RocketResultDto } from '../dto/rocket-result.dto';
import { SonarResultDto } from '../dto/sonar-result.dto';
import { StormResultDto } from '../dto/storm-result.dto';
import { SunkShipDto } from '../dto/sunk-ship.dto';

import { GameSessionContext } from '@/src/app/contexts/GameSessionContext';
import { useSound } from '@/src/shared/hooks';
import {
  GameEvents,
  GameMode,
  LocalStorageHit,
  MoveType,
} from '@/src/shared/lib/types';
import {
  eventAlreadyHitTokenInstance,
  eventTokenInstance,
} from '@/src/shared/lib/utils';
import {
  InitialGameState,
  MoveResult,
} from '@/src/widgets/GameSession/types/initial-game-state.types';

export const GameSessionProvider: FC<PropsWithChildren> = props => {
  const { children } = props;
  const [gameState, setGameState] = useState<InitialGameState | undefined>(
    undefined
  );
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<GameEvents | null>(null);
  const [openEventDialog, setOpenEventDialog] = useState<boolean>(false);
  const { playSound } = useSound();

  const queryClient = useQueryClient();

  const socketInitializedRef = useRef(false);
  const reconnectAttemptRef = useRef(0);
  const MAX_RECONNECT_ATTEMPTS = 3;

  const [timeLeft, setTimeLeft] = useState(20);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const DURATION = 20;

  const resetTimer = useCallback(() => {
    setTimeLeft(DURATION);
    setIsTimerActive(true);
  }, []);
  const stopTimer = useCallback(() => {
    setTimeLeft(DURATION);
    setIsTimerActive(false);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerActive, timeLeft]);

  const handleFireTimeout = useCallback(() => {
    if (!socket) {
      toast.error('Connection error');
      return;
    }

    socket.emit('fire_random', {
      roomId: gameState?.room.id,
    });
  }, [gameState?.room.id, socket]);

  useEffect(() => {
    if (timeLeft === 0 && isTimerActive && !gameState?.winner_id) {
      const isMyTurn = gameState?.playerTurn === gameState?.player_user.user.id;
      if (isMyTurn) {
        handleFireTimeout();
        setOpenEventDialog(false);
      }
      resetTimer();
    }
  }, [timeLeft, isTimerActive, gameState, handleFireTimeout, resetTimer]);

  useEffect(() => {
    if (!gameState || socketInitializedRef.current || socket) return;

    const initializeSocket = () => {
      socketInitializedRef.current = true;

      const socketInstance = io('http://dot-ship.com:5000/game-session', {
        path: '/socket.io',
        auth: {
          userId: gameState?.player_user.user.id,
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
        setIsTimerActive(true);
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

      socketInstance.on('fire_result', (data: FireResultDto) => {
        setGameState(gameState => {
          if (!gameState) return gameState;

          const isPlayerMove = data.userId === gameState.player_user.user.id;
          const targetPlayerKey = isPlayerMove
            ? 'player_user'
            : 'player_opponent';

          return {
            ...gameState,
            [targetPlayerKey]: {
              ...gameState[targetPlayerKey],
              moves: [...gameState[targetPlayerKey].moves, data.move],
            },
          };
        });
        if (data.move.result === MoveResult.MISS) {
          playSound('miss', 0.8);
        } else {
          playSound('hit', 0.8);
        }
        resetTimer();
      });

      socketInstance.on('rocket_result', (data: RocketResultDto) => {
        setGameState(gameState => {
          if (!gameState) return gameState;

          const currentUserId = gameState.player_user.user.id;
          const newShips = [...data.ships];
          const newMoves = [...data.moves];

          if (data.userId === currentUserId) {
            return {
              ...gameState,
              player_user: {
                ...gameState.player_user,
                moves: newMoves,
              },
              player_opponent: {
                ...gameState.player_opponent,
                ships: newShips,
              },
            };
          } else if (data.opponentId === currentUserId) {
            return {
              ...gameState,
              player_user: {
                ...gameState.player_user,
                ships: newShips,
              },
              player_opponent: {
                ...gameState.player_opponent,
                moves: newMoves,
              },
            };
          }

          return gameState;
        });

        const isHit = data.moves.some(
          move =>
            move.result === MoveResult.HIT || move.result === MoveResult.SUNK
        );

        if (isHit) {
          playSound('hit', 0.8);
        } else {
          playSound('miss', 0.8);
        }

        resetTimer();
      });

      socketInstance.on('sonar_result', (data: SonarResultDto) => {
        setHighlightCellsRadarResult(data.cells);
        playSound('radar', 0.8);
      });

      socketInstance.on('storm_result', (data: StormResultDto) => {
        setGameState(gameState => {
          if (!gameState) return gameState;

          const currentUserId = gameState.player_user.user.id;
          const newShips = [...data.newUserShips];
          const newMoves = [...data.newOpponentMoves];

          if (data.userId === currentUserId) {
            return {
              ...gameState,
              player_user: {
                ...gameState.player_user,
                ships: newShips,
              },
              player_opponent: {
                ...gameState.player_opponent,
                moves: newMoves,
              },
            };
          } else if (data.opponentId === currentUserId) {
            return {
              ...gameState,
              player_user: {
                ...gameState.player_user,
                moves: newMoves,
              },
              player_opponent: {
                ...gameState.player_opponent,
                ships: newShips,
              },
            };
          }

          playSound('storm', 0.8);
          return gameState;
        });
        resetTimer();
      });

      socketInstance.on('change_player_turn', (data: PlayerTurnDto) => {
        setGameState(gameState => {
          if (!gameState) return gameState;

          return {
            ...gameState,
            playerTurn: data.userId,
          };
        });

        if (gameState.room.gameMode === GameMode.EVENTS) {
          eventAlreadyHitTokenInstance.set(LocalStorageHit.NO_HIT);
        }
        if (
          gameState.room.gameMode === GameMode.EVENTS &&
          gameState.player_user.user.id === data.userId
        ) {
          setOpenEventDialog(true);
        }

        resetTimer();

        toast.info(
          `Now is ${data.userId === gameState.player_user.user.id ? "you'r " : 'opponent'} turn`
        );
      });

      socketInstance.on('sunk_ship', (data: SunkShipDto) => {
        setGameState(gameState => {
          if (!gameState) return gameState;

          const isPlayerMove = data.userId === gameState.player_user.user.id;
          const targetPlayerKey = isPlayerMove
            ? 'player_user'
            : 'player_opponent';
          const opponentPlayerKey = !isPlayerMove
            ? 'player_user'
            : 'player_opponent';

          const newMoves = [...data.moves];
          const newShips = [...gameState[opponentPlayerKey].ships, data.ship];

          return {
            ...gameState,
            [targetPlayerKey]: {
              ...gameState[targetPlayerKey],
              moves: newMoves,
            },
            [opponentPlayerKey]: {
              ...gameState[opponentPlayerKey],
              ships: newShips,
            },
          };
        });
        playSound('hit', 0.8);
        toast.info('Ship destroyed');
        resetTimer();
      });

      socketInstance.on('game_over', () => {
        queryClient.invalidateQueries({ queryKey: ['initial game state'] });
        queryClient.invalidateQueries({ queryKey: ['profile'] });
        toast.info('Congratulations, game over!');
        eventAlreadyHitTokenInstance.set(LocalStorageHit.HIT);
        stopTimer();
      });

      setSocket(socketInstance);
    };

    initializeSocket();

    return () => {
      socketInitializedRef.current = false;
    };
  }, [gameState, playSound, queryClient, resetTimer, socket, stopTimer]);

  async function setHighlightCellsRadarResult(cells: MoveType[]) {
    for (const cell of cells) {
      if (cell.result === MoveResult.HIT) {
        const cellInDocument = document.querySelector(
          `.cell-highlight[data-id="cell-${cell.x}-${cell.y}"]`
        ) as HTMLElement | null;
        if (cellInDocument) {
          cellInDocument.classList.add('animate-pulse');
          cellInDocument.classList.add('bg-muted');
        }
      }
    }

    setTimeout(() => {
      for (const cell of cells) {
        if (cell.result === MoveResult.HIT) {
          const cellInDocument = document.querySelector(
            `.cell-highlight[data-id="cell-${cell.x}-${cell.y}"]`
          ) as HTMLElement | null;
          if (cellInDocument) {
            cellInDocument.classList.remove('animate-pulse');
            cellInDocument.classList.remove('bg-muted');
          }
        }
      }
    }, 4000);
  }

  const handleFire = useCallback(
    (x: number, y: number) => {
      if (!socket) {
        toast.error('Connection error');
        return;
      }

      switch (selectedEvent) {
        case GameEvents.NO_EVENT:
          socket.emit('fire', {
            roomId: gameState?.room.id,
            x,
            y,
          });
          break;
        case GameEvents.BROKEN_WEAPON:
          socket.emit(GameEvents.BROKEN_WEAPON, {
            roomId: gameState?.room.id,
            x,
            y,
          });
          break;
        case GameEvents.MINE:
          socket.emit(GameEvents.MINE, {
            roomId: gameState?.room.id,
            x,
            y,
          });
          break;
        case GameEvents.ROCKET:
          socket.emit(GameEvents.ROCKET, {
            roomId: gameState?.room.id,
            x,
            y,
          });
          break;
        case GameEvents.SONAR:
          socket.emit(GameEvents.SONAR, {
            roomId: gameState?.room.id,
            x,
            y,
          });
          break;
        case GameEvents.STORM:
          socket.emit(GameEvents.STORM, {
            roomId: gameState?.room.id,
            x,
            y,
          });
          break;
        default:
          socket.emit('fire', {
            roomId: gameState?.room.id,
            x,
            y,
          });
      }

      eventTokenInstance.set('0');
      setSelectedEvent(null);
      eventAlreadyHitTokenInstance.set(LocalStorageHit.HIT);
    },
    [gameState?.room.id, selectedEvent, socket]
  );

  return (
    <GameSessionContext.Provider
      value={{
        socket,
        isConnected,
        gameState,
        selectedEvent,
        openEventDialog,
        timeLeft,
        isTimerActive,
        setSelectedEvent,
        setGameState,
        setOpenEventDialog,
        handleFire,
        handleFireTimeout,
      }}
    >
      {children}
    </GameSessionContext.Provider>
  );
};
