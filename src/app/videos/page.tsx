'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

const videoData = [
  {
    id: 1,
    title: "Bruce & Maria's Wedding",
    url: '/assets/Gallery/Videos/wedding1.mp4',
    thumbnail: '/assets/Gallery/Videos/wedding1.png',
    duration: '1:37',
    date: 'June 12, 2024',
  },
  {
    id: 2,
    title: "Jonathan & Comfort's Wedding",
    url: '/assets/Gallery/Videos/wedding2.mp4',
    thumbnail: '/assets/Gallery/Videos/wedding2.png',
    duration: '00:50',
    date: 'August 5, 2024',
  },
  {
    id: 3,
    title: "Webster & Hamidah's Introduction",
    url: '/assets/Gallery/Videos/wedding3.mp4',
    thumbnail: '/assets/Gallery/Videos/wedding3.png',
    duration: '2:38',
    date: 'September 20, 2024',
  },
];

const VideoCard = ({ video, index = 0 }: { video: typeof videoData[0]; index?: number }) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <div 
      className="bg-white dark:bg-[#1e1e1e] rounded-md overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 w-full max-w-100 animate-fade-in-up"
      style={{ animationDelay: `${(index + 1) * 0.1}s` }}
    >
      <div className="relative aspect-video bg-black">
        {hasMounted ? (
          <ReactPlayer
            url={video.url}
            light={video.thumbnail}
            width="100%"
            height="100%"
            controls
            playIcon={
              <div className="w-16 h-16 bg-white/70 rounded-md flex items-center justify-center text-black hover:bg-white/90 transition-all shadow-md">
                <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            }
            config={{
              file: {
                attributes: {
                  controlsList: 'nodownload',
                  disablePictureInPicture: true,
                },
              },
            }}
          />
        ) : (
          <div className="w-full h-full relative">
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <div className="w-16 h-16 bg-white/70 rounded-md flex items-center justify-center text-black shadow-md">
                <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold text-(--color-text) transition-colors duration-300">
          {video.title}
        </h3>
        <div className="flex justify-center gap-4 text-sm text-(--color-text-light) mt-1">
          <span>{video.duration}</span>
          <span>{video.date}</span>
        </div>
      </div>
    </div>
  );
};

export default function VideosPage() {
  const availableVideos = videoData.filter((v) => v.url && v.thumbnail);

  return (
    <main className="bg-(--color-bg) text-(--color-text) transition-colors duration-300 min-h-screen px-6 pt-28 pb-10 md:px-10 lg:pt-32 lg:pb-16">
      <div className="max-w-300 mx-auto">
        
        {/* Header Section */}
        <div className="bg-white dark:bg-[#1e1e1e] rounded-md p-6 md:p-10 text-center max-w-225 mx-auto mb-12 shadow-sm animate-fade-in-up">
          <h2 className="text-2xl md:text-4xl font-semibold text-(--color-text) transition-colors duration-300">
            Our Events Videos
          </h2>
          <div className="h-1 w-20 bg-(--color-primary) mx-auto mt-4 rounded-sm"></div>
        </div>

        {/* Video Grid Section */}
        {availableVideos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {availableVideos.map((video, index) => (
              <VideoCard key={video.id} video={video} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-(--color-text-light) animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <p>No videos available at the moment.</p>
            <p>Please check your video file paths and try again.</p>
          </div>
        )}
        
      </div>
    </main>
  );
}

