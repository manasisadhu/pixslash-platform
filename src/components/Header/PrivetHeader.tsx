import Link from "next/link";
import LogoutButton from "../Buttons/LogoutButton";
import ThemeToggleButton from "../Buttons/ThemeToggleButton";

const PrivetHeader = () => {
  return (
    <header
      className="sticky top-0 z-50 border-b shadow"
      aria-label="app-header">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <Link href={"/"}>
          <h1
            className="text-2xl font-semibold"
            aria-label="App Name">
            PixSlash
          </h1>
        </Link>

        <nav className="flex items-center gap-4">
          <LogoutButton />

          <ThemeToggleButton />
        </nav>
      </div>
    </header>
  );
};

export default PrivetHeader;
