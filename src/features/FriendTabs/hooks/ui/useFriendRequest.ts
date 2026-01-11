import { useQuery } from '@tanstack/react-query';

import { friendService } from '../../services';

export function useFriendsRequest() {
  const { data: friends, isLoading: isLoading } = useQuery({
    queryKey: ['friend request'],
    queryFn: () => friendService.getFriendsRequest(),
    select: data => data.data,
  });

  return {
    friends,
    isLoading,
  };
}
