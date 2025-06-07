import React from 'react';
import { cn } from '@/lib/utils';

interface NavbarBackgroundProps {
  isHomePage: boolean;
  isScrolled: boolean;
}

export const NavbarBackground = ({ isHomePage, isScrolled }: NavbarBackgroundProps) => {
  // This component will only be visible on the homepage when the user has not scrolled.
  const isVisible = isHomePage && !isScrolled;

  return (
    <div
      className={cn(
        'fixed top-0 left-0 right-0 h-[400px] pointer-events-none z-0 transition-opacity duration-500',
        isVisible ? 'opacity-100' : 'opacity-0'
      )}
    >
      {/* This div creates the animated gradient using your brand color #FF6900.
        The animation itself is defined in src/index.css.
      */}
      <div
        className="absolute inset-0 bg-continuous-gradient"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 80% 50% at 50% -20%, rgba(255, 105, 0, 0.4), transparent),
            radial-gradient(ellipse 80% 50% at 20% -15%, rgba(255, 105, 0, 0.3), transparent),
            radial-gradient(ellipse 80% 50% at 80% -15%, rgba(255, 105, 0, 0.3), transparent)
          `,
          backgroundSize: '400% 400%',
        }}
      ></div>
      
      {/* This div creates a vignette effect to smoothly blend the gradient into the dark page background. */}
      <div 
        className="absolute inset-0" 
        style={{ boxShadow: 'inset 0px -100px 100px -50px #0E0E0E' }}
      ></div>
    </div>
  );
};