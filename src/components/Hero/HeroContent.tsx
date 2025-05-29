import React from 'react';
import { Button } from '@/components/ui/button';
export const HeroContent = () => {
  return <div className="text-left sm:text-center max-w-5xl mx-auto px-[15px]">
      {/* Subheading - More generous spacing on mobile */}
      <p className="sm:text-base md:text-lg lg:text-xl mb-4 sm:mb-4 md:mb-6 font-poppins tracking-wide text-base text-[#e7fffe]">
        Real Estate Developers
      </p>
      
      {/* Main Heading - Better spacing for impact */}
      <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-6 sm:mb-6 md:mb-8 text-white font-poppins leading-normal">
        Drive Sales<br />
        <span className="bg-gradient-to-r from-white to-eastdigital-hover bg-clip-text text-transparent">
          Elevate Marketing
        </span>
      </h1>
      
      {/* Description - Generous spacing for readability */}
      <p className="text-sm sm:text-base md:text-lg max-w-3xl sm:mx-auto mb-8 sm:mb-8 md:mb-10 font-poppins font-light text-orange-200 leading-normal">
        With over 100 clients using East Digital™ to power their creative sales and marketing.
      </p>
      
      {/* CTA Button - Fixed width of 150px */}
      <Button className="bg-eastdigital-orange hover:bg-eastdigital-orange/90 border border-eastdigital-orange rounded-[60px] py-3 px-8 text-sm md:text-base font-semibold text-white transition-all duration-200 shadow-lg hover:shadow-xl hover:shadow-eastdigital-orange/20 font-poppins" style={{
      width: '150px'
    }}>
        Connect
      </Button>
    </div>;
};