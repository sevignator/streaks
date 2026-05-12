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
    <li className="p-3 bg-violet-100 rounded-md flex gap-4 justify-between">
      {title}

      <div>
        <Link to="/habits/$habitId" params={{ habitId: String(id) }}>
          Edit
        </Link>
      </div>
    </li>
  );
}
