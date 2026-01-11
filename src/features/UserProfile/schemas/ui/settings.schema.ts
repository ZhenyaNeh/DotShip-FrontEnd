import { z } from 'zod';

export const SettingsSchema = z.object({
  name: z.string().min(1, 'Name must be at least 2 characters'),
  email: z.email('Invalid email address'),
  isTwoFactorEnable: z.boolean(),
});

export type TypeSettingsSchema = z.infer<typeof SettingsSchema>;
