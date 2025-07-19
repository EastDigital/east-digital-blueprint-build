import React from 'react';
import { Link } from 'react-router-dom';
export const HeroContent = () => {
  return <div className="text-left sm:text-center max-w-5xl -bottom-0 -bottom-0 mx-[0px]">
      <p className="text-base sm:text-lg font-poppins font-thin tracking-[1px] py-0" style={{ color: '#FFD194' }}>
        We Create Stories That Sell Spaces
      </p>
      
      <h1 
        className="text-[22px] sm:text-[28px] font-poppins font-bold bg-gradient-to-b from-[#ff6b35] to-[#fadccd] bg-clip-text text-transparent mt-3 sm:mt-4 md:mt-6 mb-4 sm:mb-6 md:mb-8"
        style={{ lineHeight: '32px' }}
      >
        Story-driven marketing <br />
        that builds trust and drives sales
      </h1>
      
      <p 
        className="text-sm sm:text-base max-w-3xl sm:mx-auto mb-3 sm:mb-8 md:mb-8 font-poppins font-thin leading-relaxed py-0"
        style={{ color: '#fadccd' }}
      >
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
