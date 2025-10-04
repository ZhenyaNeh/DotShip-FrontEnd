import { z } from 'zod';

export const SettingsSchema = z.object({
  name: z.string().min(1, {
    message: 'Enter name',
  }),
  email: z.email('Incorrect mail'),
  isTwoFactorEnabled: z.boolean(),
});

export type TypeSettingsSchema = z.infer<typeof SettingsSchema>;
