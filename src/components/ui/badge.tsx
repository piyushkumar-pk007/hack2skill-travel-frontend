import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';

export function Badge({
  className,
  variant = 'default',
  children,
}: {
  className?: string;
  variant?: 'default' | 'secondary';
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium',
        variant === 'default' && 'bg-ink text-white',
        variant === 'secondary' && 'bg-white/75 text-ink ring-1 ring-black/10',
        className,
      )}
    >
      {children}
    </span>
  );
}
