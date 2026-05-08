import { eq, DrizzleQueryError } from 'drizzle-orm'
import { DatabaseError } from 'pg'
import { checkPasswordHash, getPasswordHash } from '#/utils/auth.server.ts'

import { db } from '#/db'
import * as schema from '#/db/schema'

const { users } = schema

export async function createUser(
  nickname: schema.NewUser['nickname'],
  email: schema.NewUser['email'],
  password: string,
) {
  const passwordHash = await getPasswordHash(password)

  try {
    await db.insert(users).values({ nickname, email, passwordHash })
  } catch (err) {
    if (
      err instanceof DrizzleQueryError &&
      err.cause instanceof DatabaseError
    ) {
      console.error(err.cause.detail)
    }
  }
}

export async function authenticateUser(email: string, password: string) {
  const user = await getUserByEmail(email)

  if (!user) {
    return null
  }

  const hasValidPassword = await checkPasswordHash(password, user.passwordHash)

  if (!hasValidPassword) {
    return null
  }

  return user
}

export async function getUserByEmail(email: schema.User['email']) {
  const query = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1)

  return query[0]
}

export async function getUserById(id: schema.User['id']) {
  const query = await db.select().from(users).where(eq(users.id, id)).limit(1)

  return query[0]
}
