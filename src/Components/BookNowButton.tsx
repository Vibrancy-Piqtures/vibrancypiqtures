'use client';

import { useState, useEffect, useRef } from 'react';
import Button from '@/Components/ui/Button';
import { MessageCircle, Mail } from 'lucide-react';

interface BookNowButtonProps {
  packageName: string;
  packagePrice: number;
  variant?: 'primary' | 'outline' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function BookNowButton({
  packageName,
  packagePrice,
  className = '',
}: BookNowButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const formattedPrice = new Intl.NumberFormat('en-US').format(packagePrice);
  const businessPhone = '256767810246';
  const businessEmail = 'info@vibrancypiqtures.com';
  const autoMessage = `Hello Vibrancy Piqtures, I am interested in booking your "${packageName}" package priced at USH ${formattedPrice}. Kindly check your availability for my upcoming dates and guide me on the reservation process.`;
  const whatsappUrl = `https://wa.me/${businessPhone}?text=${encodeURIComponent(autoMessage)}`;
  const emailUrl = `mailto:${businessEmail}?subject=${encodeURIComponent(
    `Booking Inquiry: ${packageName}`
  )}&body=${encodeURIComponent(autoMessage)}`;

  return (
    <div
      className={`relative inline-block w-full sm:w-auto transition-all duration-200 ${
        isOpen ? 'z-30' : 'z-10'
      }`}
      ref={menuRef}
    >
      <Button
        className={className}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        Book Now
      </Button>
      <div
        className={`absolute left-0 md:left-auto md:right-0 bottom-full mb-3 w-full sm:w-80 bg-(--color-footer-bg) border border-(--color-footer-border) rounded-2xl shadow-2xl p-4 text-left origin-bottom-left md:origin-bottom-right transition-all duration-200 ease-out
          ${
            isOpen
              ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto visible'
              : 'opacity-0 translate-y-2 scale-95 pointer-events-none invisible'
          }
        `}
      >
        <div className="mb-3">
          <h4 className="text-sm font-bold text-(--color-footer-heading)">
            Choose Booking Channel
          </h4>
          <p className="text-footer-secondary text-xs mt-0.5">
            Requesting{' '}
            <span className="text-(--color-footer-accent) font-semibold">
              {packageName}
            </span>
          </p>
        </div>
        <div className="space-y-1">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl bg-(--color-footer-bg) hover:bg-(--color-footer-accent)/5 transition-colors cursor-pointer group/item"
          >
            <MessageCircle className="w-4 h-4 text-green-600 fill-current shrink-0" />
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-(--color-footer-heading) group-hover/item:text-(--color-footer-accent) transition-colors">
                Chat via WhatsApp
              </span>
              <span className="text-[10px] text-footer-secondary">
                Instant response
              </span>
            </div>
          </a>
          <a
            href={emailUrl}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl bg-(--color-footer-bg) hover:bg-(--color-footer-accent)/5 transition-colors cursor-pointer group/item"
          >
            <Mail className="w-4 h-4 text-(--color-footer-accent) shrink-0" />
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-(--color-footer-heading) group-hover/item:text-(--color-footer-accent) transition-colors">
                Send Email Inquiry
              </span>
              <span className="text-[10px] text-footer-secondary">
                Official quotation
              </span>
            </div>
          </a>
        </div>
        <p className="text-[9px] text-footer-secondary mt-3 leading-tight border-t border-(--color-footer-border) pt-2">
          Opens your native messaging app with pre-filled package data. You can freely edit text before sending.
        </p>
      </div>
    </div>
  );
}
