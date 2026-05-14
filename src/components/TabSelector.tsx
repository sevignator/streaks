import { Link } from '@tanstack/react-router';

interface Tab {
  text: string;
  to: string;
}

interface TabSelectorProps {
  tabs: Tab[];
}

export default function TabSelector({ tabs }: TabSelectorProps) {
  return (
    <div className="mx-auto mb-18 flex max-w-fit rounded-full border border-slate-300 bg-slate-50 p-1.5 font-medium dark:border-slate-600 dark:bg-slate-900">
      {tabs.map((tab) => (
        <Link
          key={tab.to}
          to={tab.to}
          className="rounded-full px-5 py-2"
          activeProps={{
            className: 'bg-(--clr-btn-primary) text-white',
          }}
        >
          {tab.text}
        </Link>
      ))}
    </div>
  );
}
