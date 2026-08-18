'use client';

import { useState, useEffect, useCallback, useRef, type MouseEvent } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import ContactModal from '@/Components/ContactModal';
import Modal from '@/Components/ui/modal';
import Button from './ui/Button';
import { allPackages } from '@/lib/data/packages';

interface HeroSlide {
  id: number;
  src: string;
  alt: string;
  title: string;
  category: string;
}

const heroImages: HeroSlide[] = [
  {
    id: 1,
    src: '/assets/Feature/Hero/hero-1.jpg',
    alt: 'Portrait photography',
    title: 'Graduation Photoshoot',
    category: 'Grad Shoot discount',
  },
  {
    id: 2,
    src: '/assets/Feature/Hero/hero-2.jpg',
    alt: 'Grad Photoshoot',
    title: 'Graduation Memory',
    category: 'Graduating!!!',
  },
  {
    id: 3,
    src: '/assets/Feature/Hero/hero-3.jpg',
    alt: 'Detail direction',
    title: 'Detail Direction',
    category: 'GRAB YOUR DISCOUNT NOW',
  },
];

export default function HeroThumbnailFilmstrip() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isPromoModalOpen, setIsPromoModalOpen] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % heroImages.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  }, []);

  useEffect(() => {
    if (!isPaused && !isPromoModalOpen && !isContactModalOpen && heroImages.length > 1) {
      timerRef.current = setInterval(nextSlide, 6000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, nextSlide, isPromoModalOpen, isContactModalOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const handleScrollToGallery = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });
  };

  const openContactModal = () => setIsContactModalOpen(true);
  const closeContactModal = () => setIsContactModalOpen(false);

  if (heroImages.length === 0) return <EmptyState />;

  const activeSlide = heroImages[currentIndex];

  return (
    <>
      <section
        className="relative w-full h-screen overflow-hidden bg-hero-bg text-hero-text"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        aria-roledescription="carousel"
        aria-label="Hero image gallery"
      >
        {heroImages.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
            aria-hidden={index !== currentIndex}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover"
            />
            {/* Improved Gradients for legibility */}
            <div className="absolute inset-0 bg-linear-to-r from-hero-overlay-start via-hero-overlay-mid to-transparent" />
            <div className="absolute inset-0 bg-linear-to-t from-hero-overlay-vertical-start via-transparent to-hero-overlay-vertical-end" />
          </div>
        ))}

        <div className="absolute inset-0 z-20 flex flex-col justify-between p-6 pt-20 sm:p-12 sm:pt-20 lg:p-20 lg:pt-20 pointer-events-none">
          <div className="pt-4 pointer-events-auto">
            {/* Promo Button */}
            <button
              onClick={() => setIsPromoModalOpen(true)}
              className="group inline-flex items-center gap-3 text-xs font-mono uppercase tracking-[0.3em] text-white bg-red-600 hover:bg-red-700 backdrop-blur-md px-4 py-2 rounded-full border border-white/30 animate-fade-in-up shadow-[0_0_15px_rgba(220,38,38,0.5)] hover:shadow-[0_0_25px_rgba(220,38,38,0.8)] hover:scale-105 transition-all duration-300"
              style={{ animationDelay: '0.1s' }}
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
              </span>
              {activeSlide.category}
            </button>
          </div>

          <div className="max-w-2xl mb-28 sm:mb-32 pointer-events-auto">
            <h1
              className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight text-hero-text mb-4 animate-fade-in-up drop-shadow-sm dark:drop-shadow-md"
              style={{ animationDelay: '0.2s' }}
            >
              <span className="font-bold block sm:inline">Vibrancy Piqtures</span>
            </h1>
            <p
              className="text-base sm:text-xl text-hero-subtext font-light max-w-lg mb-8 leading-relaxed animate-fade-in-up drop-shadow-sm dark:drop-shadow-none"
              style={{ animationDelay: '0.3s' }}
            >
              Immortalizing Moments, Creating Art.
            </p>
            <div
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 animate-fade-in-up"
              style={{ animationDelay: '0.4s' }}
            >
              <a
                href="#gallery"
                onClick={handleScrollToGallery}
                className="px-6 py-3 bg-hero-button-bg text-hero-button-text font-medium text-sm rounded-full hover:bg-hero-button-hover transition-colors shadow-lg text-center border border-transparent dark:border-white/10"
              >
                View Work
              </a>
              <Button
                onClick={openContactModal}
                className="inline-block px-8 py-3 bg-footer-accent text-white rounded-full font-medium hover:bg-footer-accent-hover transition-colors shadow-lg"
              >
                Book A Session
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-4 sm:bottom-10 left-4 right-4 sm:left-auto sm:right-12 z-30 flex items-end justify-center sm:justify-end gap-2 sm:gap-4 max-w-full overflow-x-auto p-2">
          {heroImages.map((slide, index) => {
            const isActive = index === currentIndex;
            return (
              <button
                key={slide.id}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Switch to slide ${index + 1}: ${slide.title}`}
                aria-current={isActive}
                className={`group relative shrink-0 text-left transition-all duration-300 rounded-xl overflow-hidden focus:outline-none focus:ring-2 focus:ring-hero-thumb-ring/80 ${
                  isActive
                    ? 'w-20 sm:w-36 h-16 sm:h-24 ring-2 ring-hero-thumb-ring scale-105 shadow-[0_8px_30px_rgb(0,0,0,0.15)] dark:shadow-2xl'
                    : 'w-14 sm:w-24 h-12 sm:h-18 opacity-60 hover:opacity-100 hover:scale-102 border border-black/10 dark:border-hero-thumb-ring/20'
                }`}
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  sizes="(max-width: 640px) 80px, 144px"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />

                <div
                  className={`absolute inset-0 bg-linear-to-t from-hero-thumb-overlay-start via-hero-thumb-overlay-mid to-transparent transition-opacity ${
                    isActive ? 'opacity-100' : 'opacity-80 group-hover:opacity-40'
                  }`}
                />

                <div className="absolute bottom-2 left-2 right-2 z-10 hidden sm:block">
                  <span className="block text-[10px] font-mono text-hero-thumb-muted uppercase tracking-wider drop-shadow-sm">
                    0{slide.id}
                  </span>
                  <span className="block text-xs font-semibold text-hero-thumb-text truncate drop-shadow-sm">
                    {slide.title}
                  </span>
                </div>

                {isActive && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-hero-thumb-ring/20 dark:bg-hero-thumb-ring/40">
                    <div
                      className="h-full bg-hero-thumb-ring transition-all duration-300"
                      style={{ width: '100%' }}
                    />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </section>

      <ContactModal isOpen={isContactModalOpen} onClose={closeContactModal} />
      <GradPromoModal isOpen={isPromoModalOpen} onClose={() => setIsPromoModalOpen(false)} />
    </>
  );
}

function EmptyState() {
  return (
    <section className="relative h-screen flex items-center justify-center text-center px-5 bg-hero-bg">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-hero-text mb-4">Vibrancy Piqtures</h1>
        <p className="text-hero-subtext">No hero images found.</p>
      </div>
    </section>
  );
}

// Grad Promo Modal
function GradPromoModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [shootType, setShootType] = useState<'indoor' | 'outdoor'>('outdoor');

  const indoorPackage = allPackages.find((p) => p.category === 'portrait-indoor');
  const outdoorPackage = allPackages.find((p) => p.category === 'portrait-outdoor');

  const selectedPackage = shootType === 'indoor' ? indoorPackage : outdoorPackage;
  const originalPrice = selectedPackage ? selectedPackage.price : 0;
  const discountedPrice = Math.round(originalPrice * 0.8);
  const selectedTitle = selectedPackage
    ? selectedPackage.name
    : shootType === 'indoor'
      ? 'Studio Session'
      : 'Outdoor Session';
  const selectedDescription = selectedPackage ? selectedPackage.description : '';

  return (
    <Modal isOpen={isOpen} onClose={onClose} showCloseButton={false} className="max-w-lg">
      <div className="bg-red-600 p-8 text-white relative overflow-hidden rounded-md -m-5 mb-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-3xl font-bold mb-2">Class of '26 Promo</h2>
        <p className="text-red-100">
          Lock in your graduation memory now and get our exclusive 20% seasonal discount!
        </p>
      </div>

      <div>
        <div
          role="tablist"
          aria-label="Select shoot type"
          className="flex rounded-xl bg-gray-100 dark:bg-zinc-800 p-1.5 mb-6"
        >
          <button
            type="button"
            role="tab"
            aria-selected={shootType === 'indoor'}
            onClick={() => setShootType('indoor')}
            className={`relative flex-1 py-2.5 text-sm font-semibold rounded-lg cursor-pointer transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-footer-accent ${
              shootType === 'indoor'
                ? 'text-white'
                : 'text-footer-secondary dark:text-gray-400 hover:text-header-text dark:hover:text-white'
            }`}
          >
            {shootType === 'indoor' && (
              <motion.div
                layoutId="shootTypeActiveTab"
                className="absolute inset-0 bg-footer-accent rounded-lg"
                initial={false}
                transition={{ type: 'tween', duration: 0.2, ease: 'easeInOut' }}
                style={{ zIndex: 0 }}
              />
            )}
            <span className="relative z-10">Indoor (Studio)</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={shootType === 'outdoor'}
            onClick={() => setShootType('outdoor')}
            className={`relative flex-1 py-2.5 text-sm font-semibold rounded-lg cursor-pointer transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-footer-accent ${
              shootType === 'outdoor'
                ? 'text-white'
                : 'text-footer-secondary dark:text-gray-400 hover:text-header-text dark:hover:text-white'
            }`}
          >
            {shootType === 'outdoor' && (
              <motion.div
                layoutId="shootTypeActiveTab"
                className="absolute inset-0 bg-footer-accent rounded-lg"
                initial={false}
                transition={{ type: 'tween', duration: 0.2, ease: 'easeInOut' }}
                style={{ zIndex: 0 }}
              />
            )}
            <span className="relative z-10">Outdoor (Location)</span>
          </button>
        </div>

        <div className="text-center mb-8 p-5 rounded-xl border-2 border-red-200 dark:border-red-900/30 bg-red-50 dark:bg-red-900/10 transition-all duration-300">
          <p className="text-sm text-red-600 dark:text-red-400 uppercase tracking-widest font-bold mb-2">
            {selectedTitle}
          </p>
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="text-2xl font-semibold text-gray-400 line-through">
              {originalPrice.toLocaleString()} UGX
            </span>
            <span className="px-3 py-1 bg-red-600 text-white text-xs font-bold rounded-full">
              20% OFF
            </span>
          </div>
          <p className="text-5xl font-black text-gray-900 dark:text-white mb-3">
            {discountedPrice.toLocaleString()} UGX
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">{selectedDescription}</p>
        </div>

        <form className="space-y-4 mb-6" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="First Name"
              className="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-[#114747] outline-none transition-all dark:text-white"
            />
            <input
              type="text"
              placeholder="Last Name"
              className="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-[#114747] outline-none transition-all dark:text-white"
            />
          </div>
          <input
            type="email"
            placeholder="Email Address"
            className="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-[#114747] outline-none transition-all dark:text-white"
          />
          <button
            type="submit"
            className="w-full py-4 mt-2 bg-footer-accent text-white rounded-xl cursor-pointer font-bold text-lg transition-all shadow-[0_0_20px_rgba(17,71,71,0.3)] hover:shadow-[0_0_25px_rgba(17,71,71,0.5)] transform hover:-translate-y-0.5"
          >
            Request Booking
          </button>
        </form>
        <p className="text-center text-xs text-gray-400">
          We'll get back to you within 24 hours to confirm dates.
        </p>
      </div>
    </Modal>
  );
}