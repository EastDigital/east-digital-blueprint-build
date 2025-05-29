
import React from 'react';
import { cn } from '@/lib/utils';

interface AnimatedHamburgerProps {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
}

export const AnimatedHamburger = ({ isOpen, onClick, className }: AnimatedHamburgerProps) => {
  return (
    <button
      className={cn(
        "relative w-8 h-8 p-1 focus:outline-none focus:ring-2 focus:ring-eastdigital-orange focus:ring-opacity-50 rounded-md transition-all duration-200",
        className
      )}
      onClick={onClick}
      aria-label={isOpen ? "Close menu" : "Open menu"}
    >
      <div
        className={cn(
          "absolute left-1 w-6 h-0.5 bg-white rounded-full transition-all duration-300 ease-in-out",
          isOpen 
            ? "top-1/2 transform -translate-y-0.5 rotate-45" 
            : "top-2"
        )}
      />
      
      <div
        className={cn(
          "absolute left-1 w-6 h-0.5 bg-white rounded-full transition-all duration-300 ease-in-out",
          isOpen 
            ? "opacity-0 scale-0" 
            : "top-1/2 transform -translate-y-0.5 opacity-100 scale-100"
        )}
      />
      
      <div
        className={cn(
          "absolute left-1 w-6 h-0.5 bg-white rounded-full transition-all duration-300 ease-in-out",
          isOpen 
            ? "top-1/2 transform -translate-y-0.5 -rotate-45" 
            : "bottom-2"
        )}
      />
      
      <div
        className={cn(
          "absolute inset-0 rounded-md transition-all duration-300 ease-in-out",
          isOpen 
            ? "bg-white/5 scale-110" 
            : "bg-transparent scale-100"
        )}
      />
    </button>
  );
};

export default AnimatedHamburger;
