import React from 'react';
import { HeroContent } from './HeroContent';
import { ProjectCarousel } from './ProjectCarousel';
import { AuroraBackground } from '../common/AuroraBackground';
export const Hero = () => {
  return <section className="relative min-h-screen overflow-hidden flex flex-col mx-0 pb-0 py-[100px] my-0">
      {/* Aurora effect constrained to upper half */}
      <div className="absolute top-0 left-0 right-0 h-[50vh] overflow-hidden z-0">
        <AuroraBackground className="absolute inset-0" />
        {/* Extended seamless fade transition to black */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black via-black/90 via-black/60 via-black/30 to-transparent z-10"></div>
      </div>
      
      <div className="relative z-20 container mx-auto px-2 sm:px-4 flex flex-col justify-between min-h-[calc(40vh-30px)] sm:min-h-[calc(40vh-30px)]">
        <div className="pt-[10px] pb-0 py-0">
          <HeroContent />
        </div>
      </div>
      
      <div className="relative z-20 mt-4 sm:flex-1 sm:flex sm:items-end sm:mt-0 sm:pt-2">
        <ProjectCarousel />
      </div>
    </section>;
};
export default Hero;