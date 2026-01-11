'use client';

import { useQuery } from '@tanstack/react-query';

import { userService } from '@/src/features/UserProfile/services/ui/profile.service';

export function useProfile() {
  const { data: user, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: () => userService.findProfile(),
    select: data => data.data,
  });

  return {
    user,
    isLoading,
  };
}
