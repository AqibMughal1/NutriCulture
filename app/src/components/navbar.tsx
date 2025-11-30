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
      title: "Chat",
      link: "/nutrition-chat",
      show: isLoggedIn,
    },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/40 transition">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <div className="flex items-center gap-4">
            <MobileSidebar />
            <Link href="/" className="flex-shrink-0">
              <Logo />
            </Link>
          </div>
          <div className="hidden sm:flex h-full items-center text-base md:text-lg font-medium gap-2 md:gap-4 transition-all">
            <div className="flex items-center h-full text-sm md:text-base font-medium">
              {navPages
                .filter((page) => page.show)
                .map((page, index) => (
                  <Link
                    key={index}
                    href={page.link}
                    className="flex items-center h-full transition-all duration-300 px-2 md:px-4 rounded-md group"
                  >
                    <span className="text-gray-700 dark:text-gray-300 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:via-purple-600 group-hover:to-indigo-700 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 whitespace-nowrap">
                      {page.title}
                    </span>
                  </Link>
                ))}
              {isAdmin && (
                <Link
                  href="/dashboard"
                  className="flex items-center h-full transition-all duration-300 px-2 md:px-4 rounded-md group"
                >
                  <span className="text-gray-700 dark:text-gray-300 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:via-purple-600 group-hover:to-indigo-700 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 whitespace-nowrap">
                    Dashboard
                  </span>
                </Link>
              )}
            </div>
            <div className="flex h-full items-center gap-2 md:gap-4 ml-2">
              <ModeToggle />
              <UserButton user={(session?.user || null) as User | null} />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
