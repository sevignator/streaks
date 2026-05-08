import { Link } from '@tanstack/react-router'

interface Tab {
  text: string
  to: string
}

interface TabSelectorProps {
  tabs: Tab[]
}

export default function TabSelector({ tabs }: TabSelectorProps) {
  return (
    <div className="flex mb-18 max-w-fit bg-violet-200 rounded-full p-1.5 mx-auto font-medium">
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
  )
}
