
import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { NavDropdown } from './NavDropdown';
import { AnimatedHamburger } from './AnimatedHamburger';
import { Button } from '@/components/ui/button';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showCtaAnimation, setShowCtaAnimation] = useState(false);
  const dropdownContainerRef = useRef<HTMLDivElement>(null);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0);

      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Set timeout for CTA animation
      scrollTimeoutRef.current = setTimeout(() => {
        setShowCtaAnimation(scrollTop > 0);
      }, 2000);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

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

  return (
    <header className={`w-full font-poppins fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-eastdigital-dark/90 backdrop-blur-md border-b border-gray-800/30' 
        : 'bg-eastdigital-dark'
    }`}>
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
                <a href="/" className="text-base font-medium tracking-wider text-white hover:text-eastdigital-hover transition-colors duration-200">Home</a>
              </li>
              <li className="relative">
                <div 
                  ref={dropdownContainerRef}
                  className="relative"
                  onMouseEnter={handleExpertiseEnter}
                  onMouseLeave={handleExpertiseLeave}
                >
                  {/* Glassmorphism background that covers both button and creates seamless connection */}
                  {isDropdownOpen && (
                    <div className="absolute -top-5 -left-6 -right-6 h-[calc(100%+25px)] bg-[#000000]/85 backdrop-blur-md rounded-t-[15px] z-40"></div>
                  )}
                  
                  <button 
                    className={`relative z-50 flex items-center text-base font-medium tracking-wider transition-colors duration-200 px-2 py-1 ${isDropdownOpen ? 'text-eastdigital-orange' : 'text-white hover:text-eastdigital-hover'}`}
                    onClick={toggleDropdown}
                  >
                    Expertise
                    <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              </li>
              <li>
                <a href="/impact" className="text-base font-medium tracking-wider text-white hover:text-eastdigital-hover transition-colors duration-200">Impact</a>
              </li>
              <li>
                <a href="/approach" className="text-base font-medium tracking-wider text-white hover:text-eastdigital-hover transition-colors duration-200">Approach</a>
              </li>
              <li>
                <a href="/connect" className="text-base font-medium tracking-wider text-white hover:text-eastdigital-hover transition-colors duration-200">Connect</a>
              </li>
            </ul>
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button 
              className={`transition-all duration-500 ease-in-out border border-eastdigital-orange hover:bg-eastdigital-orange rounded-[60px] py-3 px-6 text-base font-semibold text-white ${
                showCtaAnimation 
                  ? 'bg-eastdigital-orange shadow-lg shadow-eastdigital-orange/30' 
                  : 'bg-eastdigital-gray'
              }`}
            >
              Get Your Blueprint
            </Button>
          </div>

          {/* Mobile Menu Button - Now using AnimatedHamburger */}
          <div className="lg:hidden">
            <AnimatedHamburger 
              isOpen={isMenuOpen}
              onClick={toggleMenu}
            />
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 pb-6 border-t border-gray-800 animate-fade-in">
            <nav className="flex flex-col space-y-6 ml-2.5">
              <a href="/" className="text-base font-medium tracking-wider text-white hover:text-eastdigital-hover transition-colors duration-200">Home</a>
              
              <div ref={mobileDropdownRef}>
                <button 
                  className="flex justify-between items-center text-base font-medium tracking-wider text-white w-full"
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

              <a href="/impact" className="text-base font-medium tracking-wider text-white hover:text-eastdigital-hover transition-colors duration-200">Impact</a>
              <a href="/approach" className="text-base font-medium tracking-wider text-white hover:text-eastdigital-hover transition-colors duration-200">Approach</a>
              <a href="/connect" className="text-base font-medium tracking-wider text-white hover:text-eastdigital-hover transition-colors duration-200">Connect</a>
              
              <div className="pt-2">
                <Button 
                  className="w-full bg-eastdigital-gray text-white border border-eastdigital-orange hover:bg-eastdigital-orange transition-colors duration-200 rounded-[60px] py-3 px-6 text-base font-semibold"
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
  );
};

export default Navbar;
