import { forwardRef, type ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', fullWidth, className = '', children, ...props }, ref) => {
    const baseClasses =
      'px-6 py-3 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none';

    const variantClasses =
      variant === 'primary'
        ? 'text-white bg-[var(--color-footer-accent)] hover:bg-[var(--color-footer-accent-hover)] hover:-translate-y-0.5 text-base'
        : 'flex items-center justify-center gap-2 px-4 py-3 text-sm text-[var(--color-footer-accent)] border border-[var(--color-footer-accent)] hover:bg-[var(--color-footer-accent)] hover:bg-opacity-10';

    const widthClass = fullWidth ? 'w-full' : '';

    return (
      <button
        ref={ref}
        className={`${baseClasses} ${variantClasses} ${widthClass} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
