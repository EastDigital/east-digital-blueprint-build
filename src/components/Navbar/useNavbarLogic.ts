import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useNavbarLogic = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const dropdownContainerRef = useRef<HTMLDivElement>(null);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (dropdownContainerRef.current && !dropdownContainerRef.current.contains(event.target as Node)) {
        if (window.innerWidth >= 1024) {
          const desktopDropdown = document.querySelector('.desktop-dropdown');
          if (desktopDropdown && !desktopDropdown.contains(event.target as Node)) {
            setIsDropdownOpen(false);
          }
        }
      }
      
      if (mobileDropdownRef.current && !mobileDropdownRef.current.contains(event.target as Node)) {
        if (window.innerWidth < 1024) {
          setIsDropdownOpen(false);
        }
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside, { passive: true });
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, [isDropdownOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isDropdownOpen) setIsDropdownOpen(false);
  };

  const toggleDropdown = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const handleExpertiseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setIsDropdownOpen(true);
  };

  const handleExpertiseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 150);
  };

  const handleMobileDropdownItemClick = () => {
    setIsDropdownOpen(false);
    setIsMenuOpen(false);
  };

  const getNavbarBackground = () => {
    // MODIFIED: Removed the 'border-b border-white/10' classes
    return isScrolled 
      ? 'bg-black/70 backdrop-blur-lg' 
      : 'bg-transparent';
  };

  return {
    isMenuOpen,
    isDropdownOpen,
    isScrolled,
    isHomePage: location.pathname === '/',
    dropdownContainerRef,
    mobileDropdownRef,
    toggleMenu,
    toggleDropdown,
    closeDropdown,
    handleExpertiseEnter,
    handleExpertiseLeave,
    handleMobileDropdownItemClick,
    getNavbarBackground,
  };
};