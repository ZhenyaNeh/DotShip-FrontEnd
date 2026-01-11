import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

import { TypeGameFormSchema } from '../../schemas';
import { gameService } from '../../services';

import { toastMessageHandler } from '@/src/shared/lib/toast-message-handler';

export function useCreateGameMutation() {
  const queryClient = useQueryClient();

  const { mutate: create, isPending: isLoading } = useMutation({
    mutationKey: ['create game'],
    mutationFn: (data: TypeGameFormSchema) => gameService.createGame(data),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['games'] });
      toast.success('Game added successfully.');
    },
    onError(error: AxiosError) {
      toastMessageHandler(error.message);
    },
  });

  return { create, isLoading };
}
