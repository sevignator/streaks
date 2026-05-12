import {
  Link,
  type RegisteredRouter,
  type ValidateLinkOptions,
} from '@tanstack/react-router';

type LinkOptions<
  TRouter extends RegisteredRouter = RegisteredRouter,
  TOptions = unknown,
> = ValidateLinkOptions<TRouter, TOptions>;

interface NavLinkProps {
  icon: React.ReactNode;
  text: string;
  to: LinkOptions['to'];
}

export default function NavLink({ icon, text, to }: NavLinkProps) {
  return (
    <Link
      to={to}
      className="px-4 py-3 font-semibold rounded-full flex items-center gap-2.5"
      activeProps={{ className: 'bg-white text-[var(--clr-accent)]' }}
    >
      <span className="w-5">{icon}</span>
      <span>{text}</span>
    </Link>
  );
}
