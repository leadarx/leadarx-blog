import Link from 'next/link';
import { type ReactNode } from 'react';

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  className?: string;
  external?: boolean;
  fullWidth?: boolean;
}

const variants = {
  primary:   'bg-brand-accent text-white hover:opacity-90',
  secondary: 'border border-brand-accent text-brand-accent hover:bg-brand-accent hover:text-white',
  dark:      'bg-brand-dark text-brand-light border border-brand-border hover:border-brand-accent',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export default function Button({
  href, onClick, variant = 'primary', size = 'md', children, className = '', external, fullWidth,
}: ButtonProps) {
  const cls = [
    'inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-150 cursor-pointer',
    variants[variant],
    sizes[size],
    fullWidth ? 'w-full' : '',
    className,
  ].join(' ');

  if (href) {
    return (
      <Link href={href} className={cls} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={cls}>{children}</button>
  );
}
