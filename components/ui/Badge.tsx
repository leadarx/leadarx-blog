import { type ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  color?: string;
  className?: string;
}

export default function Badge({ children, color, className = '' }: BadgeProps) {
  const style = color ? { backgroundColor: color + '20', color } : undefined;
  const defaultCls = color
    ? ''
    : 'bg-brand-accent/20 text-brand-accent';

  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${defaultCls} ${className}`}
      style={style}
    >
      {children}
    </span>
  );
}
