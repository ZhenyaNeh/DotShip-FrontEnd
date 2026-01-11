import { z } from 'zod';

export const RuleFormSchema = z.object({
  title: z.string().min(1, 'Rule title is required'),
  description: z.string().min(1, 'Rule description is required'),
  order: z.coerce.number<number>().min(0, 'Order must be a positive number'),
});

export type TypeRuleFormSchema = z.infer<typeof RuleFormSchema>;
