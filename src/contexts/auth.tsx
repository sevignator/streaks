import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import { useServerFn } from '@tanstack/react-start'

import { type User } from '#/db/schema'
import { getCurrentUserFn } from '#/utils/users.functions'

type UserWithoutPassword = Omit<User, 'passwordHash'>

interface AuthContextType {
  user: UserWithoutPassword | null
  fetchUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const getCurrentUser = useServerFn(getCurrentUserFn)
  const [user, setUser] = useState<UserWithoutPassword | null>(null)

  const fetchUser = useCallback(async () => {
    try {
      const currentUser = await getCurrentUser()

      if (currentUser) {
        const { passwordHash, ...nextUser } = currentUser
        setUser(nextUser)
      }
    } catch (error) {
      console.error('Failed to fetch current user', error)
      setUser(null)
    }
  }, [])

  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <AuthContext.Provider value={{ user, fetchUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
