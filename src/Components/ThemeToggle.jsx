import React, { useEffect } from 'react';
import { useTheme } from './ThemeContext';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    // Apply the checked state based on theme
    const checkbox = document.querySelector('.theme-checkbox');
    if (checkbox) {
      checkbox.checked = theme === 'dark';
    }
  }, [theme]);

  return (
    <label className="theme-toggle-container">
      <input 
        type="checkbox" 
        className="theme-checkbox"
        onChange={toggleTheme}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      />
      <span className="visually-hidden">Toggle Dark Mode</span>
    </label>
  );
};

export default ThemeToggle;

