import { Link } from '@tanstack/react-router';

import { type Habit } from '#/db/schema';

interface HabitsListProps {
  habits: Habit[];
}

interface HabitListItemProps {
  habit: Habit;
}

export default function HabitsList({ habits }: HabitsListProps) {
  return (
    <ul className="flex flex-col gap-2">
      {habits.map((habit) => (
        <HabitListItem key={habit.id} habit={habit} />
      ))}
    </ul>
  );
}

function HabitListItem({ habit }: HabitListItemProps) {
  const { id, title } = habit;

  return (
    <li className="flex justify-between gap-4 rounded-md border border-slate-200 bg-slate-50 p-3 text-slate-950 dark:border-slate-900 dark:bg-slate-700 dark:text-slate-50">
      {title}

      <div>
        <Link to="/habits/$habitId" params={{ habitId: String(id) }}>
          Edit
        </Link>
      </div>
    </li>
  );
}
