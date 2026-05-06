import { createFileRoute, redirect } from '@tanstack/react-router'
import { getCurrentUserFn } from '#/utils/users.functions'

export const Route = createFileRoute('/')({
  beforeLoad: async () => {
    const user = await getCurrentUserFn()

    if (user) {
      throw redirect({
        to: '/dashboard',
      })
    }

    throw redirect({
      to: '/login',
    })
  },
})
