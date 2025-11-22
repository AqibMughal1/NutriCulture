import { Logo } from "@/components/logo";
import { MobileSidebar } from "@/components/mobile-sidebar";
import { ModeToggle } from "@/components/mode-toggle";
import { UserButton } from "@/components/user-button";
import { currentSession } from "@/lib/api/user";
import { User } from "@/lib/types";
import Link from "next/link";

export const Navbar = async () => {
  const session = await currentSession();
  const isAdmin = session?.user?.role === "admin";
  const isLoggedIn = !!session?.user;

  const navPages = [
    {
      title: "Pricing",
      link: "/pricing",
      show: true,
    },
    {
      title: "Services",
      link: "/services",
      show: true,
    },
    {
      title: "Projects",
      link: "/projects",
      show: isLoggedIn,
    },
  ];

  return (
    <nav className="container absolute top-0 w-full z-50 transition">
      <div className="mx-auto  py-4">
        <div className="flex justify-between items-center">
          <MobileSidebar />
          <Link href="/">
            <Logo />
          </Link>
          <div className="hidden sm:flex h-[40px] items-center text-lg md:text-lg font-medium gap-4 transition-all">
            <div className="flex items-center h-full text-base font-medium">
              {navPages
                .filter((page) => page.show)
                .map((page, index) => (
                  <Link
                    key={index}
                    href={page.link}
                    className="flex items-center h-full transition-all duration-300 px-4 rounded-md group"
                  >
                    <span className="text-gray-700 dark:text-gray-300 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:via-purple-600 group-hover:to-indigo-700 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                      {page.title}
                    </span>
                  </Link>
                ))}
              {isAdmin && (
                <Link
                  href="/dashboard"
                  className="flex items-center h-full transition-all duration-300 px-4 rounded-md group"
                >
                  <span className="text-gray-700 dark:text-gray-300 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:via-purple-600 group-hover:to-indigo-700 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                    Dashboard
                  </span>
                </Link>
              )}
            </div>
            <div className="flex h-full gap-4">
              <ModeToggle />
              <UserButton user={(session?.user || null) as User | null} />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
