export enum GameMode {
  CLASSIC = 'CLASSIC',
  EVENTS = 'EVENTS',
  BATTLE_ROYAL = 'BATTLE_ROYAL',
}

export enum Difficulty {
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD',
}

export interface IGame {
  id: string;
  displayName: string;
  picture?: string;
  minPlayers: number;
  maxPlayers: number;
  description?: string;
  isVisible: boolean;
  gameMode: GameMode;
  difficulty: Difficulty;
  estimatedTime: number;
  rules: IRule[];
  createdAt: string;
  updatedAt: string;
}

export interface IRule {
  title: string;
  description: string;
  order: number;
}

export interface GameWithRules extends IGame {
  rules: IRule[];
}

export interface GameFilters {
  gameMode?: IGame['gameMode'];
  difficulty?: IGame['difficulty'];
  search?: string;
}

export interface CreateGameDto {
  displayName: string;
  picture?: string;
  minPlayers: number;
  maxPlayers: number;
  description?: string;
  isVisible: boolean;
  gameMode: GameMode;
  difficulty: Difficulty;
  estimatedTime: number;
}

export type UpdateGameDto = Partial<CreateGameDto>;
