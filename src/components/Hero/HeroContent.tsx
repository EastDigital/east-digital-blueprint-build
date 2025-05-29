import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
export const HeroContent = () => {
  return <div className="text-left sm:text-center max-w-5xl mx-auto px-[15px] py-[30px]">
      {/* Subheading - Updated styles */}
      <p className="text-white font-poppins font-thin tracking-[1px]" style={{
      fontSize: '18px'
    }}>
        Real Estate Developers
      </p>
      
      {/* Main Heading - Matching reference font sizes and colors */}
      <h1 className="text-[32px] leading-[1.1] sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 md:mb-8 text-white font-poppins mt-3 sm:mt-4 md:mt-6">
        Drive Sales<br />
        <span className="bg-gradient-to-r from-eastdigital-orange to-eastdigital-hover bg-clip-text text-transparent">
          Elevate Marketing
        </span>
      </h1>
      
      {/* Description - Updated color and broken into 2 lines, removed bottom margin */}
      <p className="text-sm sm:text-base md:text-lg max-w-3xl sm:mx-auto mb-3 sm:mb-8 md:mb-8 font-poppins font-light leading-relaxed" style={{
      color: '#FFE0CA'
    }}>
        With over 100 clients using East Digital™<br />
        to power their creative sales and marketing.
      </p>
      
      {/* CTA Button - Now linked to Connect page */}
      <Link to="/connect">
        <Button className="bg-eastdigital-orange hover:bg-eastdigital-orange/90 border border-eastdigital-orange rounded-[60px] py-3 px-8 text-sm md:text-base font-semibold text-white transition-all duration-200 shadow-lg hover:shadow-xl hover:shadow-eastdigital-orange/20 font-poppins w-[150px]">
          Connect
        </Button>
      </Link>
    </div>;
};