import React from 'react';
import { cn } from '@/lib/utils';

interface NavbarBackgroundProps {
  isHomePage: boolean;
  isScrolled: boolean;
}

export const NavbarBackground = ({ isHomePage, isScrolled }: NavbarBackgroundProps) => {
  // The animated background is only visible on the homepage when scrolled to the top.
  const isVisible = isHomePage && !isScrolled;

  return (
    <div
      className={cn(
        'fixed top-0 left-0 right-0 h-[400px] pointer-events-none transition-opacity duration-500',
        isVisible ? 'opacity-100' : 'opacity-0'
      )}
    >
      {/* This single div creates the entire animated effect via the .header-aurora class. */}
      <div className="absolute inset-0 header-aurora"></div>
    </div>
  );
};