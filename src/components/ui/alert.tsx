import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../lib/utils';

export function Alert({
  className,
  variant = 'default',
  children,
  ...props
}: {
  className?: string;
  variant?: 'default' | 'destructive';
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      role={variant === 'destructive' ? 'alert' : 'status'}
      aria-live={variant === 'destructive' ? 'assertive' : 'polite'}
      className={cn(
        'rounded-2xl border px-4 py-3 text-sm',
        variant === 'default' && 'border-accent/20 bg-accent/10 text-ink',
        variant === 'destructive' && 'border-ember/30 bg-amber-50 text-amber-900',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
