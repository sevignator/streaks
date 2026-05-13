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
    <div className="mx-auto mb-18 flex max-w-fit rounded-full bg-violet-200 p-1.5 font-medium">
      {tabs.map((tab) => (
        <Link
          key={tab.to}
          to={tab.to}
          className="px-5 py-2"
          activeProps={{
            className: 'bg-violet-500 text-white rounded-full',
          }}
        >
          {tab.text}
        </Link>
      ))}
    </div>
  );
}
