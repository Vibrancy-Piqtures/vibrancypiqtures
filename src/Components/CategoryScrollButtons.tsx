'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const categories = [
  { id: 'kukyaala', label: 'Kukyaala' },
  { id: 'kuhingira', label: 'Kwanjula & Kuhingira' },
  { id: 'wedding', label: 'Wedding' },
  { id: 'portrait-indoor', label: 'Portrait (Indoor)' },
  { id: 'portrait-outdoor', label: 'Portrait (Outdoor)' },
  { id: 'corporate', label: 'Corporate' },
  { id: 'creative', label: 'Creative' },
];

export default function CategoryScrollButtons() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsOpen(false);
    }
  };

  if (pathname !== '/packages') return null;

  return (
    <div className="fixed bottom-40 right-4 sm:right-6 z-60">
      <div ref={menuRef} className="relative flex flex-col items-end">
        {/* Floating Category List */}
        <div
          className={`absolute bottom-full mb-3 flex flex-col items-end gap-2 right-0 transition-all duration-300 ease-out origin-bottom-right ${
            isOpen
              ? 'scale-100 opacity-100 pointer-events-auto'
              : 'scale-95 opacity-0 pointer-events-none'
          }`}
        >
          {/* Close button */}
          <button
            onClick={() => setIsOpen(false)}
            className="p-2.5 rounded-full bg-(--color-footer-bg) text-(--color-footer-heading) border border-(--color-footer-border) shadow-lg transition-all hover:bg-(--color-footer-accent) hover:text-white backdrop-blur-md"
            aria-label="Close categories"
          >
            <X size={18} />
          </button>

          {/* Category buttons */}
          {categories.map((cat, index) => (
            <button
              key={cat.id}
              onClick={() => handleClick(cat.id)}
              className="px-5 py-2.5 rounded-full bg-(--color-footer-accent) text-white font-semibold text-sm shadow-md hover:bg-footer-accent-hover transition-all duration-200 whitespace-nowrap active:scale-95"
              style={{ transitionDelay: `${index * 0.02}s` }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Main toggle button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-(--color-footer-accent) text-white shadow-2xl hover:bg-footer-accent-hover active:scale-95 transition-all duration-200 flex items-center justify-center"
          aria-label={isOpen ? 'Close categories menu' : 'Open categories menu'}
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <X size={24} className="transition-transform duration-200 rotate-90" />
          ) : (
            <Menu size={24} className="transition-transform duration-200" />
          )}
        </button>
      </div>
    </div>
  );
}