'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { HiOutlineX } from 'react-icons/hi';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  className?: string;
  closeOnOutsideClick?: boolean;
  showCloseButton?: boolean;
  closeButtonClassName?: string;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  className = '',
  closeOnOutsideClick = true,
  showCloseButton = true,
  closeButtonClassName = '',
}: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      ref={overlayRef}
      className="fixed inset-0 flex items-center justify-center z-1000 bg-black/86 p-4 animate-fadeIn"
      style={{ backgroundColor: 'rgba(0,0,0,0.86)' }}
      onClick={(e) => {
        if (closeOnOutsideClick && e.target === overlayRef.current) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label={title || 'Modal'}
    >
      <div
        className={`relative w-full max-w-120 bg-(--color-footer-bg) rounded-xl p-6 shadow-[0_12px_28px_rgba(0,0,0,0.28)] border border-(--color-footer-border) flex flex-col max-h-[calc(100vh-2rem)] ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {showCloseButton && (
          <button
            onClick={onClose}
            aria-label="Close modal"
            className={`absolute top-4 right-4 p-1 text-footer-secondary hover:text-(--color-footer-text) hover:rotate-90 transition-all z-10 bg-transparent border-none cursor-pointer ${closeButtonClassName}`}
          >
            <HiOutlineX size={24} />
          </button>
        )}
        {children}
      </div>
    </div>,
    document.body
  );
}