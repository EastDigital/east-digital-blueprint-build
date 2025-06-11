
import React from 'react';
import { cn } from '@/lib/utils';
import { InteractiveAurora } from '../Aurora/InteractiveAurora';

interface NavbarBackgroundProps {
  isHomePage: boolean;
  isScrolled: boolean;
}

export const NavbarBackground = ({ isHomePage, isScrolled }: NavbarBackgroundProps) => {
  return (
    <div
      className={cn(
        'fixed top-0 left-0 right-0 h-20 pointer-events-none transition-all duration-500 z-40',
        isHomePage && !isScrolled 
          ? 'bg-transparent' 
          : 'bg-black/20 backdrop-blur-2xl border-b border-white/10'
      )}
    >
      {/* Aurora effect for navbar */}
      {isHomePage && !isScrolled && (
        <InteractiveAurora intensity="medium" className="opacity-60" />
      )}
      
      {/* Liquid Glass Reflection */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent"></div>
      
      {/* Subtle Glow */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-eastdigital-orange/20 to-transparent"></div>
    </div>
  );
};
