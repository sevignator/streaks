import {
  Link,
  type RegisteredRouter,
  type ValidateLinkOptions,
} from '@tanstack/react-router';
import clsx from 'clsx';

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
      className="flex items-center gap-2.5 rounded-l-full px-4 py-3 font-semibold"
      activeProps={{
        className: clsx('bg-slate-50 text-(--clr-accent)  dark:bg-slate-950'),
      }}
    >
      <span className="w-5">{icon}</span>
      <span>{text}</span>
    </Link>
  );
}
