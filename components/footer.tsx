import Link from "next/link";
import { Logo } from "@/components/logo";

export const Footer = () => {
  return (
    <footer className="w-full bg-secondary/70 dark:bg-secondary/50 backdrop-blur-lg py-12 mt-20 rounded-t-3xl shadow-xl border">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo + Tagline */}
        <div>
          <Link href="/" className="inline-block font-extrabold mb-4">
            <Logo />
          </Link>
          <p className="text-bold  max-w-xs">
            Empowering developers to build better apps, faster. Secure, scalable, and beautiful by design.
          </p>
        </div>

        {/* About Section */}
        <div>
          <h3 className="text-md font-semibold mt-12 mb-4">About</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link href="/about" className="hover:text-white transition">
                Our Mission
              </Link>
            </li>
            <li>
              <Link href="/team" className="hover:text-white transition">
                Team
              </Link>
            </li>
            <li>
              <Link href="/careers" className="hover:text-white transition">
                Careers
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-white transition">
                Blog
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources Section */}
        <div>
          <h3 className="text-md font-semibold mt-12 mb-4">Resources</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link href="/docs" className="hover:text-white transition">
                Documentation
              </Link>
            </li>
            <li>
              <Link href="/support" className="hover:text-white transition">
                Support
              </Link>
            </li>
            <li>
              <Link href="/pricing" className="hover:text-white transition">
                Pricing
              </Link>
            </li>
            <li>
              <Link href="/status" className="hover:text-white transition">
                System Status
              </Link>
            </li>
          </ul>
        </div>

        {/* Social / Contact */}
        <div>
          <h3 className="text-md font-semibold mt-12 mb-4 ">Connect</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <a
                href="mailto:aqibmughal1@gmail.com"
                className="hover:text-white transition"
              >
                Email Us
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com/yourcompany"
                className="hover:text-white transition"
                target="_blank"
              >
                Twitter
              </a>
            </li>
            <li>
              <a
                href="https://github.com/aqibmughal1"
                className="hover:text-white transition"
                target="_blank"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="hover:text-white transition"
              >
                Contact Form
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-12 border-t border-border  px-6 text-sm text-muted-foreground text-center">
        &copy; 2025 YourCompany. All rights reserved.
      </div>
    </footer>
  );
};