import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Mail, Phone, Menu, X } from "lucide-react";

const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Departments", href: "/#departments" },
  { label: "Faculty", href: "/#faculty" },
  { label: "Events", href: "/Events" },
  { label: "Login", href: "/Login" },
  { label: "Careers", href: "/#careers" },
  { label: "Notices", href: "/#notices" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Contact", href: "/#contact" },
];

export default function PublicHeader({ active = "" }: { active?: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="bg-navy text-navy-foreground text-xs">
        <div className="mx-auto max-w-7xl px-4 py-2 flex flex-wrap items-center justify-between gap-2">
          <span className="opacity-90">
            Government of Andhra Pradesh &middot; State Board of Technical Education &amp; Training
          </span>
          <div className="flex items-center gap-5 opacity-90">
            <span className="inline-flex items-center gap-1.5">
              <Phone className="h-3 w-3" /> +91 90102 22173
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5">
              <Mail className="h-3 w-3" /> polytechnic.government173@gmail.com
            </span>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-40 bg-background/85 backdrop-blur border-b border-border">
        <div className="mx-auto max-w-7xl px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-navy text-gold grid place-items-center font-display font-bold">
              GP
            </div>
            <div className="leading-tight">
              <div className="font-display font-semibold text-foreground">
                Government Polytechnic, Anakapalli
              </div>
              <div className="text-[11px] text-muted-foreground">
                Knowledge is Power &middot; Estd. 2008
              </div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-7 text-sm">
            {nav.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`relative text-foreground/80 hover:text-foreground transition-colors ${
                  active === item.label
                    ? "text-foreground after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-6 after:bg-gold"
                    : ""
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="/#contact"
              className="hidden sm:inline-flex items-center gap-2 rounded-lg bg-navy text-navy-foreground px-4 py-2 text-sm font-medium hover:opacity-90 transition"
            >
              Contact Us
            </a>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-muted text-foreground transition"
              aria-label="Toggle Navigation"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile nav items */}
      {isOpen && (
        <div className="lg:hidden sticky top-16 z-30 border-b border-border bg-background/95 backdrop-blur-md shadow-lg transition-all">
          <nav className="flex flex-col p-4 space-y-2">
            {nav.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  active === item.label
                    ? "bg-navy text-navy-foreground dark:bg-gold dark:text-gold-foreground"
                    : "text-foreground/80 hover:text-foreground hover:bg-muted"
                }`}
              >
                {item.label}
              </a>
            ))}
            <a
              href="/#contact"
              onClick={() => setIsOpen(false)}
              className="block sm:hidden text-center rounded-lg bg-navy text-navy-foreground px-4 py-2.5 text-sm font-medium hover:opacity-90 transition"
            >
              Contact Us
            </a>
          </nav>
        </div>
      )}
    </>
  );
}

