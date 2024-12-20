import Navigation from "@/app/_components/Navigation";
import Logo from "@/app/_components/Logo";

function Header() {
  return (
    <header className="border-b border-primary-900 px-4 sm:px-8 py-3 sm:py-5">
      <div className="flex flex-col sm:flex-row justify-between items-center max-w-7xl mx-auto gap-4 sm:gap-0 sm:space-x-8">
        <Logo />
        <Navigation />
      </div>
    </header>
  );
}

export default Header;
