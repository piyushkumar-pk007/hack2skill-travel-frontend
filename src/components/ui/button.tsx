import * as React from 'react';
import { cn } from '../../lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'secondary' | 'ghost';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        variant === 'default' && 'bg-ink text-white shadow-panel hover:opacity-90',
        variant === 'secondary' && 'bg-white/70 text-ink ring-1 ring-black/10 hover:bg-white',
        variant === 'ghost' && 'bg-transparent text-ink hover:bg-black/5',
        className,
      )}
      {...props}
    />
  ),
);

Button.displayName = 'Button';
