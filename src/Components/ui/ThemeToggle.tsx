'use client';

import { useTheme } from '@/lib/context/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme, isInitialLoad } = useTheme();

  return (
    <label className="theme-toggle-container">
      <input
        type="checkbox"
        className={`theme-checkbox ${isInitialLoad ? 'no-transition' : ''}`}
        onChange={toggleTheme}
        checked={theme === 'dark'}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      />
      <span className="visually-hidden">Toggle Dark Mode</span>
    </label>
  );
};

export default ThemeToggle;