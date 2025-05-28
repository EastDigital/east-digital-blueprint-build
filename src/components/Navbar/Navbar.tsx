
import React, { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { NavDropdown } from './NavDropdown';
import { Button } from '@/components/ui/button';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

  const handleExpertiseHover = () => {
    setIsDropdownOpen(true);
  };

  const handleExpertiseLeave = () => {
    setIsDropdownOpen(false);
  };

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
              <li 
                className="relative"
                onMouseEnter={handleExpertiseHover}
                onMouseLeave={handleExpertiseLeave}
              >
                <button 
                  className={`flex items-center text-base font-medium tracking-wider transition-colors duration-200 ${isDropdownOpen ? 'text-eastdigital-orange' : 'text-white hover:text-eastdigital-hover'}`}
                  onClick={toggleDropdown}
                >
                  Expertise
                  <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
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
              <button 
                className="flex justify-between items-center text-base font-medium tracking-wider text-white"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span>Expertise</span>
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isDropdownOpen && (
                <div className="bg-gray-900 rounded-md p-4 ml-4">
                  <div className="space-y-6">
                    <div>
                      <a href="/3d-rendering-visualization" className="block text-eastdigital-orange font-semibold text-sm mb-1">
                        3D RENDERING & VISUALIZATION
                      </a>
                      <p className="text-xs text-eastdigital-lightgray mb-2">Bring Your Architectural Visions to Life</p>
                      <ul className="space-y-2 ml-2">
                        <li><a href="#architectural-3d-rendering" className="text-sm text-white hover:text-eastdigital-hover">Architectural 3D Rendering</a></li>
                        <li><a href="#architectural-walkthrough-videos" className="text-sm text-white hover:text-eastdigital-hover">Architectural Walkthrough Videos</a></li>
                        <li><a href="#vr-ready-property-tours" className="text-sm text-white hover:text-eastdigital-hover">VR-Ready Property Tours</a></li>
                      </ul>
                    </div>
                    
                    <div>
                      <a href="/real-estate-digital-campaigns" className="block text-eastdigital-orange font-semibold text-sm mb-1">
                        REAL ESTATE DIGITAL CAMPAIGNS
                      </a>
                      <p className="text-xs text-eastdigital-lightgray mb-2">Drive Leads & Sales with Strategic Campaigns</p>
                      <ul className="space-y-2 ml-2">
                        <li><a href="#targeted-ads" className="text-sm text-white hover:text-eastdigital-hover">Targeted Facebook & Google Ads</a></li>
                        <li><a href="#drone-videography" className="text-sm text-white hover:text-eastdigital-hover">Drone Videography</a></li>
                        <li><a href="#broker-investor-outreach" className="text-sm text-white hover:text-eastdigital-hover">Broker & Investor Outreach</a></li>
                      </ul>
                    </div>
                    
                    <div>
                      <a href="/corporate-solutions" className="block text-eastdigital-orange font-semibold text-sm mb-1">
                        CORPORATE SOLUTIONS
                      </a>
                      <p className="text-xs text-eastdigital-lightgray mb-2">Elevate Your Brand and Connect</p>
                      <ul className="space-y-2 ml-2">
                        <li><a href="#brand-identity-design" className="text-sm text-white hover:text-eastdigital-hover">Brand Identity Design</a></li>
                        <li><a href="#ui-ux-design" className="text-sm text-white hover:text-eastdigital-hover">UI/UX Design</a></li>
                        <li><a href="#web-apps" className="text-sm text-white hover:text-eastdigital-hover">Web & Apps</a></li>
                      </ul>
                    </div>
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

      {/* Dropdown positioned outside container for edge-to-edge effect */}
      <NavDropdown isOpen={isDropdownOpen} onClose={closeDropdown} />
    </header>
  );
};

export default Navbar;
