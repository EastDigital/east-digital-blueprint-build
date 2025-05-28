import React from 'react';
import { Button } from '@/components/ui/button';
export const HeroContent = () => {
  return <div className="text-center max-w-5xl mx-auto">
      {/* Subheading */}
      <p className="text-eastdigital-lightgray text-lg md:text-xl mb-6 font-poppins tracking-wide">
        Real Estate Developers
      </p>
      
      {/* Main Heading */}
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white font-poppins leading-tight">
        Drive Sales<br />
        <span className="bg-gradient-to-r from-white to-eastdigital-hover bg-clip-text text-transparent">
          Elevate Marketing
        </span>
      </h1>
      
      {/* Description */}
      <p className="text-lg max-w-3xl mx-auto mb-8 font-poppins font-light text-orange-200 md:text-base">With over 100 clients using East Digital™
to power their creative sales and marketing.</p>
      
      {/* CTA Button - Matching Header Style */}
      <Button className="bg-eastdigital-orange hover:bg-eastdigital-orange/90 border border-eastdigital-orange rounded-[60px] py-3 px-8 text-base font-semibold text-white transition-all duration-200 shadow-lg hover:shadow-xl hover:shadow-eastdigital-orange/20 font-poppins">
        Connect
      </Button>
    </div>;
};