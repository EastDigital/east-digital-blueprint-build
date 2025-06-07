import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { NavDropdown } from './NavDropdown';
import { AnimatedHamburger } from './AnimatedHamburger';
import { Button } from '@/components/ui/button';
import { useLocation } from 'react-router-dom';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showCtaAnimation, setShowCtaAnimation] = useState(false);
  const dropdownContainerRef = useRef<HTMLDivElement>(null);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const location = useLocation();
  
  // Check if we're on the home page
  const isHomePage = location.pathname === '/';

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0);

      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Set timeout for CTA animation only on home page
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
    // Clear any existing timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setIsDropdownOpen(true);
  };

  const handleExpertiseLeave = () => {
    // Set a timeout to close the dropdown after a delay
    hoverTimeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 150);
  };

  // Handle clicks outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      // For desktop dropdown
      if (dropdownContainerRef.current && !dropdownContainerRef.current.contains(event.target as Node)) {
        if (window.innerWidth >= 1024) {
          const desktopDropdown = document.querySelector('.desktop-dropdown');
          if (desktopDropdown && !desktopDropdown.contains(event.target as Node)) {
            setIsDropdownOpen(false);
          }
        }
      }
      
      // For mobile dropdown - only close on clicks outside the mobile dropdown container
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

  const handleMobileDropdownItemClick = () => {
    setIsDropdownOpen(false);
    setIsMenuOpen(false);
  };

  // Determine navbar background classes based on page and scroll state
  const getNavbarBackground = () => {
    if (!isHomePage) {
      // Inner pages: always show dark background
      return 'bg-eastdigital-dark';
    }
    
    // Home page: only show background when scrolled - removed border that causes white line
    return isScrolled 
      ? 'bg-eastdigital-dark/90 backdrop-blur-md' 
      : 'bg-transparent';
  };

  return (
    <>
      {/* Enhanced Gradient Animation Background - Only on Home Page */}
      {isHomePage && (
        <div className="fixed top-0 left-0 right-0 h-[300px] pointer-events-none z-40">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-600/25 via-blue-600/20 via-cyan-500/15 to-transparent opacity-70 animate-pulse"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/15 via-orange-400/12 via-yellow-300/8 to-transparent opacity-50 animate-pulse delay-1000"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400/12 via-blue-500/15 via-purple-600/10 to-transparent opacity-60 animate-pulse delay-2000"></div>
          {/* Additional seamless blend layer */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-eastdigital-dark/20"></div>
        </div>
      )}

      <header className={`w-full font-poppins fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${getNavbarBackground()}`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-5">
            {/* Logo */}
            <div className="flex-shrink-0">
              <a href="/">
                <img 
                  src="https://eastdigital.in/img/logo-east-digital.png" 
                  alt="East Digital" 
                  className="h-[54px] w-[162px]"
                />
              </a>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center">
              <ul className="flex items-center space-x-8">
                <li>
                  <a href="/" className="text-base font-normal tracking-wider text-white hover:text-eastdigital-hover transition-colors duration-200">Home</a>
                </li>
                <li className="relative">
                  <div 
                    ref={dropdownContainerRef}
                    className="relative"
                    onMouseEnter={handleExpertiseEnter}
                    onMouseLeave={handleExpertiseLeave}
                  >
                    {/* Compact rounded glass effect like Google's design */}
                    {isDropdownOpen && (
                      <div className="absolute -top-1 -left-2 -right-2 h-[calc(100%+8px)] bg-white/8 backdrop-blur-sm rounded-xl border border-white/10 z-40"></div>
                    )}
                    
                    <button 
                      className={`relative z-50 flex items-center text-base font-normal tracking-wider transition-colors duration-200 px-2 py-1 rounded-lg ${isDropdownOpen ? 'text-eastdigital-orange' : 'text-white hover:text-eastdigital-hover'}`}
                      onClick={toggleDropdown}
                    >
                      Expertise
                      <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
                </li>
                <li>
                  <a href="/impact" className="text-base font-normal tracking-wider text-white hover:text-eastdigital-hover transition-colors duration-200">Impact</a>
                </li>
                <li>
                  <a href="/approach" className="text-base font-normal tracking-wider text-white hover:text-eastdigital-hover transition-colors duration-200">Approach</a>
                </li>
                <li>
                  <a href="/connect" className="text-base font-normal tracking-wider text-white hover:text-eastdigital-hover transition-colors duration-200">Connect</a>
                </li>
              </ul>
            </nav>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <Button 
                className={`transition-all duration-500 ease-in-out bg-eastdigital-orange border border-eastdigital-orange hover:bg-eastdigital-orange/90 rounded-[60px] py-3 px-6 text-base font-semibold text-white ${
                  isHomePage && showCtaAnimation 
                    ? 'shadow-lg shadow-eastdigital-orange/30' 
                    : ''
                }`}
              >
                Get Your Blueprint
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <AnimatedHamburger 
                isOpen={isMenuOpen}
                onClick={toggleMenu}
              />
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden py-4 pb-6 animate-fade-in">
              <nav className="flex flex-col space-y-6 ml-2.5">
                <a href="/" className="text-base font-normal tracking-wider text-white hover:text-eastdigital-hover transition-colors duration-200">Home</a>
                
                <div ref={mobileDropdownRef}>
                  <button 
                    className="flex justify-between items-center text-base font-normal tracking-wider text-white w-full"
                    onClick={toggleDropdown}
                  >
                    <span>Expertise</span>
                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {isDropdownOpen && (
                    <div className="mt-4">
                      <NavDropdown 
                        isOpen={isDropdownOpen} 
                        onClose={closeDropdown} 
                        isMobile={true}
                        onItemClick={handleMobileDropdownItemClick}
                      />
                    </div>
                  )}
                </div>

                <a href="/impact" className="text-base font-normal tracking-wider text-white hover:text-eastdigital-hover transition-colors duration-200">Impact</a>
                <a href="/approach" className="text-base font-normal tracking-wider text-white hover:text-eastdigital-hover transition-colors duration-200">Approach</a>
                <a href="/connect" className="text-base font-normal tracking-wider text-white hover:text-eastdigital-hover transition-colors duration-200">Connect</a>
                
                <div className="pt-2">
                  <Button 
                    className="w-full bg-eastdigital-orange text-white border border-eastdigital-orange hover:bg-eastdigital-orange/90 transition-colors duration-200 rounded-[60px] py-3 px-6 text-base font-semibold"
                  >
                    Get Your Blueprint
                  </Button>
                </div>
              </nav>
            </div>
          )}
        </div>

        {/* Desktop Dropdown positioned with seamless hover connection */}
        <div
          onMouseEnter={handleExpertiseEnter}
          onMouseLeave={handleExpertiseLeave}
          className={`desktop-dropdown hidden lg:block absolute top-full left-0 right-0 z-50 ${isDropdownOpen ? 'block' : 'hidden'}`}
        >
          <NavDropdown isOpen={isDropdownOpen} onClose={closeDropdown} />
        </div>
      </header>
    </>
  );
};

export default Navbar;
