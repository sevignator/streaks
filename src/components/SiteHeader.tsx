import SidebarToggle from '#/components/SidebarToggle';
import Logo from '#/components/Logo';

interface SiteHeaderProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

export default function SiteHeader({
  isMenuOpen,
  toggleMenu,
}: SiteHeaderProps) {
  return (
    <header className="flex items-center justify-between gap-3 border-b border-(--clr-bg-tertiary) bg-(--clr-bg-secondary) p-1 pl-4">
      <Logo size="1.5rem" />

      <SidebarToggle isOpen={isMenuOpen} toggleOpen={toggleMenu} />
    </header>
  );
}
