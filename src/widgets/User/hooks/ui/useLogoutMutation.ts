import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { toastMessageHandler } from '@/src/shared/lib/toast-message-handler';
import { authService } from '@/src/widgets/Auth/services';

export function useLogoutMutation() {
  const router = useRouter();

  const { mutate: logout, isPending: isLoadingLogout } = useMutation({
    mutationKey: ['logout'],
    mutationFn: () => authService.logout(),
    onSuccess() {
      toast.success('You have successfully logged out.');
      router.push('/auth/sign-in');
    },
    onError(error: AxiosError) {
      toastMessageHandler(error.message);
    },
  });

  return { logout, isLoadingLogout };
}
