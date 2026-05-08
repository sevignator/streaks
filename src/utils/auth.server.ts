import argon2 from 'argon2'
import { eq, DrizzleQueryError } from 'drizzle-orm'
import { DatabaseError } from 'pg'

import { db } from '#/db'
import * as schema from '#/db/schema'

const { users, passwordResetTokens } = schema

export async function getPasswordHash(password: string): Promise<string> {
  return await argon2.hash(password)
}

export async function checkPasswordHash(
  password: string,
  hash: string,
): Promise<boolean> {
  return await argon2.verify(hash, password)
}

export async function getPasswordResetTokenHash(
  token: string,
): Promise<string> {
  return await argon2.hash(token)
}

export async function checkPasswordResetTokenHash(
  token: string,
  hash: string,
): Promise<boolean> {
  return await argon2.verify(hash, token)
}

export async function updateUserPassword(
  userId: typeof users.id,
  password: string,
) {
  const passwordHash = await getPasswordHash(password)
  await db.update(users).set({ passwordHash }).where(eq(userId, users.id))
}

export async function createPasswordResetToken(userId: schema.User['id']) {
  const token = crypto.randomUUID()

  try {
    const tokenHash = await getPasswordResetTokenHash(token)
    await db.insert(passwordResetTokens).values({ tokenHash, userId })
  } catch (err) {
    if (
      err instanceof DrizzleQueryError &&
      err.cause instanceof DatabaseError
    ) {
      console.error(err.cause.detail)
    }
  }

  return token
}

export async function checkPasswordResetToken(
  token: Awaited<ReturnType<typeof createPasswordResetToken>>,
  hash: string,
) {
  return await argon2.verify(token, hash)
}
