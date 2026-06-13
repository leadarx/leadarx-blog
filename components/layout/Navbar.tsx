'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import MobileMenu from './MobileMenu';
import { useTheme } from './ThemeProvider';

const MOBILE_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Search', href: '/search' },
];

function SunIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <circle cx="12" cy="12" r="5" />
      <path strokeLinecap="round" d="M12 2v2m0 16v2M4.22 4.22l1.42 1.42m12.72 12.72 1.42 1.42M2 12h2m16 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
    </svg>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled]       = useState(false);
  const [menuOpen, setMenuOpen]       = useState(false);
  const [searchOpen, setSearchOpen]   = useState(false);
  const [query, setQuery]             = useState('');
  const inputRef                      = useRef<HTMLInputElement>(null);
  const { theme, toggle }             = useTheme();
  const router                        = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [searchOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSearchOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setSearchOpen(false);
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
          scrolled ? 'bg-brand-dark border-b border-brand-border' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

          {/* Left: Home + About */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex-shrink-0">
              <span className="font-heading font-bold text-xl text-brand-light tracking-tight">
                Home
              </span>
            </Link>
            <Link
              href="/about"
              className="hidden md:block text-brand-grey hover:text-brand-light text-sm font-medium transition-colors duration-150"
            >
              About
            </Link>
          </div>

          {/* Right: Search icon + Theme toggle + Enroll Now */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => setSearchOpen((v) => !v)}
              className="p-2 rounded-lg text-brand-grey hover:text-brand-light hover:bg-brand-card transition-colors"
              aria-label="Search"
            >
              <SearchIcon />
            </button>

            <button
              onClick={toggle}
              className="p-2 rounded-lg text-brand-grey hover:text-brand-light hover:bg-brand-card transition-colors"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>

            <Link
              href="https://leadarx.com"
              className="bg-brand-accent text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity"
            >
              Enroll Now
            </Link>
          </div>

          {/* Mobile: search + theme + hamburger */}
          <div className="md:hidden flex items-center gap-1">
            <button
              onClick={() => setSearchOpen((v) => !v)}
              className="p-2 text-brand-grey hover:text-brand-light"
              aria-label="Search"
            >
              <SearchIcon />
            </button>
            <button
              onClick={toggle}
              className="p-2 text-brand-grey hover:text-brand-light"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>
            <button
              onClick={() => setMenuOpen(true)}
              className="p-2 text-brand-grey hover:text-brand-light"
              aria-label="Open menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Search overlay */}
      <div
        className={`fixed top-16 left-0 right-0 z-40 bg-brand-dark border-b border-brand-border transition-all duration-200 ${
          searchOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
      >
        <form onSubmit={handleSearch} className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-3">
          <SearchIcon />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles..."
            className="flex-1 bg-transparent text-brand-light placeholder-brand-grey text-base outline-none"
          />
          {query && (
            <button
              type="submit"
              className="text-brand-accent text-sm font-semibold hover:underline flex-shrink-0"
            >
              Go
            </button>
          )}
          <button
            type="button"
            onClick={() => setSearchOpen(false)}
            className="p-1 text-brand-grey hover:text-brand-light transition-colors flex-shrink-0"
            aria-label="Close search"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </form>
      </div>

      {/* Backdrop when search is open */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 top-16"
          onClick={() => setSearchOpen(false)}
        />
      )}

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} links={MOBILE_LINKS} />
    </>
  );
}
