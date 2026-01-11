import { z } from 'zod';

import { RuleFormSchema } from './rule.schema';
import { Difficulty, GameMode } from '@/src/shared/lib/types';

export const GameFormSchema = z
  .object({
    displayName: z.string().min(1, 'Game name is required'),
    picture: z.string().optional(),
    minPlayers: z.coerce
      .number<number>()
      .min(1, 'Minimum number of players is 1'),
    maxPlayers: z.coerce
      .number<number>()
      .min(1, 'Maximum number of players is 1'),
    description: z.string().optional(),
    isVisible: z.boolean().default(true).optional(),
    gameMode: z.enum(GameMode),
    difficulty: z.enum(Difficulty),
    estimatedTime: z.coerce
      .number<number>()
      .min(1, 'Time must be a positive number'),
    rules: z.array(RuleFormSchema).min(1, 'Add at least one rule'),
  })
  .refine(data => data.maxPlayers >= data.minPlayers, {
    message:
      'The maximum number of players must be greater than or equal to the minimum',
    path: ['maxPlayers'],
  });

export type TypeGameFormSchema = z.infer<typeof GameFormSchema>;
