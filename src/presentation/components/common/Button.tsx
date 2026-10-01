import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/core/utils/cn';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/60 disabled:pointer-events-none disabled:opacity-50 whitespace-nowrap',
  {
    variants: {
      variant: {
        primary:
          'bg-brand-gradient text-slate-950 font-bold shadow-[0_8px_30px_-8px_rgba(0,229,255,0.6)] hover:shadow-[0_10px_40px_-6px_rgba(0,229,255,0.8)] hover:-translate-y-0.5 hover:brightness-110',
        outline:
          'border border-slate-300 bg-white text-slate-800 shadow-sm hover:border-cyan-500 hover:text-cyan-700 hover:bg-slate-50 dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:border-brand-accent/60 dark:hover:bg-white/10',
        ghost: 'text-ink hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-white/5 dark:hover:text-white',
        subtle: 'bg-slate-100 text-slate-800 hover:bg-slate-200 dark:bg-white/10 dark:text-white dark:hover:bg-white/15',
        danger: 'bg-red-500/90 text-white hover:bg-red-500 shadow-sm',
      },
      size: {
        sm: 'h-9 px-4 text-sm',
        md: 'h-11 px-6 text-sm',
        lg: 'h-12 px-8 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
  ),
);
Button.displayName = 'Button';

export { buttonVariants };
