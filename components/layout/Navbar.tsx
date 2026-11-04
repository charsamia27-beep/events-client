"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LuMenu, LuX } from "react-icons/lu";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Upcoming Events" },
];

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="topbar">
        <div className="container topbar-row">
          <p>Find a local cause. Bring a friend. Show up.</p>
          <Link className="topbar-cta" href="/events/create">
            Create an event
          </Link>
        </div>
      </div>
      <div className="mainbar">
        <div className="container mainbar-row">
          <Logo />
          <nav aria-label="Main" className="nav-links">
            {NAV_LINKS.map((link) => (
              <Link
                aria-current={pathname === link.href ? "page" : undefined}
                className="nav-link"
                href={link.href}
                key={link.href}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="nav-actions">
            <ThemeToggle />
            <button
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="icon-btn menu-btn"
              onClick={() => setMenuOpen((open) => !open)}
              type="button"
            >
              {menuOpen ? <LuX size={20} /> : <LuMenu size={20} />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav aria-label="Mobile" className="container mobile-nav">
            {NAV_LINKS.map((link) => (
              <Link
                aria-current={pathname === link.href ? "page" : undefined}
                className="nav-link"
                href={link.href}
                key={link.href}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
