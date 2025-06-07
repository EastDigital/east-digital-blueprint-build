
import React from 'react';
import { ChevronDown } from 'lucide-react';

interface DesktopNavProps {
  isDropdownOpen: boolean;
  onExpertiseEnter: () => void;
  onExpertiseLeave: () => void;
  onDropdownToggle: (e: React.MouseEvent | React.TouchEvent) => void;
  dropdownContainerRef: React.RefObject<HTMLDivElement>;
}

export const DesktopNav = ({ 
  isDropdownOpen, 
  onExpertiseEnter, 
  onExpertiseLeave, 
  onDropdownToggle,
  dropdownContainerRef 
}: DesktopNavProps) => {
  return (
    <nav className="hidden lg:flex items-center">
      <ul className="flex items-center space-x-8">
        <li>
          <a href="/" className="text-base font-normal tracking-wider text-white hover:text-eastdigital-hover transition-colors duration-200">Home</a>
        </li>
        <li className="relative">
          <div 
            ref={dropdownContainerRef}
            className="relative"
            onMouseEnter={onExpertiseEnter}
            onMouseLeave={onExpertiseLeave}
          >
            {/* Compact rounded glass effect like Google's design */}
            {isDropdownOpen && (
              <div className="absolute -top-0 -left-2 -right-2 h-[calc(100%+8px)] bg-white/8 backdrop-blur-sm rounded-xl border border-white/10 z-40"></div>
            )}
            
            <button 
              className={`relative z-50 flex items-center text-base font-normal tracking-wider transition-colors duration-200 px-2 py-1 rounded-lg ${isDropdownOpen ? 'text-eastdigital-orange' : 'text-white hover:text-eastdigital-hover'}`}
              onClick={onDropdownToggle}
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
  );
};
