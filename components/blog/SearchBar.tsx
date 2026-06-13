'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

interface Props {
  defaultValue?: string;
  placeholder?: string;
  autoFocus?: boolean;
}

export default function SearchBar({ defaultValue = '', placeholder = 'Search articles...', autoFocus }: Props) {
  const [value, setValue] = useState(defaultValue);
  const router = useRouter();
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (value === defaultValue) return;
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const params = new URLSearchParams();
      if (value.trim()) params.set('q', value.trim());
      router.push(`/search${value.trim() ? '?' + params.toString() : ''}`);
    }, 350);
    return () => clearTimeout(debounceRef.current);
  }, [value]);

  return (
    <div className="relative">
      <input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className="w-full bg-brand-card border border-brand-border text-brand-light placeholder-brand-grey rounded-xl px-5 py-4 pl-12 text-base focus:outline-none focus:border-brand-accent transition-colors"
      />
      <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-grey" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      {value && (
        <button onClick={() => setValue('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-grey hover:text-brand-light">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}
