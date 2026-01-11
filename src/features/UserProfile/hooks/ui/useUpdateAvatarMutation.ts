import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

import { userService } from '../../services/ui/profile.service';

import { toastMessageHandler } from '@/src/shared/lib/toast-message-handler';

export function useUpdateAvatarMutation() {
  const queryClient = useQueryClient();

  const { mutate: updateAvatar, isPending: isLoading } = useMutation({
    mutationKey: ['update avatar'],
    mutationFn: (data: FormData) => userService.updateProfileAvatar(data),
    onSuccess() {
      toast.success('Profile avatar updated successfully.');
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
    onError(error: AxiosError) {
      toastMessageHandler(error.message);
    },
  });

  return { updateAvatar, isLoading };
}
