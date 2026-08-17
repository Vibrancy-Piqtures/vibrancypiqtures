'use client';

const OfflineNotice = () => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-9999 animate-fadeIn"
      role="alert"
      style={{ backgroundColor: 'var(--color-bg, #ffffff)' }}
    >
      <div className="text-center p-8 max-w-100">
        <div className="text-(--color-primary,#114747) opacity-80 mb-6">
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M1 1l22 22" />
            <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55" />
            <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39" />
            <path d="M10.71 5.05A16 16 0 0 1 22.58 9" />
            <path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88" />
            <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
            <line x1="12" y1="20" x2="12.01" y2="20" />
          </svg>
        </div>
        <h2 className="text-[1.8rem] mb-4 text-(--color-text,#333)">
          You're Offline
        </h2>
        <p className="text-(--color-text,#666) opacity-80 mb-2">
          Please check your internet connection
        </p>
        <p className="text-(--color-text,#666) text-sm opacity-60">
          Some content may not be available
        </p>
      </div>

      <style>{`
        [data-theme="dark"] .offline-overlay {
          background-color: var(--color-dark-bg, #121212);
        }
      `}</style>
    </div>
  );
};

export default OfflineNotice;
