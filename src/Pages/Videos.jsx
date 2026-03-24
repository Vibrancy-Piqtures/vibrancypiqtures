import React from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';
import './Videos.css';

const videoModules = import.meta.glob('../assets/Gallery/Videos/*.mp4', { eager: true });
const thumbModules = import.meta.glob('../assets/Gallery/Videos/*.png', { eager: true });

const VIDEO_DATA = [
  {
    id: 1,
    title: "Bruce & Maria's Wedding",
    filename: "wedding1",
    portrait: true,
    duration: "1:37",
    date: "June 12, 2024"
  },
  {
    id: 2,
    title: "Jonathan & Comfort's Wedding",
    filename: "wedding2",
    portrait: false,
    duration: "00:50",
    date: "August 5, 2024"
  },
  {
    id: 3,
    title: "Websater & Hamidah's Introduction",
    filename: "wedding3",
    portrait: true,
    duration: "2:38",
    date: "September 20, 2024"
  }
].map(video => {
  const videoKey = Object.keys(videoModules).find(key => key.includes(`${video.filename}.mp4`));
  const thumbKey = Object.keys(thumbModules).find(key => key.includes(`${video.filename}.png`));

  return {
    ...video,
    url: videoKey ? videoModules[videoKey].default : null,
    thumbnail: thumbKey ? thumbModules[thumbKey].default : null
  };
});

const VideoCard = ({ video }) => (
  <div className={`video-card ${video.portrait ? 'portrait' : 'landscape'}`}>
    <div className="video-wrapper">
      <ReactPlayer
        url={video.url}
        light={video.thumbnail}
        width="100%"
        height="100%"
        controls
        playIcon={
          <div className="play-icon">
            <svg viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" fill="currentColor" />
            </svg>
          </div>
        }
        config={{
          file: {
            attributes: {
              controlsList: 'nodownload',
              disablePictureInPicture: true
            }
          }
        }}
      />
    </div>
    <div className="video-info">
      <h3>{video.title}</h3>
      <div className="video-meta">
        <span className="video-duration">{video.duration}</span>
        <span className="video-date">{video.date}</span>
      </div>
    </div>
  </div>
);

VideoCard.propTypes = {
  video: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string,
    thumbnail: PropTypes.string,
    portrait: PropTypes.bool.isRequired,
    duration: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired
  }).isRequired
};

const Videos = () => {
  const availableVideos = VIDEO_DATA.filter(video => video.url && video.thumbnail);

  return (
    <main>
      <div className="video-description">
        <h2>Our Events Videos</h2>
      </div>
      
      <div className="videos-container">
      {availableVideos.length > 0 ? (
        <section className="video-grid-container">
          <div className="video-grid">
            {availableVideos.map(video => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </section>
      ) : (
        <div className="no-videos">
          <p>No videos available at the moment.</p>
          <p>Please check your video file paths and try again.</p>
        </div>
      )}
      </div>
    </main>
  );
};

export default Videos;


