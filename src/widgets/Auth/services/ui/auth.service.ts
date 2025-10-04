import { TypeSignInSchema, TypeSignUpSchema } from '../../schemas';
import { IUser } from '../../types';

import { api } from '@/src/shared/api';

class AuthService {
  public async signUp(body: TypeSignUpSchema, recaptcha?: string) {
    const headers = recaptcha ? { recaptcha } : undefined;
    const response = await api.post<IUser>('auth/register', body, { headers });
    return response;
  }

  public async signIn(body: TypeSignInSchema, recaptcha?: string) {
    const headers = recaptcha ? { recaptcha } : undefined;
    const response = await api.post<IUser>('auth/login', body, { headers });
    console.log(response);
    return response;
  }

  public async oauthByProvider(provider: 'google' | 'yandex') {
    const response = await api.get<{ url: string }>(
      `auth/oauth/connect/${provider}`
    );
    return response;
  }

  public async logout() {
    const response = await api.post('auth/logout');
    return response;
  }
}

export const authService = new AuthService();
