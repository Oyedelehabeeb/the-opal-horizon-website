import Link from "next/link";
import { auth } from "../_lib/auth";

export default async function Navigation() {
  const session = await auth();
  return (
    <nav className="z-10 text-base sm:text-lg md:text-xl">
      <ul className="flex flex-col sm:flex-row gap-4 sm:gap-8 md:gap-16 items-center">
        <li className="w-full sm:w-auto text-center sm:text-left">
          <Link
            href="/cabins"
            className="block sm:inline hover:text-accent-400 transition-colors"
          >
            Cabins
          </Link>
        </li>
        <li className="w-full sm:w-auto text-center sm:text-left">
          <Link
            href="/about"
            className="block sm:inline hover:text-accent-400 transition-colors"
          >
            About
          </Link>
        </li>
        <li className="w-full sm:w-auto text-center sm:text-left">
          {session?.user?.image ? (
            <Link
              href="/account"
              className="block sm:inline hover:text-accent-400 transition-colors flex flex-col sm:flex-row items-center gap-2 sm:gap-4"
            >
              <img
                className="h-8 w-8 rounded-full mx-auto sm:mx-0"
                src={session?.user?.image}
                alt={session?.user?.name}
                referrerPolicy="no-referrer"
              />
              <span className="mt-1 sm:mt-0">Guest area</span>
            </Link>
          ) : (
            <Link
              href="/account"
              className="block sm:inline hover:text-accent-400 transition-colors"
            >
              Guest area
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
