import { useMutation } from '@tanstack/react-query';

import { authService } from '../../services';

export const useSocialAuthMutation = () => {
  const { mutateAsync: socialAuth } = useMutation({
    mutationKey: ['oauth by provider'],
    mutationFn: async (provider: 'google' | 'yandex') =>
      await authService.oauthByProvider(provider),
  });
  return { socialAuth };
};
