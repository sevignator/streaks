import {
  Link,
  type RegisteredRouter,
  type ValidateLinkOptions,
} from '@tanstack/react-router'

type LinkOptions<
  TRouter extends RegisteredRouter = RegisteredRouter,
  TOptions = unknown,
> = ValidateLinkOptions<TRouter, TOptions>

interface NavLinkProps {
  text: string
  to: LinkOptions['to']
}

export default function NavLink({ text, to }: NavLinkProps) {
  return (
    <Link
      to={to}
      className="px-4 py-3 font-semibold rounded-full"
      activeProps={{ className: 'bg-white text-[var(--clr-accent)]' }}
    >
      {text}
    </Link>
  )
}
