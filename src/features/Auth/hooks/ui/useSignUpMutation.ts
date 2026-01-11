import { useMutation } from '@tanstack/react-query';

import { TypeSignUpSchema } from '../../schemas';
import { authService } from '../../services';

import { toastMessageHandler } from '@/src/shared/lib/toast-message-handler';

export const useSignUpMutation = () => {
  const { mutate: signUp, isPending: isLoadingSignUp } = useMutation({
    mutationKey: ['sign up user'],
    mutationFn: ({
      values,
      recaptcha,
    }: {
      values: TypeSignUpSchema;
      recaptcha: string;
    }) => authService.signUp(values, recaptcha),
    onSuccess(response) {
      toastMessageHandler(response.data.message);
    },
    onError(error) {
      toastMessageHandler(error.message);
    },
  });

  return { signUp, isLoadingSignUp };
};
