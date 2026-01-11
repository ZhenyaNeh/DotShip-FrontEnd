import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

import { gameService } from '../../services';

import { toastMessageHandler } from '@/src/shared/lib/toast-message-handler';

export function useDeleteGameMutation() {
  const queryClient = useQueryClient();

  const { mutate: deleteGame, isPending: isLoading } = useMutation({
    mutationKey: ['delete game'],
    mutationFn: (gameId: string) => gameService.deleteGame(gameId),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['games'] });
      toast.success('Game deleted successfully.');
    },
    onError(error: AxiosError) {
      toastMessageHandler(error.message);
    },
  });

  return { deleteGame, isLoading };
}
