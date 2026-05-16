import { type AuthenticatedUser } from '#/utils/types';

export interface RouterContext {
  user: AuthenticatedUser | null;
}

export const context = {
  user: null,
};
