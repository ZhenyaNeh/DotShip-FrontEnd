import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

import { TypeGameFormSchema } from '../../schemas';
import { gameService } from '../../services';

import { toastMessageHandler } from '@/src/shared/lib/toast-message-handler';

export function useUpdateGameMutation() {
  const queryClient = useQueryClient();

  const { mutate: update, isPending: isLoading } = useMutation({
    mutationKey: ['update game'],
    mutationFn: ({
      gameId,
      data,
    }: {
      gameId: string;
      data: TypeGameFormSchema;
    }) => gameService.updateGame(gameId, data),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['games'] });
      toast.success('Game updated successfully.');
    },
    onError(error: AxiosError) {
      toastMessageHandler(error.message);
    },
  });

  return { update, isLoading };
}
