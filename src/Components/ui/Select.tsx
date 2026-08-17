'use client';

import { forwardRef, type SelectHTMLAttributes } from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[];
  label?: string;
  error?: string;
  placeholder?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ options, label, error, placeholder, className = '', ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2 text-left">
        {label && (
          <label htmlFor={props.id} className="font-medium text-(--color-footer-heading) text-sm">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            className={`w-full px-4 py-3 text-sm bg-transparent border border-(--color-footer-border) rounded-lg text-(--color-footer-text) focus:outline-none focus:border-(--color-footer-accent) focus:ring-2 focus:ring-inset focus:ring-(--color-footer-accent) focus:ring-opacity-30 transition-all appearance-none pr-10 ${
              error ? 'border-red-500' : ''
            } ${className}`}
            {...props}
          >
            <option value="" disabled>
              {placeholder || 'Select an option'}
            </option>
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                className="bg-bg-primary text-(--color-text-light)"
              >
                {option.label}
              </option>
            ))}
          </select>
          {/* Custom chevron */}
          <svg
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-footer-secondary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        {error && <span className="text-xs text-red-500">{error}</span>}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;