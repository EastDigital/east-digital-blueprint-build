
import React from 'react';
import { ChevronDown } from 'lucide-react';
import { NavDropdown } from './NavDropdown';
import { Button } from '@/components/ui/button';

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
    <div className="lg:hidden relative">
      {/* Mobile Menu Background with Home Page Gradient */}
      <div className="absolute inset-0 -mx-4 py-4 pb-6">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-600/25 via-blue-600/20 via-cyan-500/15 to-transparent opacity-70"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/15 via-orange-400/12 via-yellow-300/8 to-transparent opacity-50"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400/12 via-blue-500/15 via-purple-600/10 to-transparent opacity-60"></div>
        <div className="absolute inset-0 bg-eastdigital-dark/80 backdrop-blur-xl"></div>
      </div>
      
      <div className="relative z-10 py-4 pb-6 animate-fade-in">
        <nav className="flex flex-col space-y-6 ml-2.5">
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
              <div className="mt-4">
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
            <Button 
              className="w-full bg-eastdigital-orange text-white border border-eastdigital-orange hover:bg-eastdigital-orange/90 transition-colors duration-200 rounded-[60px] py-3 px-6 text-base font-semibold"
            >
              Get Your Blueprint
            </Button>
          </div>
        </nav>
      </div>
    </div>
  );
};
