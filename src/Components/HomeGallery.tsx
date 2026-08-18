'use client';

import { useEffect, useRef, useState } from 'react';
import { Fancybox as NativeFancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';
import Link from 'next/link';

type GalleryImage = {
  id: number;
  src: string;
  alt: string;
};

const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export default function HomeGallery({ images }: { images: string[] }) {
  const galleryRef = useRef<HTMLDivElement>(null);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>(() =>
    images.map((src, index) => ({
      id: index + 1,
      src,
      alt: 'Wedding photography',
    }))
  );

  useEffect(() => {
    if (images.length === 0) return;

    const mappedImages = images.map((src, index) => ({
      id: index + 1,
      src,
      alt: 'Wedding photography',
    }));

    setGalleryImages(shuffleArray(mappedImages));
  }, [images]);

  useEffect(() => {
    if (galleryImages.length === 0) return;

    NativeFancybox.bind('[data-fancybox]', {
      Thumbs: false,
      Hash: false,
      Toolbar: {
        display: {
          left: ['infobar'],
          middle: ['zoomIn', 'zoomOut', 'rotateCW'],
          right: ['slideshow', 'fullscreen', 'close'],
        },
      },
      Images: { zoom: true },
    });

    return () => {
      NativeFancybox.destroy();
    };
  }, [galleryImages]);

  if (images.length === 0) {
    return (
      <section
        id="home"
        className="py-10 px-5 bg-(--bg-primary) transition-colors duration-300"
      >
        <div className="text-center">
          <p className="text-(--text-primary)">
            No gallery images found. Add images to{' '}
            <code className="font-mono">public/assets/Gallery/Images</code>.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="home"
      className="py-5 px-5 bg-(--bg-primary) transition-colors duration-300"
    >
      <div className="max-w-340 mx-auto">
        <div className="text-start mb-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-(--text-primary) mb-2">
            Our Work
          </h2>
        </div>
        <div
          ref={galleryRef}
          className="columns-1 min-[320px]:columns-2 min-[480px]:columns-3 md:columns-4 lg:columns-5 gap-x-3.75 md:gap-x-5"
        >
          {galleryImages.map((image, index) => (
            <div
              key={image.id}
              className="break-inside-avoid mb-3.75 md:mb-5 relative transition-transform duration-400 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${0.1 + (index % 12) * 0.05}s` }}
            >
              <a href={image.src} data-fancybox="gallery">
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  className="w-full h-auto block rounded-lg shadow-[0_4px_10px_var(--gallery-shadow)] transition-all duration-400 hover:scale-[1.02] hover:z-10 relative"
                />
              </a>
            </div>
          ))}
        </div>
        <div className="text-end mt-8">
          <Link
            href="/gallery"
            className="inline-block px-8 py-3 bg-(--color-footer-accent) text-white rounded-full font-medium hover:bg-footer-accent-hover transition-colors"
          >
            View More Work
          </Link>
        </div>
      </div>
    </section>
  );
}