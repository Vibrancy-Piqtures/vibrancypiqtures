import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/', 
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'index.html'],
      manifest: {
        name: 'Vibrancy Piqtures Weddings',
        short_name: 'VibrancyWeddings',
        description: 'Professional wedding photography services.',
        theme_color: '#ffffff',
        icons: [], 
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,ico}'],
        maximumFileSizeToCacheInBytes: 50000000,
      },
    }),
  ],
});