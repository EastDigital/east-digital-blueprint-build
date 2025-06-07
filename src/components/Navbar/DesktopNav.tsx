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
            {/* MODIFIED: Classes updated for Google AI-style glassmorphism effect */}
            {isDropdownOpen && (
              <div className="absolute -inset-y-1.5 -inset-x-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 z-40 transition-all duration-300"></div>
            )}
            
            <button 
              className={`relative z-50 flex items-center text-base font-normal tracking-wider transition-colors duration-200 px-2 py-1 rounded-lg ${isDropdownOpen ? 'text-white' : 'text-white hover:text-eastdigital-hover'}`}
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