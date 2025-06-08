
import React from 'react';
import { cn } from '@/lib/utils';

interface NavbarBackgroundProps {
  isHomePage: boolean;
  isScrolled: boolean;
}

export const NavbarBackground = ({ isHomePage, isScrolled }: NavbarBackgroundProps) => {
  return (
    <div
      className={cn(
        'fixed top-0 left-0 right-0 h-20 pointer-events-none transition-all duration-300 z-40',
        isHomePage && !isScrolled 
          ? 'bg-transparent' 
          : 'bg-eastdigital-dark/95 backdrop-blur-md border-b border-eastdigital-gray/20'
      )}
    />
  );
};
