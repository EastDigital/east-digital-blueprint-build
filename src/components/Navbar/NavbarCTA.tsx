import React from 'react';
import { Button } from '@/components/ui/button';

interface NavbarCTAProps {
  isHomePage: boolean;
  showCtaAnimation: boolean;
}

export const NavbarCTA = ({ isHomePage, showCtaAnimation }: NavbarCTAProps) => {
  return (
    <div className="hidden lg:block">
      {/* MODIFIED: Adjusted padding and font size for the shorter navbar */}
      <Button 
        className={`transition-all duration-300 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 rounded-[60px] py-2 px-6 text-sm font-semibold text-white ${
          isHomePage && showCtaAnimation 
            ? 'shadow-lg shadow-white/10' 
            : ''
        }`}
      >
        Get Your Blueprint
      </Button>
    </div>
  );
};