import React from 'react';
import { cn } from '@/lib/utils';

interface NavbarBackgroundProps {
  isHomePage: boolean;
  isScrolled: boolean;
}

export const NavbarBackground = ({ isHomePage, isScrolled }: NavbarBackgroundProps) => {
  // The background is only visible on the homepage when not scrolled.
  const isVisible = isHomePage && !isScrolled;

  return (
    <div
      className={cn(
        'fixed top-0 left-0 right-0 h-[400px] pointer-events-none z-0 transition-opacity duration-500',
        isVisible ? 'opacity-100' : 'opacity-0'
      )}
    >
      {/* This div now gets all its styling from the .aurora-background class in index.css */}
      <div className="absolute inset-0 aurora-background"></div>
      
      {/* This div creates a vignette effect to smoothly blend the edges. */}
      <div 
        className="absolute inset-0" 
        style={{ boxShadow: 'inset 0px -100px 100px -50px #0E0E0E' }}
      ></div>
    </div>
  );
};