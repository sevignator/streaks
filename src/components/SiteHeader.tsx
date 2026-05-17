import Logo from "#/components/Logo";
import SidebarToggle from "#/components/SidebarToggle";
import ThemeToggle from "#/components/ThemeToggle";

interface SiteHeaderProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

export default function SiteHeader({
  isMenuOpen,
  toggleMenu,
}: SiteHeaderProps) {
  return (
    <header className="flex items-center justify-between gap-3 px-4 py-4">
      <Logo size="2rem" />

      <div className="flex items-center gap-3">
        <ThemeToggle />
        <SidebarToggle isOpen={isMenuOpen} toggleOpen={toggleMenu} />
      </div>
    </header>
  );
}
