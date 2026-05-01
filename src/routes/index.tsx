import { createFileRoute, redirect } from '@tanstack/react-router'
import { LoginForm } from '#/components/LoginForm'
import { SignupForm } from '#/components/SignupForm'
import { getCurrentUserFn } from '#/utils/users.functions'

export const Route = createFileRoute('/')({
  component: App,
  beforeLoad: async () => {
    const user = await getCurrentUserFn()

    if (user) {
      throw redirect({
        to: '/dashboard'
      })
    }
  }
});

function App() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-5xl mt-12 mb-12 font-bold text-center">Streaks</h1>

      <div className="flex flex-col gap-6">
        <details
          name="accordion-group"
          className="border-slate-200 border-2 rounded-2xl overflow-clip"
          open
        >
          <summary className="bg-slate-200 p-4 text-xl cursor-pointer">
            Log in
          </summary>

          <div className="p-4">
            <LoginForm />
          </div>
        </details>

        <details
          name="accordion-group"
          className="border-slate-200 border-2 rounded-2xl overflow-clip"
        >
          <summary className="bg-slate-200 p-4 text-xl cursor-pointer">
            Sign up
          </summary>

          <div className="p-4">
            <SignupForm />
          </div>
        </details>
      </div>
    </div>
  )
}
