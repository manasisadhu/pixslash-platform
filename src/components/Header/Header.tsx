import Image from "next/image";
import Link from "next/link";
import ThemeToggleButton from "../Buttons/ThemeToggleButton";

const Header = () => {
  return (
    <header
      className="sticky top-0 z-50 border-b shadow backdrop-blur-lg"
      aria-label="app-header">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <Link href={"/"}>
          <Image
            src="/logo.png"
            height={100}
            width={100}
            alt="App-Logo"
            priority
            className="h-8 w-full"
          />
        </Link>

        <nav className="flex items-center gap-4">
          <Link href={"/login"}>Login</Link>
          <Link href={"/register"}>Register</Link>

          <ThemeToggleButton />
        </nav>
      </div>
    </header>
  );
};

export default Header;
