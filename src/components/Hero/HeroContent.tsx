import React from 'react';
import { Button } from '@/components/ui/button';
export const HeroContent = () => {
  return <div className="text-left sm:text-center max-w-5xl mx-auto px-[15px]">
      {/* Subheading - Matching reference styles */}
      <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-3 sm:mb-4 md:mb-6 font-poppins tracking-wide text-gray-300 font-weight-thin">
        Real Estate Developers
      </p>
      
      {/* Main Heading - Matching reference font sizes and colors */}
      <h1 className="text-[32px] leading-[1.1] sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 md:mb-8 text-white font-poppins">
        Drive Sales<br />
        <span className="bg-gradient-to-r from-eastdigital-orange to-eastdigital-hover bg-clip-text text-transparent">
          Elevate Marketing
        </span>
      </h1>
      
      {/* Description - Matching reference color and spacing */}
      <p className="text-sm sm:text-base md:text-lg max-w-3xl sm:mx-auto mb-6 sm:mb-8 md:mb-10 font-poppins font-light text-gray-400 leading-relaxed">
        With over 100 clients using East Digital™ to power their creative sales and marketing.
      </p>
      
      {/* CTA Button - Matching reference styling */}
      <Button className="bg-eastdigital-orange hover:bg-eastdigital-orange/90 border border-eastdigital-orange rounded-[60px] py-3 px-8 text-sm md:text-base font-semibold text-white transition-all duration-200 shadow-lg hover:shadow-xl hover:shadow-eastdigital-orange/20 font-poppins w-[150px]">
        Connect
      </Button>
    </div>;
};