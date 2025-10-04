import { useMutation } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';

import { TypeNewPasswordSchema } from '../../schemas';
import { passwordRecoveryService } from '../../services';

import { toastMessageHandler } from '@/src/shared/lib/toast-message-handler';

export function useNewPasswordMutation() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get('token');

  const { mutate: newPassword, isPending: isLoadingNew } = useMutation({
    mutationKey: ['new password'],
    mutationFn: ({
      values,
      recaptcha,
    }: {
      values: TypeNewPasswordSchema;
      recaptcha: string;
    }) => passwordRecoveryService.new(values, token, recaptcha),
    onSuccess() {
      toast.success('Password successfully changed', {
        description: 'You can now log in to your account.',
      });
      router.push('/dashboard/settings');
    },
    onError(error) {
      toastMessageHandler(error.message);
    },
  });

  return { newPassword, isLoadingNew };
}
