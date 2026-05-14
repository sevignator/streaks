import SidebarToggle from "#/components/SidebarToggle";

interface SiteHeaderProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

export default function SiteHeader({
  isMenuOpen,
  toggleMenu,
}: SiteHeaderProps) {
  return (
    <header className="flex items-center justify-between gap-3 border-b border-(--clr-bg-tertiary) p-1 pl-4 bg-(--clr-bg-secondary)">
      <div className="text-2xl font-bold text-violet-950 dark:text-violet-200">
        Streaks
      </div>

      <SidebarToggle isOpen={isMenuOpen} toggleOpen={toggleMenu} />
    </header>
  );
}
