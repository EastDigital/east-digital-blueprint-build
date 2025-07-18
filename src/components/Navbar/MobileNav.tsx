import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Sparkles } from 'lucide-react';
import { NavDropdown } from './NavDropdown';

interface MobileNavProps {
  isMenuOpen: boolean;
  isDropdownOpen: boolean;
  onDropdownToggle: (e: React.MouseEvent | React.TouchEvent) => void;
  closeDropdown: () => void;
  onMobileDropdownItemClick: () => void;
  mobileDropdownRef: React.RefObject<HTMLDivElement>;
}

export const MobileNav = ({ 
  isMenuOpen, 
  isDropdownOpen, 
  onDropdownToggle, 
  closeDropdown, 
  onMobileDropdownItemClick,
  mobileDropdownRef 
}: MobileNavProps) => {
  if (!isMenuOpen) return null;

  return (
    <div className="lg:hidden fixed inset-x-0 top-20 z-40 max-h-[calc(100vh-5rem)] overflow-y-auto">
      <div className="glass-mobile-nav mx-4 rounded-2xl">
        <div className="py-6 animate-fade-in">
          <nav className="flex flex-col space-y-6 px-6">
            <a href="/" className="text-base font-normal tracking-wider text-white hover:text-eastdigital-hover transition-colors duration-200">Home</a>
            
            <div ref={mobileDropdownRef}>
              <button 
                className="flex justify-between items-center text-base font-normal tracking-wider text-white w-full"
                onClick={onDropdownToggle}
              >
                <span>Expertise</span>
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isDropdownOpen && (
                <div className="mt-4 -mx-6">
                  <NavDropdown 
                    isOpen={isDropdownOpen} 
                    onClose={closeDropdown} 
                    isMobile={true}
                    onItemClick={onMobileDropdownItemClick}
                  />
                </div>
              )}
            </div>

            <a href="/impact" className="text-base font-normal tracking-wider text-white hover:text-eastdigital-hover transition-colors duration-200">Impact</a>
            <a href="/approach" className="text-base font-normal tracking-wider text-white hover:text-eastdigital-hover transition-colors duration-200">Approach</a>
            <a href="/connect" className="text-base font-normal tracking-wider text-white hover:text-eastdigital-hover transition-colors duration-200">Connect</a>
            
            <div className="pt-2">
              <Link to="/enquiry">
                <button className="frosted-glass-cta group relative overflow-hidden w-full">
                  <div className="relative z-10 flex flex-col items-center font-poppins text-white">
                    <div className="flex items-center gap-2 font-medium">
                      <Sparkles className="h-4 w-4" />
                      <span>Get Your Blueprint</span>
                    </div>
                    <span className="text-xs font-light opacity-80 -mt-1">Instant Quote</span>
                  </div>
                </button>
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};
