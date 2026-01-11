import { TypeSettingsSchema } from '../../schemas';

import { IUser } from '@/src/features/Auth/types';
import { api } from '@/src/shared/api';

class UserService {
  public async findProfile() {
    const response = await api.get<IUser>('users/profile');

    return response;
  }

  public async updateProfile(body: TypeSettingsSchema) {
    const response = await api.patch<IUser>('users/profile', body);

    return response;
  }

  public async updateProfileAvatar(body: FormData) {
    const response = await api.patch<IUser>('users/avatar/upload', body, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response;
  }
}

export const userService = new UserService();
