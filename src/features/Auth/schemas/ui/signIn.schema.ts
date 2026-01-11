import { z } from 'zod';

export const SignInSchema = z.object({
  email: z.email('Incorrect mail'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  code: z.optional(z.string()),
});

export type TypeSignInSchema = z.infer<typeof SignInSchema>;
