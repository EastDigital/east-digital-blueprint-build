
import React from 'react';
import { Button } from '@/components/ui/button';

interface NavbarCTAProps {
  isHomePage: boolean;
  showCtaAnimation: boolean;
}

export const NavbarCTA = ({ isHomePage, showCtaAnimation }: NavbarCTAProps) => {
  return (
    <div className="hidden lg:block">
      <Button 
        className={`transition-all duration-500 ease-in-out bg-eastdigital-orange border border-eastdigital-orange hover:bg-eastdigital-orange/90 rounded-[60px] py-3 px-6 text-base font-semibold text-white ${
          isHomePage && showCtaAnimation 
            ? 'shadow-lg shadow-eastdigital-orange/30' 
            : ''
        }`}
      >
        Get Your Blueprint
      </Button>
    </div>
  );
};
