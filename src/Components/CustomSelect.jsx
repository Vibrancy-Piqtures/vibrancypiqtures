import React, { useState, useEffect, useRef } from 'react';
import { HiChevronDown } from 'react-icons/hi';
import './CustomSelect.css';

const CustomSelect = ({ options, value, onChange, placeholder = 'Select an option' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const selectedOption = options.find(opt => opt.value === value);

  const toggleOpen = () => setIsOpen(prev => !prev);

  const handleSelect = (option) => {
    onChange(option.value);
    setIsOpen(false);
  };

  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        toggleOpen();
        break;
      case 'Escape':
        setIsOpen(false);
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) setIsOpen(true);
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (!isOpen) setIsOpen(true);
        break;
      default:
        break;
    }
  };

  const handleClickOutside = (e) => {
    if (containerRef.current && !containerRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`custom-select ${isOpen ? 'is-open' : ''}`}
    >
      <div
        className="custom-select__trigger"
        onClick={toggleOpen}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls="custom-select-options"
      >
        <span className={`custom-select__value ${!selectedOption ? 'is-placeholder' : ''}`}>
          {selectedOption?.label || placeholder}
        </span>
        <HiChevronDown className={`custom-select__chevron ${isOpen ? 'is-open' : ''}`} />
      </div>

      {isOpen && (
        <div 
          className="custom-select__options"
          id="custom-select-options"
          role="listbox"
        >
          {options.map((option) => (
            <div
              key={option.value}
              className={`custom-select__option ${option.value === value ? 'is-selected' : ''}`}
              onClick={() => handleSelect(option)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSelect(option);
              }}
              role="option"
              aria-selected={option.value === value}
              tabIndex={0}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;