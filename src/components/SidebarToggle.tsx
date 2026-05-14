import clsx from 'clsx';

interface SidebarToggleProps {
  isOpen: boolean;
  toggleOpen: () => void;
}

export default function SidebarToggle({
  isOpen,
  toggleOpen,
}: SidebarToggleProps) {
  return (
    <button className="cursor-pointer p-2" onClick={toggleOpen}>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="aspect-square w-7 stroke-violet-900 dark:stroke-violet-200"
      >
        <path
          className={clsx(
            'transition-[d]',
            isOpen ? "[d:path('M4,19_L20,5')]" : "[d:path('M4,5_L20,5')]",
          )}
        />
        <path
          d="M4 19h16"
          className={clsx(
            'transition-[d]',
            isOpen ? "[d:path('M4,5_L20,19')]" : "[d:path('M4,12_L20,12')]",
          )}
        />
        <path
          d="M4 19h16"
          className={clsx(
            'transition-[d]',
            isOpen ? "[d:path('M4,5_L20,19')]" : "[d:path('M4,19_L20,19')]",
          )}
        />
      </svg>
    </button>
  );
}
