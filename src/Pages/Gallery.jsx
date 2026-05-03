import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import Fancybox from '../Components/FancyBox';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import Reviews from '../Components/Reviews';
import './Gallery.css';

const imageModules = import.meta.glob('../assets/Gallery/Images/**/*.{jpg,JPG,jpeg,JPEG}', { eager: true });

const organizeAlbums = () => {
  const albums = {};
  
  Object.entries(imageModules).forEach(([path, module]) => {
    const pathParts = path.split('/');
    
    if (pathParts.length >= 4) {
      const coupleName = pathParts[pathParts.length - 3]; 
      const eventType = pathParts[pathParts.length - 2]; 
      const albumName = `${coupleName} - ${eventType}`;
      const albumId = albumName.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and');

      if (!albums[albumId]) {
        albums[albumId] = {
          id: albumId,
          title: albumName,
          cover: module.default,
          images: []
        };
      }
      albums[albumId].images.push(module.default);
    }
  });

  return Object.values(albums);
};

const weddingAlbums = organizeAlbums();

const LazyImage = ({ src, alt, className }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.1
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={imgRef} style={{ position: 'relative', width: '100%', height: '100%' }}>
      {!isLoaded && <div className="image-skeleton" />}
      {isInView && (
        <img
          src={src}
          alt={alt}
          className={`${className} ${isLoaded ? 'loaded' : ''}`}
          onLoad={() => setIsLoaded(true)}
          loading="lazy"
        />
      )}
    </div>
  );
};

const Gallery = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeAlbum, setActiveAlbum] = useState(null);
  const hasCheckedParams = useRef(false);

  useEffect(() => {
    const albumParam = searchParams.get('album');
    
    if (albumParam) {
      const album = weddingAlbums.find(
        album => album.id === albumParam
      );
      
      if (album) {
        setActiveAlbum(album);
      }
    }
    
    hasCheckedParams.current = true;
  }, [searchParams]);

  const handleAlbumClick = (album) => {
    setActiveAlbum(album);
    setSearchParams({ album: album.id });
  };

  const handleBackClick = () => {
    setActiveAlbum(null);
    setSearchParams({});
  };

  return (
    <div className="photos-wrapper">
      <div className="photos-page">
        <h1 className="page-title">Galleries</h1>

        {!activeAlbum ? (
          <div className="albums-grid">
            {weddingAlbums.map(album => (
              <div 
                key={album.id}
                className="album-card"
                onClick={() => handleAlbumClick(album)}
              >
                <div className="cover-container">
                  <LazyImage 
                    src={album.cover} 
                    alt={album.title}
                    className="album-cover"
                  />
                  <div className="title-overlay">
                    <h3>{album.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="gallery-view">
            <button 
              onClick={handleBackClick}
              className="back-button"
            >
              <HiOutlineArrowLeft className="back-icon" />
              <span>Back to Galleries</span>
            </button>

            <h2 className="gallery-title">{activeAlbum.title}</h2>

            <Fancybox>
              <div className="masonry-grid">
                {activeAlbum.images.map((img, index) => (
                  <a
                    key={index}
                    href={img}
                    data-fancybox={activeAlbum.id}
                    className="gallery-item"
                  >
                    <img 
                      src={img} 
                      alt={`${activeAlbum.title} ${index + 1}`} 
                      loading="lazy"
                      onLoad={(e) => e.target.classList.add('loaded')}
                    />
                  </a>
                ))}
              </div>
            </Fancybox>
            
            <div className="reviews-container">
              {activeAlbum ? (
                <Reviews albumId={activeAlbum.id} showAll={false} />
              ) : null}
            </div>

            <div className="back-button-container">
              <button 
                onClick={handleBackClick}
                className="back-button"
              >
                <HiOutlineArrowLeft className="back-icon" />
                <span>Back to Galleries</span>
              </button>
            </div>
          </div>
        )}

        {!activeAlbum && (
          <div className="reviews-container">
            <Reviews showAll={true} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;