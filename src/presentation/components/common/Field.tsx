import { 
  forwardRef, 
  useState, 
  useRef, 
  useEffect, 
  Children, 
  isValidElement,
  type InputHTMLAttributes, 
  type TextareaHTMLAttributes, 
  type SelectHTMLAttributes, 
  type ReactNode 
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/core/utils/cn';

const base =
  'w-full rounded-xl border border-slate-200 bg-white/50 px-4 py-3 text-sm text-ink placeholder:text-muted/60 transition focus:border-brand-cyan/60 focus:outline-none focus:ring-2 focus:ring-brand-cyan/20 dark:border-white/10 dark:bg-[#0b1326]/60 dark:text-white dark:focus:border-brand-accent/60 dark:focus:ring-brand-accent/20';

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
>(({ className, error, children, value, onChange, ...props }, ref) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const options = Children.toArray(children).map(child => {
    if (isValidElement(child) && child.type === 'option') {
      const props = child.props as any;
      return {
        value: props.value,
        label: props.children
      };
    }
    return null;
  }).filter(Boolean);

  const selectedOption = options.find(o => o?.value === value) || options[0];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={cn("relative", className)} ref={containerRef}>
      <select ref={ref} value={value} onChange={onChange} className="hidden" {...props}>
        {children}
      </select>

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          base,
          "flex items-center justify-between text-left",
          error && 'border-red-500/60'
        )}
      >
        <span className="truncate">{selectedOption?.label}</span>
        <ChevronDown className={cn("h-4 w-4 shrink-0 text-muted transition-transform duration-200", open && "rotate-180")} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 z-50 mt-2 w-full min-w-max overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl backdrop-blur-md dark:border-white/10 dark:bg-[#0f172a] dark:shadow-2xl"
          >
            <div className="max-h-60 overflow-y-auto p-1 hide-scrollbar">
              {options.map(option => (
                <button
                  key={option?.value}
                  type="button"
                  onClick={() => {
                    if (onChange) {
                      const event = {
                        target: { value: option?.value, name: props.name }
                      } as any;
                      onChange(event);
                    }
                    setOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center rounded-lg px-3 py-2.5 text-left text-sm transition-colors duration-150",
                    value === option?.value
                      ? "bg-brand-cyan/10 font-medium text-brand-cyan dark:bg-brand-accent/20"
                      : "text-ink hover:bg-slate-100 dark:text-white dark:hover:bg-white/10"
                  )}
                >
                  {option?.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});
Select.displayName = 'Select';
