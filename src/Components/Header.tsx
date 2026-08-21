'use client';

import {
  useEffect,
  useRef,
  useState,
  ChangeEvent,
  KeyboardEvent,
  MouseEvent,
} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import ThemeToggle from '@/Components/ui/ThemeToggle';

interface SearchResult {
  type: 'page' | 'album';
  title: string;
  path: string;
  keywords: string[];
}

export default function Header() {
  const menuListRef = useRef<HTMLUListElement>(null);
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const buildSearchData = (): SearchResult[] => [
    { type: 'page', title: 'Home', path: '/', keywords: ['home', 'main'] },
    { type: 'page', title: 'Gallery', path: '/gallery', keywords: ['gallery', 'photos', 'pictures', 'images'] },
    { type: 'page', title: 'Videos', path: '/videos', keywords: ['videos', 'films', 'movies'] },
    { type: 'page', title: 'About Us', path: '/about', keywords: ['about', 'team', 'info'] },
    { type: 'page', title: 'Contact Us', path: '/contact', keywords: ['contact', 'reach', 'message'] },
  ];
  const searchData = buildSearchData();

  const dismissKeyboard = () => searchInputRef.current?.blur();

  const resetSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setShowResults(false);
  };

  const toggleMenu = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setIsMenuOpen((prev) => !prev);
  };

  const toggleSearch = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const newVisible = !isSearchVisible;
    setIsSearchVisible(newVisible);
    if (newVisible) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    } else {
      dismissKeyboard();
      resetSearch();
    }
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase().trim();
    setSearchQuery(query);
    if (query.length >= 1) {
      const filtered = searchData.filter((item) =>
        `${item.title} ${item.keywords.join(' ')}`.toLowerCase().includes(query),
      );
      setSearchResults(filtered.slice(0, 5));
      setShowResults(true);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  };

  const handleSearchSelect = (result: SearchResult) => {
    dismissKeyboard();
    resetSearch();
    setIsSearchVisible(false);
    setIsMenuOpen(false);
    router.push(result.path);
  };

  const handleSearchKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchResults.length > 0) {
      e.preventDefault();
      dismissKeyboard();
      handleSearchSelect(searchResults[0]);
    } else if (e.key === 'Escape') {
      dismissKeyboard();
      setShowResults(false);
      setSearchQuery('');
      setIsSearchVisible(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: globalThis.MouseEvent) => {
      const target = event.target as Node;
      if (menuListRef.current && !menuListRef.current.contains(target)) {
        setIsMenuOpen(false);
      }
      if (searchContainerRef.current && !searchContainerRef.current.contains(target)) {
        setShowResults(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Videos', href: '/videos' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact Us', href: '/contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full h-20 px-4 sm:px-6 lg:px-8 flex justify-between items-center shadow-md z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-header-bg/95 dark:bg-header-bg-dark/95 backdrop-blur-md'
            : 'bg-header-bg dark:bg-header-bg-dark'
        }`}
      >
        <h1>
          <Link href="/" className="flex items-center">
            <Image
              src="/assets/Logo/Vibrancy-Logo.png"
              alt="Vibrancy Piqtures Logo"
              width={100}
              height={40}
              priority
              className="w-full max-w-28 sm:max-w-32 mt-4 transition-filter dark:brightness-0 dark:invert"
            />
          </Link>
        </h1>

        <nav className="flex items-center gap-3 sm:gap-4">
          {/* Search */}
          <div ref={searchContainerRef} className="relative flex items-center h-10">
            <div className="relative h-10">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search albums, clients, events..."
                value={searchQuery}
                onChange={handleSearch}
                onKeyDown={handleSearchKeyDown}
                className={`h-full border-none rounded-full outline-none bg-search-bg dark:bg-search-bg-dark text-header-text dark:text-header-text-dark transition-all duration-300 text-sm ${
                  isSearchVisible
                    ? 'w-72 max-sm:w-28 opacity-100 px-4 max-sm:px-3'
                    : 'w-0 opacity-0 px-0'
                }`}
              />

              {showResults && searchResults.length > 0 && (
                <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-80 max-sm:w-72 bg-search-dropdown-bg dark:bg-search-dropdown-bg-dark border border-search-dropdown-border dark:border-search-dropdown-border-dark rounded-lg shadow-lg z-50 max-h-75 overflow-y-auto animate-slideDown">
                  {searchResults.map((result, index) => (
                    <div
                      key={index}
                      onClick={() => handleSearchSelect(result)}
                      onMouseDown={(e) => e.preventDefault()}
                      className="flex items-start gap-2.5 px-4 py-3 cursor-pointer border-b border-search-dropdown-border dark:border-search-dropdown-border-dark last:border-b-0 hover:bg-search-dropdown-hover dark:hover:bg-search-dropdown-hover-dark transition-colors"
                    >
                      <span className="text-[0.65rem] uppercase bg-header-text dark:bg-header-text-dark text-header-bg dark:text-header-bg-dark px-2 py-1 rounded font-semibold tracking-wide whitespace-nowrap">
                        {result.type}
                      </span>
                      <span className="text-header-text dark:text-header-text-dark text-sm leading-relaxed wrap-break-word">
                        {result.title}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={toggleSearch}
              aria-label="Toggle search"
              className="bg-transparent border-none cursor-pointer p-2 rounded-full w-10 h-10 flex items-center justify-center text-search-icon dark:text-search-icon-dark hover:bg-search-icon-hover dark:hover:bg-search-icon-hover-dark transition-colors z-10"
            >
              <svg viewBox="0 0 515.9 728.5" className="w-8 h-8 mb-2.5 fill-current">
                <path d="M472.8,653.9c-34.2-35.4-69.1-70.4-103.6-105.8c-12.2-12.2-23-25.4-41.9-30c-16.7-4.3-19.5-19.7-10.8-34.7c14.7-25,23.7-51.5,23.4-81.2c-0.7-9.7-0.3-19.3-2.4-28.2c-13.6-66.1-52.3-109.4-116.2-125.5c-64.2-16.4-124.5,8.6-162.9,64.4c-40.8,59-33.5,144.8,16.4,197c51.3,53.3,138.5,62.9,196.4,20.4c10.5-7.9,15.3-5.7,24.1,2.9c11.2,11.1,8.7,27.5,19.9,38.6c40.8,40,80.2,81.2,120.3,121.6c15.3,15.4,30.3,16.1,42.6,3.2C488.8,683.6,487.8,669.7,472.8,653.9z M184.3,523.4c-67.3-0.4-121-55.1-121-123.3c0-68.6,55.1-124.1,123.1-123c66.3,0.7,121.4,57.6,120.7,124.4C306.4,469.1,251.3,523.8,184.3,523.4z" />
              </svg>
            </button>
          </div>

          {/* Mobile menu toggle */}
          <button
            ref={menuToggleRef}
            type="button"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            className="hidden max-lg:flex items-center justify-center p-2 cursor-pointer bg-transparent border-none text-menu-icon dark:text-menu-icon-dark hover:scale-110 transition-transform z-50"
          >
            <svg viewBox="0 0 120 100" className="w-7.5 h-7.5 fill-current">
              <rect x="10" y="10" width="100" height="15" rx="7" ry="7" />
              <rect x="10" y="40" width="100" height="15" rx="7" ry="7" />
              <rect x="10" y="70" width="100" height="15" rx="7" ry="7" />
            </svg>
          </button>

          {/* Menu */}
          <ul
            ref={menuListRef}
            className={`list-none p-0 m-0 flex items-center gap-2 lg:gap-4 transition-all duration-300 ease-out
              max-lg:fixed max-lg:top-0 max-lg:right-0 max-lg:w-80 max-sm:w-72 max-lg:flex-col max-lg:bg-mobile-menu-bg dark:max-lg:bg-mobile-menu-bg-dark max-lg:backdrop-blur max-lg:shadow-lg max-lg:rounded-l-lg max-lg:z-50
              max-lg:pt-24 max-lg:pb-8 max-lg:px-4
              max-lg:max-h-[calc(100vh-2rem)] max-lg:overflow-y-auto
              ${isMenuOpen ? 'max-lg:translate-x-0' : 'max-lg:translate-x-full'}
            `}
          >
            {navLinks.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href} className="max-lg:w-full max-lg:px-2.5 max-lg:py-2">
                  <Link
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`block px-3 py-2.5 rounded font-medium text-base lg:text-[1.05rem] text-header-text dark:text-header-text-dark hover:bg-header-hover dark:hover:bg-header-hover-dark transition-colors ${
                      isActive
                        ? 'relative font-semibold after:content-[""] after:absolute after:left-3 after:right-5 after:bottom-1 after:h-0.5 after:bg-header-text dark:after:bg-header-text-dark after:rounded-full'
                        : ''
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}

            {/* WhatsApp button in mobile menu */}
            <li className="hidden max-lg:block w-full px-2.5 py-2">
              <a
                href="https://wa.me/0767810246"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full px-3 py-3 rounded-lg bg-green-500 text-white font-medium hover:bg-green-600 transition-colors"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp Us
              </a>
            </li>

            <li className="hidden max-lg:block w-full border-t border-header-hover dark:border-header-hover-dark mt-2">
              <div className="flex items-center justify-between w-full px-5 py-3 text-header-text dark:text-header-text-dark font-medium">
                <span>Theme Settings</span>
                <div className="ml-2">
                  <ThemeToggle />
                </div>
              </div>
            </li>
          </ul>
        </nav>
      </header>

      <div className="hidden lg:block fixed top-24 right-8 z-40">
        <ThemeToggle />
      </div>
    </>
  );
}
