import React from 'react';
import { HeroContent } from './HeroContent';
import { ProjectCarousel } from './ProjectCarousel';
import { InteractiveBackground } from './InteractiveBackground';
export const Hero = () => {
  return <section className="relative min-h-screen bg-eastdigital-dark overflow-hidden flex flex-col">
      {/* Enhanced Interactive Background Animation */}
      <InteractiveBackground />
      
      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-2 sm:px-4 flex flex-col justify-between min-h-[calc(40vh-30px)] sm:min-h-[calc(40vh-30px)]">
        {/* Main Content - Matching reference spacing */}
        <div className="pt-[60px] pb-[20px] sm:pt-16 sm:pb-[20px]">
          <HeroContent />
        </div>
      </div>
      
      {/* Carousel - Full width, touching bottom edge */}
      <div className="relative z-10 flex-1 flex items-end">
        <ProjectCarousel />
      </div>
    </section>;
};
export default Hero;