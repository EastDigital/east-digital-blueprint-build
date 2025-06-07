import React from 'react';
import { HeroContent } from './HeroContent';
import { ProjectCarousel } from './ProjectCarousel';
import { InteractiveBackground } from './InteractiveBackground';

export const Hero = () => {
  return (
    // MODIFIED: The background is now transparent to let the aurora show through.
    <section className="relative min-h-screen bg-transparent overflow-hidden flex flex-col mx-0 pb-0 py-[100px] my-0">
      <InteractiveBackground />
      
      <div className="relative z-10 container mx-auto px-2 sm:px-4 flex flex-col justify-between min-h-[calc(40vh-30px)] sm:min-h-[calc(40vh-30px)]">
        <div className="pt-[60px] pb-0 py-0">
          <HeroContent />
        </div>
      </div>
      
      <div className="relative z-10 mt-4 sm:flex-1 sm:flex sm:items-end sm:mt-0 sm:pt-2">
        <ProjectCarousel />
      </div>
    </section>
  );
};

export default Hero;
