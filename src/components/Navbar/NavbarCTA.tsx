import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

interface NavbarCTAProps {
  isHomePage: boolean;
  showCtaAnimation: boolean;
}

export const NavbarCTA = ({ isHomePage, showCtaAnimation }: NavbarCTAProps) => {
  return (
    <div className="hidden lg:block">
      <Link to="/enquiry">
        <button className="frosted-glass-cta group relative overflow-hidden text-center">
          <div className="relative z-10 flex flex-col items-center font-poppins text-white">
            <div className="flex items-center gap-2 font-medium">
              <Sparkles className="h-4 w-4" />
              <span>Get Your Blueprint</span>
            </div>
            <span className="text-xs font-light opacity-80 -mt-1">Instant Quote</span>
          </div>
        </button>
      </Link>
    </div>
  );
};
