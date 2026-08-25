import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import Providers from './providers';

export const metadata: Metadata = {
  metadataBase: new URL('https://vibrancypiqtures.com'),

  title: 'Vibrancy Piqtures | Photography & Videography',
  description:
    'Professional photography and videography services in Kyanja, Kampala. We capture authentic moments and turn them into lasting memories.',

  openGraph: {
    title: 'Vibrancy Piqtures | Photography & Videography',
    description:
      'Professional photography and videography services in Kyanja, Kampala. We capture authentic moments and turn them into lasting memories.',
    url: 'https://vibrancypiqtures.com',
    siteName: 'Vibrancy Piqtures',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Vibrancy Piqtures photography and videography',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#114747',
};

const setInitialTheme = `
  (function() {
    try {
      const saved = localStorage.getItem('theme');
      const dark = saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
      document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    } catch (e) {}
  })();
`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className="scroll-smooth"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: setInitialTheme }} />
      </head>
      <body className="min-h-screen flex flex-col m-0 p-0 font-sans text-teal-950 dark:text-gray-200 bg-bg-primary dark:bg-bg-dark transition-colors duration-300 overflow-x-hidden">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
