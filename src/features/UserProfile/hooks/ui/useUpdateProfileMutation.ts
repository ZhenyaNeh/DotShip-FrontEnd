import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

import { TypeSettingsSchema } from '../../schemas';
import { userService } from '../../services/ui/profile.service';

import { toastMessageHandler } from '@/src/shared/lib/toast-message-handler';

export function useUpdateProfileMutation() {
  const queryClient = useQueryClient();

  const { mutate: update, isPending: isLoading } = useMutation({
    mutationKey: ['update profile'],
    mutationFn: (data: TypeSettingsSchema) => userService.updateProfile(data),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      toast.success('Profile updated successfully.');
    },
    onError(error: AxiosError) {
      toastMessageHandler(error.message);
    },
  });

  return { update, isLoading };
}
