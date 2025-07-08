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
        <button className="frosted-glass-cta group relative overflow-hidden">
          <span className="relative z-10 flex items-center gap-2 font-poppins font-medium text-white">
            <Sparkles className="h-4 w-4" />
            Get Your Blueprint
          </span>
        </button>
      </Link>
    </div>
  );
};