import { Socket } from 'socket.io-client';

export type NotificationContextType = {
  socket: Socket | null;
  isConnected: boolean;
  handleSendFriendRequest: (receiverId: string) => void;
  handleAcceptFriendRequest: (receiverId: string) => void;
  handleRejectFriendRequest: (receiverId: string) => void;
  handleRemoveFriendRequest: (receiverId: string) => void;
  handleInviteFriendRequest: (receiverId: string, gameId: string) => void;
  handleInviteFriendExpire: (receiverId: string) => void;
};
