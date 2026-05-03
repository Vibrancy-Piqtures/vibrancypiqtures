// Components/OfflineNotice.jsx
import React from 'react';
import './OfflineNotice.css';

const OfflineNotice = () => {
  return (
    <div className="offline-overlay" role="alert">
      <div className="offline-content">
        <div className="offline-icon">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M1 1l22 22" />
            <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55" />
            <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39" />
            <path d="M10.71 5.05A16 16 0 0 1 22.58 9" />
            <path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88" />
            <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
            <line x1="12" y1="20" x2="12.01" y2="20" />
          </svg>
        </div>
        <h2>You're Offline</h2>
        <p>Please check your internet connection</p>
        <p className="offline-subtitle">Some content may not be available</p>
      </div>
    </div>
  );
};

export default OfflineNotice;