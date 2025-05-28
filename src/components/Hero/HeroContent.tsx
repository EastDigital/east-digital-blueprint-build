
import React from 'react';
import { Button } from '@/components/ui/button';

export const HeroContent = () => {
  return (
    <div className="text-center max-w-5xl mx-auto px-4">
      {/* Subheading - Reduced spacing on mobile */}
      <p className="text-eastdigital-lightgray text-sm sm:text-base md:text-lg lg:text-xl mb-2 sm:mb-3 md:mb-6 font-poppins tracking-wide">
        Real Estate Developers
      </p>
      
      {/* Main Heading - More compact on mobile with tighter line height */}
      <h1 className="text-2xl sm:text-3xl md:text-6xl lg:text-7xl font-bold mb-3 sm:mb-4 md:mb-6 text-white font-poppins leading-tight">
        Drive Sales<br />
        <span className="bg-gradient-to-r from-white to-eastdigital-hover bg-clip-text text-transparent">
          Elevate Marketing
        </span>
      </h1>
      
      {/* Description - More compact on mobile */}
      <p className="text-xs sm:text-sm md:text-lg max-w-3xl mx-auto mb-4 sm:mb-6 md:mb-8 font-poppins font-light text-orange-200">
        With over 100 clients using East Digital™ to power their creative sales and marketing.
      </p>
      
      {/* CTA Button - Smaller on mobile */}
      <Button className="bg-eastdigital-orange hover:bg-eastdigital-orange/90 border border-eastdigital-orange rounded-[60px] py-1.5 px-4 sm:py-2 sm:px-6 md:py-3 md:px-8 text-xs sm:text-sm md:text-base font-semibold text-white transition-all duration-200 shadow-lg hover:shadow-xl hover:shadow-eastdigital-orange/20 font-poppins">
        Connect
      </Button>
    </div>
  );
};
