import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction } from 'react';
import { toast } from 'sonner';

import { TypeSignInSchema } from '../../schemas';
import { authService } from '../../services';

import { toastMessageHandler } from '@/src/shared/lib/toast-message-handler';

export function useSignInMutation(
  setIsShowFactor: Dispatch<SetStateAction<boolean>>
) {
  const router = useRouter();

  const { mutate: signIn, isPending: isLoadingSignIn } = useMutation({
    mutationKey: ['sign in user'],
    mutationFn: ({
      values,
      recaptcha,
    }: {
      values: TypeSignInSchema;
      recaptcha: string;
    }) => authService.signIn(values, recaptcha),
    onSuccess(response) {
      if (response.data.message) {
        toastMessageHandler(response.data.message);
        setIsShowFactor(true);
      } else {
        toast.success('Successful authorization');
        router.push('/dashboard/settings');
      }
    },
    onError(error: AxiosError<{ message: string }>) {
      if (error.response?.data.message) {
        console.log(error.response.data);
        toastMessageHandler(error.response.data.message);
      }
    },
  });

  return { signIn, isLoadingSignIn };
}
