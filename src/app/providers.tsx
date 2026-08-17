'use client';

import { useState, useEffect } from 'react';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import ScrollToTopButton from '@/Components/ScrollToTopButton';
import OfflineNotice from '@/Components/OfflineNotice';
import PageTransition from '@/Components/PageTransition';
import { ThemeProvider } from '@/lib/context/ThemeContext';
import WhatsAppButton from '@/Components/WhatsAppButton';

export default function Providers({ children }: { children: React.ReactNode }) {
  const [isOnline, setIsOnline] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateOnline = () => setIsOnline(navigator.onLine);
    updateOnline();
    window.addEventListener('online', updateOnline);
    window.addEventListener('offline', updateOnline);
    return () => {
      window.removeEventListener('online', updateOnline);
      window.removeEventListener('offline', updateOnline);
    };
  }, []);

  return (
    <ThemeProvider>
      <Header />
      <main className="flex-1">
        {mounted && !isOnline && <OfflineNotice />}
        <PageTransition>{children}</PageTransition>
      </main>
      <WhatsAppButton />
      <ScrollToTopButton />
      <Footer />
    </ThemeProvider>
  );
}