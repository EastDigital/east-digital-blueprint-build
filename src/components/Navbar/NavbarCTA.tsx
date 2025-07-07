
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface NavbarCTAProps {
  isHomePage: boolean;
  showCtaAnimation: boolean;
}

export const NavbarCTA = ({ isHomePage, showCtaAnimation }: NavbarCTAProps) => {
  return (
    <div className="hidden lg:block">
      <Link to="/enquiry">
        <Button 
          className={`transition-all duration-300 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 rounded-[60px] py-3 px-6 text-base font-semibold text-white relative overflow-hidden group animate-border-pulse ${
            isHomePage && showCtaAnimation 
              ? 'shadow-lg shadow-white/10' 
              : ''
          }`}
        >
          {/* Animated border effect */}
          <div className="absolute inset-0 rounded-[60px] p-[2px] bg-gradient-to-r from-white via-eastdigital-orange to-white bg-[length:300%_300%] animate-gradient-border opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute inset-[2px] bg-white/10 backdrop-blur-md rounded-[60px] group-hover:bg-white/20"></div>
          <span className="relative z-10">Get Your Blueprint</span>
        </Button>
      </Link>
    </div>
  );
};
