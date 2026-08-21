import Logo from '#/components/Logo';
import SidebarToggle from '#/components/SidebarToggle';
import ThemeToggle from '#/components/ThemeToggle';
import { Link } from '@tanstack/react-router';

interface SiteHeaderProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

export default function Navbar({ isMenuOpen, toggleMenu }: SiteHeaderProps) {
  return (
    <header className="mb-2 flex items-center justify-between gap-3 px-4 py-4">
      <Link to="/">
        <Logo size="2rem" />
      </Link>

      <div className="flex items-center gap-3">
        <ThemeToggle />
        <SidebarToggle isOpen={isMenuOpen} toggleOpen={toggleMenu} />
      </div>
    </header>
  );
}
