import React from 'react';
import { Link } from 'react-router-dom';
export const HeroContent = () => {
  return <div className="text-left sm:text-center max-w-5xl -bottom-0 -bottom-0 mx-[0px]">
      <p style={{
      fontSize: '18px'
    }} className="text-white font-poppins font-thin tracking-[1px] py-0">We Create Stories That Sell Spaces</p>
      
      <h1 className="leading-[1.1] sm:text-4xl md:text-6xl mb-4 sm:mb-6 md:mb-8 text-white font-poppins mt-3 sm:mt-4 md:mt-6 py-0 font-bold lg:text-4xl text-2xl">
        Story-driven marketing <br />
        <span className="bg-gradient-to-r from-eastdigital-orange to-eastdigital-hover bg-clip-text text-transparent">
          that builds trust and drives sales
        </span>
      </h1>
      
      <p style={{
      color: '#FFE0CA'
    }} className="text-sm sm:text-base md:text-lg max-w-3xl sm:mx-auto mb-3 sm:mb-8 md:mb-8 font-poppins font-light leading-relaxed py-0">
        We help developers, architects, and engineers accelerate sales through <br />
        high-impact 3d visuals, videos, branding, and digital campaigns.
      </p>
      
      <Link to="/enquiry">
        <button className="frosted-glass-cta group relative overflow-hidden">
          <span className="relative z-10 flex items-center gap-2 font-poppins font-medium text-white">
            Connect
          </span>
        </button>
      </Link>
    </div>;
};