import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes, type SelectHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/core/utils/cn';

const base =
  'w-full rounded-xl border border-white/10 bg-[#0b1326]/60 px-4 py-3 text-sm text-white placeholder:text-muted/60 transition focus:border-brand-accent/60 focus:outline-none focus:ring-2 focus:ring-brand-accent/20';

export function FieldWrapper({
  label,
  error,
  required,
  children,
}: {
  label?: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <label className="block">
      {label && (
        <span className="mb-1.5 block text-sm font-medium text-ink">
          {label} {required && <span className="text-brand-cyan">*</span>}
        </span>
      )}
      {children}
      {error && <span className="mt-1 block text-xs text-red-400">{error}</span>}
    </label>
  );
}

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement> & { error?: string }>(
  ({ className, error, ...props }, ref) => (
    <input ref={ref} className={cn(base, error && 'border-red-500/60', className)} {...props} />
  ),
);
Input.displayName = 'Input';

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement> & { error?: string }
>(({ className, error, ...props }, ref) => (
  <textarea ref={ref} rows={4} className={cn(base, error && 'border-red-500/60', className)} {...props} />
));
Textarea.displayName = 'Textarea';

export const Select = forwardRef<
  HTMLSelectElement,
  SelectHTMLAttributes<HTMLSelectElement> & { error?: string }
>(({ className, error, children, ...props }, ref) => (
  <select ref={ref} className={cn(base, 'appearance-none', error && 'border-red-500/60', className)} {...props}>
    {children}
  </select>
));
Select.displayName = 'Select';
