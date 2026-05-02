import React, { useEffect, useRef } from 'react';
import { Fancybox as NativeFancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import './Home.css';

const imageModules = import.meta.glob('../assets/Gallery/Images/**/*.{jpg,JPG,jpeg,JPEG}', { eager: true });

const galleryData = Object.entries(imageModules).map(([path, module], index) => ({
  id: index + 1,
  src: module.default,
  alt: 'Wedding photography'
}));

const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const shuffledGallery = shuffleArray(galleryData);

function Home() {
  const galleryRef = useRef(null);

  useEffect(() => {
    NativeFancybox.bind("[data-fancybox]", {
      Thumbs: false,
      Hash: false,
      Toolbar: {
        display: {
          left: ["infobar"],
          middle: ["zoomIn", "zoomOut", "rotateCW"],
          right: ["slideshow", "fullscreen", "close"],
        },
      },
      Images: {
        zoom: true,
      },
    });

    const calculateRowSpans = () => {
      const gridItems = document.querySelectorAll('.grid-item');
      gridItems.forEach(item => {
        const img = item.querySelector('img');
        if (img && img.complete) {
          const aspectRatio = img.naturalHeight / img.naturalWidth;
          const rowSpan = Math.ceil(aspectRatio * 15); 
          item.style.gridRowEnd = `span ${rowSpan}`;
        }
      });
    };

    const images = document.querySelectorAll('.grid-item img');
    images.forEach(img => {
      if (img.complete) {
        calculateRowSpans();
      } else {
        img.addEventListener('load', calculateRowSpans);
      }
    });

    window.addEventListener('resize', calculateRowSpans);

    return () => {
      NativeFancybox.destroy();
      window.removeEventListener('resize', calculateRowSpans);
    };
  }, []);

  return (
    <section className="gallery-section" id="home">
      <div className="gallery-header">
        <h2 className="home-title">Immortalizing Moments, Creating Art.</h2>
        <p className="Slogan">Let us document your love story.</p>
      </div>

      <div className="collage-grid" ref={galleryRef}>
        {shuffledGallery.map((image) => (
          <div key={image.id} className="grid-item">
            <a
              href={image.src}
              data-fancybox="gallery"
            >
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                onLoad={(e) => e.target.classList.add('loaded')}
              />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Home;