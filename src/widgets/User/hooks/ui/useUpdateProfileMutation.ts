import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

import { TypeSettingsSchema } from '../../schemas';
import { userService } from '../../services/ui/user.service';

import { toastMessageHandler } from '@/src/shared/lib/toast-message-handler';

export function useUpdateProfileMutation() {
  const { mutate: update, isPending: isLoadingUpdate } = useMutation({
    mutationKey: ['update profile'],
    mutationFn: (data: TypeSettingsSchema) => userService.updateProfile(data),
    onSuccess() {
      toast.success('Profile updated successfully.');
    },
    onError(error: AxiosError) {
      toastMessageHandler(error.message);
    },
  });

  return { update, isLoadingUpdate };
}
