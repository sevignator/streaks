import { type AuthenticatedUser } from '#/utils/types';
import { type Habit, type Completion } from '#/db/schema';

export interface RouterContext {
  user: AuthenticatedUser | null;
  habits: Habit[];
  completions: Completion[];
}

export const context: RouterContext = {
  user: null,
  habits: [],
  completions: [],
};
