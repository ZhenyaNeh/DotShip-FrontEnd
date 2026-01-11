import { z } from 'zod';

export const SignUpSchema = z
  .object({
    name: z.string().min(1, 'Enter name'),
    email: z.email('Incorrect mail'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    passwordRepeat: z
      .string()
      .min(6, 'Password repeat must be at least 6 characters long'),
  })
  .refine(data => data.password === data.passwordRepeat, {
    error: 'Passwords do not match',
    path: ['passwordRepeat'],
  });

export type TypeSignUpSchema = z.infer<typeof SignUpSchema>;
