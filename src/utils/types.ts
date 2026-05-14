import { type User } from '#/db/schema';

export interface AuthenticatedUser extends Omit<User, 'passwordHash'> {
  timezone: string;
}
