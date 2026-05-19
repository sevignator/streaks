import { type AuthenticatedUser } from '#/utils/types';
import { Link } from '@tanstack/react-router';
import clsx from 'clsx';

interface UserCardProps extends React.ComponentPropsWithoutRef<'a'> {
  user: AuthenticatedUser;
}

export default function UserCard({ user, ...delegated }: UserCardProps) {
  return (
    <Link
      to="/user"
      {...delegated}
      className={clsx(
        delegated.className,
        'flex items-center gap-2 rounded-full border border-slate-200 p-1 dark:border-slate-800 dark:bg-[rgb(0_0_0/0.2)]',
      )}
    >
      <img
        src={user.imageUrl}
        alt=""
        className="block h-12 w-12 rounded-full"
      />

      <div>
        <p className="mb-1 text-lg leading-none font-medium text-(--clr-accent)">
          {user.nickname}
        </p>
        <p className="text-sm leading-none dark:text-slate-400">{user.email}</p>
      </div>
    </Link>
  );
}
