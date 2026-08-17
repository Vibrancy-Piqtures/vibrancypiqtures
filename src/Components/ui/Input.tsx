'use client';

import { forwardRef, type InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2 text-left">
        {label && (
          <label htmlFor={props.id} className="font-medium text-(--color-footer-heading) text-sm">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`w-full px-4 py-3 text-sm bg-transparent border border-(--color-footer-border) rounded-lg text-(--color-footer-text) focus:outline-none focus:border-(--color-footer-accent) focus:ring-2 focus:ring-inset focus:ring-(--color-footer-accent) focus:ring-opacity-30 transition-all ${
            error ? 'border-red-500' : ''
          } ${className}`}
          {...props}
        />
        {error && <span className="text-xs text-red-500">{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
