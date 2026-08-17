'use client';

import { useState, useEffect, useCallback, useRef, type MouseEvent } from 'react';
import Image from 'next/image';
import ContactModal from '@/Components/ContactModal';
import Button from './ui/Button';

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
    title: 'Outdoor Portrait Session',
    category: 'Grad Shoot discount',
  },
  {
    id: 2,
    src: '/assets/Feature/Hero/hero-2.jpg',
    alt: 'Grad Photoshoot',
    title: 'Graduation Memory',
    category: 'Portrait of the Day',
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
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % heroImages.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  }, []);

  useEffect(() => {
    if (!isPaused && heroImages.length > 1) {
      timerRef.current = setInterval(nextSlide, 6000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, nextSlide]);

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
            <div className="absolute inset-0 bg-linear-to-r from-hero-overlay-start via-hero-overlay-mid to-transparent" />
            <div className="absolute inset-0 bg-linear-to-t from-hero-overlay-vertical-start via-transparent to-hero-overlay-vertical-end" />
          </div>
        ))}

        <div className="absolute inset-0 z-20 flex flex-col justify-between p-6 pt-20 sm:p-12 sm:pt-20 lg:p-20 lg:pt-20 pointer-events-none">
          <div className="pt-4">
            <span
              className="inline-block text-xs font-mono uppercase tracking-[0.3em] text-white bg-(--color-footer-accent) backdrop-blur-md px-3 py-1 rounded-full border border-hero-chip-border animate-fade-in-up"
              style={{ animationDelay: '0.1s' }}
            >
              {activeSlide.category}
            </span>
          </div>

          <div className="max-w-2xl mb-28 sm:mb-32 pointer-events-auto">
            <h1
              className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight text-hero-text mb-4 animate-fade-in-up"
              style={{ animationDelay: '0.2s' }}
            >
              <span className="font-bold block sm:inline">Vibrancy Piqtures</span>
            </h1>
            <p
              className="text-base sm:text-xl text-hero-subtext font-light max-w-lg mb-8 leading-relaxed animate-fade-in-up"
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
                className="px-6 py-3 bg-hero-button-bg text-hero-button-text font-medium text-sm rounded-full hover:bg-hero-button-hover transition-colors shadow-lg text-center"
              >
                View Work
              </a>
              <Button
                onClick={openContactModal}
                className="inline-block px-8 py-3 bg-(--color-footer-accent) text-white rounded-full font-medium hover:bg-footer-accent-hover transition-colors"
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
                    ? 'w-20 sm:w-36 h-16 sm:h-24 ring-2 ring-hero-thumb-ring scale-105 shadow-2xl'
                    : 'w-14 sm:w-24 h-12 sm:h-18 opacity-50 hover:opacity-90 hover:scale-102 border border-hero-thumb-ring/20'
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
                    isActive ? 'opacity-100' : 'opacity-40 group-hover:opacity-20'
                  }`}
                />

                <div className="absolute bottom-2 left-2 right-2 z-10 hidden sm:block">
                  <span className="block text-[10px] font-mono text-hero-thumb-muted uppercase tracking-wider">
                    0{slide.id}
                  </span>
                  <span className="block text-xs font-semibold text-hero-thumb-text truncate">
                    {slide.title}
                  </span>
                </div>

                {isActive && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-hero-thumb-ring/40">
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
