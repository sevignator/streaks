import { useSession } from '@tanstack/react-start/server'

import { type User } from '#/db/schema.ts'

interface SessionData {
  userId?: User['id']
  email?: User['email']
}

export function useAppSession() {
  const sessionPassword = process.env.SESSION_SECRET

  if (!sessionPassword) {
    throw new Error(
      'Missing SESSION_SECRET. Set it in your environment before using sessions.',
    )
  }

  return useSession<SessionData>({
    name: 'app-session',
    password: sessionPassword,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      httpOnly: true,
    },
  })
}
