import { z } from 'zod';

export const ResetPasswordSchema = z.object({
  email: z.email('Incorrect mail'),
});

export type TypeResetPasswordSchema = z.infer<typeof ResetPasswordSchema>;
