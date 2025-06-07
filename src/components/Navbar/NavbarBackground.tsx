import React from 'react';
import { cn } from '@/lib/utils';

interface NavbarBackgroundProps {
  isHomePage: boolean;
  isScrolled: boolean;
}

export const NavbarBackground = ({ isHomePage, isScrolled }: NavbarBackgroundProps) => {
  // This effect is only visible on the homepage when scrolled to the top.
  const isVisible = isHomePage && !isScrolled;

  // The CSS for the animation is now included directly inside the component
  // to ensure it is always applied correctly.
  const styles = `
    @keyframes move-aurora-1 {
      from { transform: translate(-60%, -80%) rotate(0deg); }
      to { transform: translate(120%, 60%) rotate(360deg); }
    }

    @keyframes move-aurora-2 {
      from { transform: translate(80%, 40%) rotate(0deg); }
      to { transform: translate(-80%, -60%) rotate(-360deg); }
    }

    .aurora-container {
      position: relative;
      overflow: hidden;
      z-index: -1;
    }

    .aurora-container::before,
    .aurora-container::after {
      content: '';
      position: absolute;
      width: 500px;
      height: 500px;
      border-radius: 50%;
      filter: blur(100px);
      will-change: transform;
    }

    /* First light source using your brand color #FF6900 */
    .aurora-container::before {
      background-color: rgba(255, 105, 0, 0.15);
      animation: move-aurora-1 25s cubic-bezier(0.45, 0, 0.55, 1) infinite alternate;
    }

    /* Second light source for depth and color variation */
    .aurora-container::after {
      background-color: rgba(255, 105, 0, 0.1);
      width: 600px;
      height: 600px;
      animation: move-aurora-2 30s cubic-bezier(0.45, 0, 0.55, 1) infinite alternate;
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <div
        className={cn(
          'fixed top-0 left-0 right-0 h-[400px] pointer-events-none z-0 transition-opacity duration-500',
          isVisible ? 'opacity-100' : 'opacity-0'
        )}
      >
        {/* This div receives the animation styles defined above */}
        <div className="absolute inset-0 aurora-container"></div>
        
        {/* This div creates a vignette effect to smoothly blend the edges */}
        <div 
          className="absolute inset-0" 
          style={{ boxShadow: 'inset 0px -100px 100px -50px #0E0E0E' }}
        ></div>
      </div>
    </>
  );
};