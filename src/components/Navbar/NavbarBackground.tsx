
import React from 'react';

interface NavbarBackgroundProps {
  isHomePage: boolean;
}

export const NavbarBackground = ({ isHomePage }: NavbarBackgroundProps) => {
  if (!isHomePage) return null;

  return (
    <div className="fixed top-0 left-0 right-0 h-[300px] pointer-events-none z-40">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-600/25 via-blue-600/20 via-cyan-500/15 to-transparent opacity-70 animate-pulse"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/15 via-orange-400/12 via-yellow-300/8 to-transparent opacity-50 animate-pulse delay-1000"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400/12 via-blue-500/15 via-purple-600/10 to-transparent opacity-60 animate-pulse delay-2000"></div>
      {/* Enhanced seamless blend layer with better gradient fade */}</div>
  );
};
