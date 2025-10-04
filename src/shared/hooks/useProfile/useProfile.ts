import { useQuery } from '@tanstack/react-query';

import { userService } from '@/src/widgets/User/services/ui/user.service';

export function useProfile() {
  const { data: user, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: () => userService.findProfile(),
  });

  return {
    user,
    isLoading,
  };
}
