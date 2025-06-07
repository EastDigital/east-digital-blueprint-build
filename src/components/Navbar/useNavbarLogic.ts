
import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useNavbarLogic = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showCtaAnimation, setShowCtaAnimation] = useState(false);
  
  const dropdownContainerRef = useRef<HTMLDivElement>(null);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0);

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      if (isHomePage) {
        scrollTimeoutRef.current = setTimeout(() => {
          setShowCtaAnimation(scrollTop > 0);
        }, 2000);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [isHomePage]);

  // Handle clicks outside the dropdown
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
    if (!isHomePage) {
      return 'bg-eastdigital-dark';
    }
    
    return isScrolled 
      ? 'bg-eastdigital-dark/90 backdrop-blur-md' 
      : 'bg-transparent';
  };

  return {
    isMenuOpen,
    isDropdownOpen,
    isScrolled,
    showCtaAnimation,
    isHomePage,
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
