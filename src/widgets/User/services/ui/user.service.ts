import { TypeSettingsSchema } from '../../schemas';

import { api } from '@/src/shared/api';
import { IUser } from '@/src/widgets/Auth/types';

class UserService {
  public async findProfile() {
    const response = await api.get<IUser>('users/profile');

    return response;
  }

  public async updateProfile(body: TypeSettingsSchema) {
    const response = await api.patch<IUser>('users/profile', body);

    return response;
  }
}

export const userService = new UserService();
