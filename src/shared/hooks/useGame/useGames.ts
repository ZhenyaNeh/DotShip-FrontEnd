import { useQuery } from '@tanstack/react-query';

import { gameService } from '../../../widgets/GamesCatalog/services';

export function useGames(isAdminUser: boolean = false) {
  const {
    data: games,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['games', isAdminUser],
    queryFn: () => gameService.getGames(isAdminUser),
    select: data => data.data,
  });

  return { games, isLoading, error };
}
