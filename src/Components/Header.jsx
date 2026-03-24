import React, { useEffect, useRef, useState } from 'react';
import ThemeToggle from '../Components/ThemeToggle';
import { NavLink } from 'react-router-dom';
import './Header.css';
import Logo from '../assets/IndexImages/Logo.png';

function Header() {
  const menuListRef = useRef(null);
  const menuToggleRef = useRef(null);
  const searchContainerRef = useRef(null);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = (event) => {
    event.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = (event) => {
    event.preventDefault();
    setIsSearchVisible(!isSearchVisible);
    if (!isSearchVisible) {
      setTimeout(() => {
        searchContainerRef.current.querySelector('input').focus();
      }, 10);
    }
  };

  const closeMenuOnClickOutside = (event) => {
    if (menuListRef.current && !menuListRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener("click", closeMenuOnClickOutside);
    } else {
      document.removeEventListener("click", closeMenuOnClickOutside);
    }

    return () => {
      document.removeEventListener("click", closeMenuOnClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <header>
      <h1>
        <a href="/">
          <img src={Logo} alt="Vibrancy Piqtures Logo" className="logo" />
        </a>
      </h1>
      <nav>
        {/* Desktop Theme Toggle */}
        <div className="desktop-theme-toggle">
          <ThemeToggle />
        </div>
        
        <div 
          className={`search-container ${isSearchVisible ? 'active' : ''}`} 
          ref={searchContainerRef}
        >
          <input 
            type="text" 
            placeholder="Search..." 
            className="search-input" 
          />
          <button 
            type="button" 
            className="search-button" 
            onClick={toggleSearch}
            aria-label="Toggle search"
          >
            <svg
              version="1.1"
              id="Layer_1"
              x="0px"
              y="0px"
              viewBox="0 0 515.9 728.5"
            >
              <path
                fill="currentColor"
                d="M472.8,653.9c-34.2-35.4-69.1-70.4-103.6-105.8c-12.2-12.2-23-25.4-41.9-30c-16.7-4.3-19.5-19.7-10.8-34.7
              c14.7-25,23.7-51.5,23.4-81.2c-0.7-9.7-0.3-19.3-2.4-28.2c-13.6-66.1-52.3-109.4-116.2-125.5c-64.2-16.4-124.5,8.6-162.9,64.4
              c-40.8,59-33.5,144.8,16.4,197c51.3,53.3,138.5,62.9,196.4,20.4c10.5-7.9,15.3-5.7,24.1,2.9c11.2,11.1,8.7,27.5,19.9,38.6
              c40.8,40,80.2,81.2,120.3,121.6c15.3,15.4,30.3,16.1,42.6,3.2C488.8,683.6,487.8,669.7,472.8,653.9z M184.3,523.4
              c-67.3-0.4-121-55.1-121-123.3c0-68.6,55.1-124.1,123.1-123c66.3,0.7,121.4,57.6,120.7,124.4C306.4,469.1,251.3,523.8,184.3,523.4z"
              />
            </svg>
          </button>
        </div>

        <button 
          className="menu-toggle" 
          id="show-menu" 
          onClick={toggleMenu}
          ref={menuToggleRef}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 100" width="30" height="30">
            <rect x="10" y="10" width="100" height="15" rx="7" ry="7" />
            <rect x="10" y="40" width="100" height="15" rx="7" ry="7" />
            <rect x="10" y="70" width="100" height="15" rx="7" ry="7" />
          </svg>
        </button>

        <ul className={`menu ${isMenuOpen ? 'show-menu' : ''}`} id="menu-list" ref={menuListRef}>
          <li className="nav-item">
            <NavLink 
              to="/" 
              className={({ isActive }) => isActive ? 'active-link' : ''}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink 
              to="/Gallery" 
              className={({ isActive }) => isActive ? 'active-link' : ''}
              onClick={() => setIsMenuOpen(false)}
            >
              Gallery
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink 
              to="/Videos" 
              className={({ isActive }) => isActive ? 'active-link' : ''}
              onClick={() => setIsMenuOpen(false)}
            >
              Videos
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink 
              to="/AboutUs" 
              className={({ isActive }) => isActive ? 'active-link' : ''}
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink 
              to="/ContactUs" 
              className={({ isActive }) => isActive ? 'active-link' : ''}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact Us
            </NavLink>
          </li>
          
          {/* Theme Toggle */}
          <li className="theme-menu-item" onClick={(e) => e.stopPropagation()}>
            <div className="theme-menu-content">
              <span>Theme Settings</span>
              <div className="theme-toggle-wrapper">
                <ThemeToggle />
              </div>
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
