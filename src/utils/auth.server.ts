import { createHmac, randomBytes } from 'node:crypto';
import argon2 from 'argon2';
import { eq, DrizzleQueryError } from 'drizzle-orm';
import { DatabaseError } from 'pg';

import { env } from '../env';
import { db } from '#/db';
import * as schema from '#/db/schema';

const { users, passwordResetTokens } = schema;

export async function getPasswordHash(password: string): Promise<string> {
  return await argon2.hash(password);
}

export async function checkPasswordHash(
  password: string,
  hash: string,
): Promise<boolean> {
  return await argon2.verify(hash, password);
}

export function getPasswordResetTokenHash(token: string): string {
  return createHmac('sha256', env.RESET_TOKEN_SECRET)
    .update(token)
    .digest('hex');
}

export function checkPasswordResetTokens(tokenA: string, tokenB: string) {
  const tokenHashA = getPasswordResetTokenHash(tokenA);
  const tokenHashB = getPasswordResetTokenHash(tokenB);
  return tokenHashA === tokenHashB;
}

export async function createPasswordResetToken(
  userId: schema.User['id'],
): Promise<string> {
  const token = randomBytes(32).toString('base64url');

  try {
    const tokenHash = getPasswordResetTokenHash(token);
    await db.insert(passwordResetTokens).values({ tokenHash, userId });
  } catch (err) {
    if (
      err instanceof DrizzleQueryError &&
      err.cause instanceof DatabaseError
    ) {
      console.error(err.cause.detail);
    }
  }

  return token;
}

export async function updateUserPassword(
  userId: schema.User['id'],
  password: string,
) {
  const passwordHash = await getPasswordHash(password);
  await db.update(users).set({ passwordHash }).where(eq(users.id, userId));
}

export async function getPasswordResetTokenByHash(
  tokenHash: string,
): Promise<schema.PasswordResetToken | undefined> {
  const query = await db
    .select()
    .from(passwordResetTokens)
    .where(eq(passwordResetTokens.tokenHash, tokenHash))
    .limit(1);

  return query[0];
}

export async function redeemPasswordResetToken(token: string) {
  const tokenHash = getPasswordResetTokenHash(token);
  const tokenRecord = await getPasswordResetTokenByHash(tokenHash);

  if (!tokenRecord) return;

  await db
    .update(passwordResetTokens)
    .set({ isRedeemed: true })
    .where(eq(passwordResetTokens.tokenHash, tokenHash));
}
