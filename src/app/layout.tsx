import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import Providers from './providers';

export const metadata: Metadata = {
  metadataBase: new URL('https://vibrancypiqtures.com'),
  title: 'Vibrancy Piqtures',
  description:
    'Professional photography and videography services in Kyanja, Kampala. We capture authentic moments and turn them into lasting memories.',
  openGraph: {
    title: 'Vibrancy Piqtures',
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

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'LocalBusiness',
      '@id': 'https://vibrancypiqtures.com/#organization',
      name: 'Vibrancy Piqtures',
      url: 'https://vibrancypiqtures.com',
      logo: 'https://vibrancypiqtures.com/images/og-image.jpg',
      image: 'https://vibrancypiqtures.com/images/og-image.jpg',
      telephone: '+256746711668',
      email: 'info@vibrancypiqtures.com',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Kyanja',
        addressRegion: 'Kampala',
        addressCountry: 'UG',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: '0.3800',
        longitude: '32.6000',
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '18:00',
        },
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: 'Saturday',
          opens: '10:00',
          closes: '16:00',
        },
      ],
      sameAs: [
        'https://www.instagram.com/vibrancypiqtures',
        'https://www.facebook.com/vibrancypiqtures',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://vibrancypiqtures.com/#website',
      url: 'https://vibrancypiqtures.com',
      name: 'Vibrancy Piqtures',
      publisher: {
        '@id': 'https://vibrancypiqtures.com/#organization',
      },
    },
  ],
};

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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col m-0 p-0 font-sans text-teal-950 dark:text-gray-200 bg-bg-primary dark:bg-bg-dark transition-colors duration-300 overflow-x-hidden">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}