import { IUser } from '@/src/features/Auth/types';
import { FriendRequestStatus } from '@/src/shared/lib/types';

export interface FriendRequest {
  requestId: string;
  status: FriendRequestStatus;
  receivedAt: string;
  user: IUser;
}
