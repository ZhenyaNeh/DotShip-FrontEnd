import { Friend } from '../types';
import { FriendRequest } from '../types/ui/friend-request.types';

import { api } from '@/src/shared/api';

class FriendService {
  public async getFriends(userId: string) {
    const response = await api.get<FriendRequest[]>(`friend/${userId}`);

    return response;
  }

  public async getFriendsRequest() {
    const response = await api.get<FriendRequest[]>('friend/request');

    return response;
  }

  public async getFriendsBySearch(search: string) {
    const response = await api.get<Friend[]>(`friend/search/${search}`);

    return response;
  }
}

export const friendService = new FriendService();
