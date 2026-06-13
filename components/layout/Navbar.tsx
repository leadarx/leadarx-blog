'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import MobileMenu from './MobileMenu';

const NAV_LINKS = [
  { label: 'Blog', href: '/' },
  { label: 'Data Analysis', href: '/categories/data-analysis' },
  { label: 'Digital Marketing', href: '/categories/digital-marketing' },
  { label: 'UI/UX Design', href: '/categories/ui-ux-design' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
          scrolled ? 'bg-[#1C1C1C] border-b border-brand-border' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="https://leadarx.com" className="flex-shrink-0">
            <span className="font-heading font-bold text-xl text-brand-light tracking-tight">
              Leadarx
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-brand-grey hover:text-brand-light text-sm font-medium transition-colors duration-150"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA + search */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="https://leadarx.com/enroll"
              className="bg-brand-accent text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity"
            >
              Enroll Now
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden p-2 text-brand-grey hover:text-brand-light"
            aria-label="Open menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} links={NAV_LINKS} />
    </>
  );
}
