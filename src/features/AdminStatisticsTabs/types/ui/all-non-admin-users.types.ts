import { UserRole } from '@/src/features/Auth/types';

export interface AllNonAdminUsers {
  id: string;
  email: string;
  displayName: string;
  picture: string;
  role: UserRole;
  rating: number;
}
