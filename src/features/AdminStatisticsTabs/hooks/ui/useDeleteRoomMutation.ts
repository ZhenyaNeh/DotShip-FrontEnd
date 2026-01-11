import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { adminStatisticsService } from '../../services';

import { toastMessageHandler } from '@/src/shared/lib/toast-message-handler';
import { GameMode } from '@/src/shared/lib/types';

export function useDeleteRoomMutation() {
  const queryClient = useQueryClient();
  const { mutate: deleteActiveRoom, isPending: isLoading } = useMutation({
    mutationKey: ['delete active room'],
    mutationFn: ({ roomId, type }: { roomId: string; type: GameMode }) =>
      adminStatisticsService.deleteRoom(roomId, type),
    onSuccess() {
      toast.success('Room deleted successfully ', {
        description: 'The room has been removed from the system.',
      });
      queryClient.invalidateQueries({ queryKey: ['get active games'] });
    },
    onError(error) {
      toastMessageHandler(error.message);
    },
  });

  return { deleteActiveRoom, isLoading };
}
