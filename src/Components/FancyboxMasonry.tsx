'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Fancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';

interface PhotoItem {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface FancyboxMasonryProps {
  photos: PhotoItem[];
  groupName: string;
}

function MasonryImage({ photo }: { photo: PhotoItem }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <a
      href={photo.src}
      data-fancybox="gallery"
      data-caption={photo.alt}
      className="group relative cursor-pointer overflow-hidden rounded-lg bg-transparent block"
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        unoptimized
        onLoad={() => setLoaded(true)}
        className={`w-full h-auto object-cover transition-all duration-700 
          group-hover:scale-[1.02] group-hover:brightness-90 
          ${loaded ? 'opacity-100' : 'opacity-0'}`}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
    </a>
  );
}

export default function FancyboxMasonry({ photos, groupName }: FancyboxMasonryProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    Fancybox.bind(container, '[data-fancybox]', {
      Carousel: { infinite: false },
      Toolbar: {
        display: {
          left: [],
          middle: ['zoom', 'close'],
          right: [],
        },
      },
      Images: { zoom: true },
      Thumbs: false,
    });

    return () => {
      Fancybox.unbind(container);
      Fancybox.close();
    };
  }, [groupName]);

  return (
    <div
      ref={containerRef}
      className="columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-6 space-y-4 md:space-y-6"
    >
      {photos.map((photo, idx) => (
        <div key={idx} className="break-inside-avoid">
          <MasonryImage photo={photo} />
        </div>
      ))}
    </div>
  );
}
