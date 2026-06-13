'use client';

import Link from 'next/link';
import { useEffect } from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
  links: { label: string; href: string }[];
}

export default function MobileMenu({ open, onClose, links }: Props) {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-200 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
    >
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div
        className={`absolute right-0 top-0 bottom-0 w-80 bg-brand-dark flex flex-col p-8 border-l border-brand-border transition-transform duration-200 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <button onClick={onClose} className="self-end p-2 text-brand-grey hover:text-brand-light mb-8">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <nav className="flex flex-col gap-6 flex-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="text-brand-light text-xl font-semibold hover:text-brand-accent transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="https://leadarx.com"
          onClick={onClose}
          className="mt-8 bg-brand-accent text-white font-bold py-4 rounded-xl text-center text-lg hover:opacity-90 transition-opacity"
        >
          Enroll Now
        </Link>
      </div>
    </div>
  );
}
