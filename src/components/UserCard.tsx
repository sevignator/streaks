import { type AuthenticatedUser } from '#/utils/types';
import { Link } from '@tanstack/react-router';

interface UserCardProps {
  user: AuthenticatedUser;
}

export default function UserCard({ user }: UserCardProps) {
  return (
    <Link
      to="/user"
      className="mr-8 flex items-center gap-2 rounded-full border border-slate-200 bg-(--clr-bg-secondary) p-1 dark:border-slate-700"
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
