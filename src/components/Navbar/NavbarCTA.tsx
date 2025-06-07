import React from 'react';
import { Button } from '@/components/ui/button';

interface NavbarCTAProps {
  isHomePage: boolean;
  showCtaAnimation: boolean;
}

export const NavbarCTA = ({ isHomePage, showCtaAnimation }: NavbarCTAProps) => {
  return (
    <div className="hidden lg:block">
      {/* MODIFIED: Restored original button padding and font size */}
      <Button 
        className={`transition-all duration-300 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 rounded-[60px] py-3 px-6 text-base font-semibold text-white ${
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