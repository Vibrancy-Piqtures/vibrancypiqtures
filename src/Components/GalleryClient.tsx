'use client';

import { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import FancyboxMasonry from '@/Components/FancyboxMasonry';
import { GalleryCategory } from '@/lib/data/gallery-data';

interface GalleryClientProps {
  categories: GalleryCategory[];
}

export default function GalleryClient({ categories }: GalleryClientProps) {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px 0px' });

  const allImages = useMemo(() => {
    return categories.flatMap((cat) =>
      cat.images.map((img) => ({
        image: img,
        categoryId: cat.id,
        categoryLabel: cat.label,
      }))
    );
  }, [categories]);

  const filteredImages = useMemo(() => {
    let items = allImages;

    if (activeTab !== 'all') {
      items = items.filter((item) => item.categoryId === activeTab);
    }

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      items = items.filter(
        (item) =>
          item.image.searchText.includes(term) ||
          item.categoryLabel.toLowerCase().includes(term)
      );
    }

    return items;
  }, [allImages, activeTab, searchTerm]);

  const photos = useMemo(() => {
    return filteredImages.map((item) => ({
      src: item.image.src,
      alt: item.categoryLabel,
      width: 1200,
      height: 800,
    }));
  }, [filteredImages]);

  const fancyboxGroup = `gallery-${activeTab}-${searchTerm.trim().toLowerCase()}`;

  const tabs = [
    { id: 'all', label: 'All' },
    ...categories.map((cat) => ({ id: cat.id, label: cat.label })),
  ];

  return (
    <motion.section
      ref={sectionRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="py-12 md:py-20 px-4 sm:px-6 lg:px-8"
    >
      {/* Search Bar */}
      <div className="mb-10 max-w-md mx-auto">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by name or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search gallery"
            className="w-full px-4 py-3 pl-10 border border-footer-border dark:border-footer-border-dark rounded-full bg-search-bg dark:bg-search-bg-dark text-header-text dark:text-header-text-dark focus:outline-none focus:ring-2 focus:ring-footer-accent"
          />
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-footer-secondary dark:text-footer-secondary-dark"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div
        role="tablist"
        aria-label="Gallery filters"
        className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12"
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-5 sm:px-6 py-2.5 rounded-md text-sm sm:text-base font-medium transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-footer-accent ${
                isActive
                  ? 'text-white dark:text-white'
                  : 'text-footer-secondary dark:text-footer-secondary-dark hover:text-header-text dark:hover:text-header-text-dark bg-footer-bg/5 dark:bg-footer-bg-dark/5 hover:bg-footer-bg/10 dark:hover:bg-footer-bg-dark/10'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTabBackground"
                  className="absolute inset-0 bg-footer-accent rounded-md"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  style={{ zIndex: -1 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Gallery Masonry Grid */}
      <div className="min-h-100 md:min-h-125">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab + searchTerm}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {filteredImages.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-footer-secondary dark:text-footer-secondary-dark text-lg">
                  No images found.
                </p>
              </div>
            ) : (
              <FancyboxMasonry photos={photos} groupName={fancyboxGroup} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.section>
  );
}