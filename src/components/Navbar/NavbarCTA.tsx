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
          className="google-ai-button transition-all duration-300 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 rounded-[60px] py-3 px-6 text-base font-semibold text-white relative overflow-hidden group"
        >
          <span className="relative z-10">Get Your Blueprint</span>
        </Button>
      </Link>
    </div>
  );
};