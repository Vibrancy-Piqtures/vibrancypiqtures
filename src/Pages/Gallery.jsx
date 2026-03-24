import React, { useState } from 'react';
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

const Gallery = () => {
  const [activeAlbum, setActiveAlbum] = useState(null);

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
                onClick={() => setActiveAlbum(album)}
              >
                <div className="cover-container">
                  <img 
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
              onClick={() => setActiveAlbum(null)}
              className="back-button"
            >
              <HiOutlineArrowLeft className="back-icon" />
              <span>Back</span>
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
                onClick={() => setActiveAlbum(null)}
                className="back-button"
              >
                <HiOutlineArrowLeft className="back-icon" />
                <span>Back</span>
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

