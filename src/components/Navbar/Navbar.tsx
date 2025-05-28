
import React, { useState, useRef, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { NavDropdown } from './NavDropdown';
import { Button } from '@/components/ui/button';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownContainerRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isDropdownOpen) setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
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

  // Handle clicks outside the dropdown and touch events for mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (dropdownContainerRef.current && !dropdownContainerRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, [isDropdownOpen]);

  const expertiseData = [
    {
      title: "3D RENDERING & VISUALIZATION",
      link: "/3d-rendering-visualization",
      shortText: "Bring Your Architectural Visions to Life with Photo-Realistic Precision.",
      subItems: [
        { title: "Architectural 3D Rendering", anchor: "#architectural-3d-rendering" },
        { title: "Architectural Walkthrough Videos", anchor: "#architectural-walkthrough-videos" },
        { title: "VR-Ready Property Tours", anchor: "#vr-ready-property-tours" }
      ],
      bottomText: "Ideal for: Developers, Architects, & Engineers to visualize and present projects."
    },
    {
      title: "REAL ESTATE DIGITAL CAMPAIGNS",
      link: "/real-estate-digital-campaigns",
      shortText: "Drive Leads & Sales with Strategic Digital Campaigns.",
      subItems: [
        { title: "Targeted Facebook & Google Ads", anchor: "#targeted-ads" },
        { title: "Drone Videography", anchor: "#drone-videography" },
        { title: "Broker & Investor Outreach", anchor: "#broker-investor-outreach" }
      ],
      bottomText: "Ideal for: Developers & Brokers to generate leads and drive property sales."
    },
    {
      title: "CORPORATE SOLUTIONS",
      link: "/corporate-solutions",
      shortText: "Elevate Your Brand and Connect with Your Audience.",
      subItems: [
        { title: "Brand Identity Design", anchor: "#brand-identity-design" },
        { title: "UI/UX Design", anchor: "#ui-ux-design" },
        { title: "Web & Apps", anchor: "#web-apps" }
      ],
      bottomText: "Ideal for: Companies building strong brands & digital platforms."
    }
  ];

  return (
    <header className="w-full bg-eastdigital-dark font-poppins relative">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-5">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/">
              <img 
                src="https://eastdigital.in/web-images/logo-east-digital-india" 
                alt="East Digital" 
                className="h-[54px] w-[162px]"
              />
            </a>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center">
            <ul className="flex space-x-10">
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
                    <div className="absolute -top-5 -left-6 -right-6 h-[calc(100%+25px)] bg-[#1A1A1A]/80 backdrop-blur-md rounded-t-[15px] z-40"></div>
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
              className="bg-eastdigital-gray text-white border border-eastdigital-orange hover:bg-eastdigital-orange transition-colors duration-200 rounded-[60px] py-3 px-6 text-base font-semibold"
            >
              Get Your Blueprint
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button 
              className="p-2 text-white"
              onClick={toggleMenu}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 pb-6 border-t border-gray-800 animate-fade-in">
            <nav className="flex flex-col space-y-4">
              <a href="/" className="text-base font-medium tracking-wider text-white hover:text-eastdigital-hover transition-colors duration-200">Home</a>
              
              <button 
                className="flex justify-between items-center text-base font-medium tracking-wider text-white"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span>Expertise</span>
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isDropdownOpen && (
                <div className="bg-[#1A1A1A]/80 backdrop-blur-md rounded-[15px] border border-gray-800/30 shadow-2xl overflow-hidden mx-2 animate-fade-in">
                  {/* Mobile glassmorphism dropdown with same structure as desktop */}
                  <div className="flex flex-col md:flex-row">
                    {expertiseData.map((item, index) => (
                      <React.Fragment key={index}>
                        <div className="flex-1 px-6 py-6">
                          <a 
                            href={item.link} 
                            className="block font-poppins text-sm md:text-base font-semibold bg-gradient-to-b from-[#FF6900] to-[#FBA971] bg-clip-text text-transparent hover:from-[#FF6900] hover:to-[#FF6900] transition-all duration-300 mb-2"
                            onClick={() => setIsDropdownOpen(false)}
                          >
                            {item.title}
                          </a>
                          
                          <p className="font-poppins text-xs font-normal text-[#999999] mb-4 leading-relaxed">
                            {item.shortText}
                          </p>
                          
                          <ul className="space-y-2 mb-4">
                            {item.subItems.map((subItem, subIndex) => (
                              <li key={subIndex}>
                                <a 
                                  href={subItem.anchor} 
                                  className="block font-poppins text-sm font-medium text-white hover:text-[#FFE0CA] transition-colors duration-200"
                                  onClick={() => setIsDropdownOpen(false)}
                                >
                                  {subItem.title}
                                </a>
                              </li>
                            ))}
                          </ul>
                          
                          <p className="font-poppins text-xs font-normal text-[#999999] leading-relaxed">
                            {item.bottomText}
                          </p>
                        </div>
                        {index < expertiseData.length - 1 && (
                          <div className="md:w-px md:bg-gray-700/50 h-px md:h-auto bg-gray-700/50 mx-6 md:mx-0"></div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              )}

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
        className={`hidden lg:block absolute top-full left-0 right-0 z-50 ${isDropdownOpen ? 'block' : 'hidden'}`}
      >
        <NavDropdown isOpen={isDropdownOpen} onClose={closeDropdown} />
      </div>
    </header>
  );
};

export default Navbar;
