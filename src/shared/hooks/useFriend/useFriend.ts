import { useQuery } from '@tanstack/react-query';

import { friendService } from '../../../features/FriendTabs/services';

export function useFriends(userId: string) {
  const { data: friends, isLoading } = useQuery({
    queryKey: ['friend', userId],
    queryFn: () => friendService.getFriends(userId),
    enabled: !!userId,
    select: data => data.data,
  });

  return {
    friends,
    isLoading,
  };
}
