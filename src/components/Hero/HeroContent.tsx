import React from 'react';
import { Link } from 'react-router-dom';
export const HeroContent = () => {
  return <div className="text-left sm:text-center max-w-5xl -bottom-0 -bottom-0 mx-[0px]">
      
      
      <h1 className="text-[26px] sm:text-[36px] font-poppins font-bold bg-gradient-to-b from-[white] to-[offwhite] bg-clip-text text-transparent mt-3 sm:mt-4 md:mt-6 mb-4 sm:mb-6 md:mb-8" style={{
      lineHeight: '42px'
    }}>
        We Create Stories That Sell Spaces
      </h1>
      
      
      
      <Link to="/enquiry">
        <button className="frosted-glass-cta group relative overflow-hidden">
          <span className="relative z-10 flex items-center gap-2 font-poppins font-medium text-white">
            Connect
          </span>
        </button>
      </Link>
    </div>;
};
