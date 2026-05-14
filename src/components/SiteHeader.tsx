import SidebarToggle from '#/components/SidebarToggle';
import Logo from '#/components/Logo';
import ThemeToggle from '#/components/ThemeToggle';

interface SiteHeaderProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

export default function SiteHeader({
  isMenuOpen,
  toggleMenu,
}: SiteHeaderProps) {
  return (
    <header className="flex items-center justify-between gap-3 px-6 py-4">
      <Logo size="1.5rem" />

      <div className="flex items-center gap-8">
        <ThemeToggle />
        <SidebarToggle isOpen={isMenuOpen} toggleOpen={toggleMenu} />
      </div>
    </header>
  );
}
