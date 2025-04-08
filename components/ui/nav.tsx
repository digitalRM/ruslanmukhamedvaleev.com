import {
  Blocks,
  Contact,
  Home,
  LayoutList,
  List,
  Mail,
  SquareArrowUpRightIcon,
} from "lucide-react";
import Link from "next/link";

const Nav = () => {
  return (
    <nav className="w-full flex justify-between items-center py-6 px-4 md:px-8">
      <div>
        <Link
          href="/"
          className="text-black font-medium text-xl tracking-tight"
        >
          Ruslan Mukhamedvaleev
        </Link>
      </div>

      <div className="flex sm:space-x-6 tracking-tight">
        <div className="flex flex-col gap-y-3 sm:flex-row items-center sm:space-x-1 tracking-tight">
          <Link
            href="/"
            className="border border-black px-2 py-2 text-sm hover:bg-black hover:text-white transition-colors relative pr-11 group w-full sm:w-auto"
          >
            Home
            <div className="absolute w-8 right-0 top-0 h-full flex items-center justify-center border-l border-black group-hover:border-white">
              <Home className="w-4 h-4 inline-block -mt-0.5" />
            </div>
          </Link>

          <Link
            href="/about"
            className="border border-black px-2 py-2 text-sm hover:bg-black hover:text-white transition-colors relative pr-11 group w-full sm:w-auto"
          >
            About
            <div className="absolute w-8 right-0 top-0 h-full flex items-center justify-center border-l border-black group-hover:border-white">
              <Contact className="w-4 h-4 inline-block -mt-0.5" />
            </div>
          </Link>

          <Link
            href="mailto:ruslan.mukhamedvaleev@gmail.com"
            className="border border-black px-2 py-2 text-sm hover:bg-black hover:text-white transition-colors relative pr-11 group w-full sm:w-auto"
          >
            Email
            <div className="absolute w-8 right-0 top-0 h-full flex items-center justify-center border-l border-black group-hover:border-white">
              <Mail className="w-4 h-4 inline-block -mt-0.5" />
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
