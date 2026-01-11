import { Socket } from 'socket.io-client';

import { ShipType } from '@/src/shared/lib/types';

export type MatchmakingContextType = {
  socket: Socket | null;
  isConnected: boolean;
  isSearching: boolean;
  gameWithFriendId: string | null;
  ships: ShipType[];
  handleSearch: () => void;
  handleReady: () => void;
  handleCancelSearch: () => void;
  handleCancelReady: () => void;
};
