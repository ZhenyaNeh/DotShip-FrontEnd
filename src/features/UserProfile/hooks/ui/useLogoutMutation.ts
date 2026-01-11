import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { authService } from '@/src/features/Auth/services';
import { toastMessageHandler } from '@/src/shared/lib/toast-message-handler';

export function useLogoutMutation() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: logout, isPending: isLoadingLogout } = useMutation({
    mutationKey: ['logout'],
    mutationFn: () => authService.logout(),
    onSuccess() {
      queryClient.removeQueries({ queryKey: ['profile'] });
      toast.success('You have successfully logged out.');
      router.push('/auth/sign-in');
      router.refresh();
    },
    onError(error: AxiosError) {
      toastMessageHandler(error.message);
    },
  });

  return { logout, isLoadingLogout };
}
