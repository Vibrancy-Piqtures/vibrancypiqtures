'use client';

import { useEffect, useRef, useState } from 'react';
import { Fancybox as NativeFancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';

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

    const calculateRowSpans = () => {
      const gridItems = document.querySelectorAll('.grid-item-container');

      gridItems.forEach((item) => {
        const img = item.querySelector('img');
        if (img && img.complete) {
          const aspectRatio = img.naturalHeight / img.naturalWidth;
          const rowSpan = Math.ceil(aspectRatio * 15);
          (item as HTMLElement).style.gridRowEnd = `span ${rowSpan}`;
        }
      });
    };

    const imgElements = document.querySelectorAll('.grid-item-container img');
    const handleLoad = () => calculateRowSpans();

    imgElements.forEach((img) => {
      const image = img as HTMLImageElement;

      if (image.complete) {
        calculateRowSpans();
      } else {
        img.addEventListener('load', handleLoad);
      }
    });

    window.addEventListener('resize', calculateRowSpans);

    return () => {
      NativeFancybox.destroy();
      window.removeEventListener('resize', calculateRowSpans);
      imgElements.forEach((img) => img.removeEventListener('load', handleLoad));
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
      className="py-10 px-5 bg-(--bg-primary) transition-colors duration-300"
    >
      <div className="text-center mb-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-(--text-primary) mb-2">
          Our Work
        </h2>
      </div>
      <div
        ref={galleryRef}
        className="columns-1 min-[320px]:columns-2 min-[480px]:columns-3 md:columns-4 lg:columns-6 gap-3.75 md:gap-5"
      >
        {galleryImages.map((image, index) => (
          <div
            key={image.id}
            className="grid-item-container break-inside-avoid mb-3.75 md:mb-5 relative transition-transform duration-400 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] opacity-0 animate-fade-in-up"
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
    </section>
  );
}
