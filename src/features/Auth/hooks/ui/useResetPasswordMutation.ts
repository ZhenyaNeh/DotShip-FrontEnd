import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { TypeResetPasswordSchema } from '../../schemas';
import { passwordRecoveryService } from '../../services';

import { toastMessageHandler } from '@/src/shared/lib/toast-message-handler';

export function useResetPasswordMutation() {
  const { mutate: reset, isPending: isLoadingReset } = useMutation({
    mutationKey: ['reset password'],
    mutationFn: ({
      values,
      recaptcha,
    }: {
      values: TypeResetPasswordSchema;
      recaptcha: string;
    }) => passwordRecoveryService.reset(values, recaptcha),
    onSuccess() {
      toast.success('Check your email', {
        description: 'A confirmation link has been sent to your email.',
      });
    },
    onError(error) {
      toastMessageHandler(error.message);
    },
  });

  return { reset, isLoadingReset };
}
