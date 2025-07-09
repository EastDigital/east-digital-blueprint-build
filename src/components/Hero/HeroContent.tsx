import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export const HeroContent = () => {
  return (
    <div className="text-left sm:text-center max-w-5xl mx-auto px-[15px] py-[31px]">
      <p style={{
        fontSize: '18px'
      }} className="text-white font-poppins font-thin tracking-[1px] py-0">
        Stories That Sell Spaces
      </p>
      
      <h1 className="leading-[1.1] sm:text-4xl md:text-6xl lg:text-7xl mb-4 sm:mb-6 md:mb-8 text-white font-poppins mt-3 sm:mt-4 md:mt-6 py-0 font-bold text-5xl">
        Drive Sales<br />
        <span className="bg-gradient-to-r from-eastdigital-orange to-eastdigital-hover bg-clip-text text-transparent">
          Elevate Marketing
        </span>
      </h1>
      
      <p style={{
        color: '#FFE0CA'
      }} className="text-sm sm:text-base md:text-lg max-w-3xl sm:mx-auto mb-3 sm:mb-8 md:mb-8 font-poppins font-light leading-relaxed py-0">
        We help developers, architects, and engineers accelerate sales through <br />
        high-impact 3d visuals, videos, branding, and digital campaigns.
      </p>
      
      <Link to="/enquiry">
        <Button className="google-ai-button bg-eastdigital-orange hover:bg-eastdigital-orange/90 border border-eastdigital-orange rounded-[60px] py-3 px-8 text-sm md:text-base font-semibold text-white transition-all duration-200 shadow-lg hover:shadow-xl hover:shadow-eastdigital-orange/20 font-poppins w-[150px] relative overflow-hidden group">
          <span className="relative z-10">Connect</span>
        </Button>
      </Link>
    </div>
  );
};
