import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

import { gameService } from '../../services';

import { toastMessageHandler } from '@/src/shared/lib/toast-message-handler';

export function useUpdateGamePhotoMutation() {
  const queryClient = useQueryClient();

  const { mutate: updateGamePhoto, isPending: isLoading } = useMutation({
    mutationKey: ['update game photo'],
    mutationFn: ({ gameId, body }: { gameId: string; body: FormData }) =>
      gameService.updateGamePhoto(gameId, body),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['games'] });
      toast.success('Game photo uploaded successfully.');
    },
    onError(error: AxiosError) {
      toastMessageHandler(error.message);
    },
  });

  return { updateGamePhoto, isLoading };
}
