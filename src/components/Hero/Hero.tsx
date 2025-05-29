
import React from 'react';
import { HeroContent } from './HeroContent';
import { ProjectCarousel } from './ProjectCarousel';
import { InteractiveBackground } from './InteractiveBackground';

export const Hero = () => {
  return (
    <section className="relative min-h-screen bg-eastdigital-dark overflow-hidden flex flex-col">
      {/* Interactive Background Animation */}
      <InteractiveBackground />
      
      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-2 sm:px-4 flex flex-col justify-between min-h-[calc(100vh-180px)] sm:min-h-[calc(100vh-80px)]">
        {/* Main Content - Custom padding and left alignment */}
        <div className="pt-[50px] pb-[20px] sm:pt-16 sm:pb-0">
          <HeroContent />
        </div>
        
        {/* Carousel - Moved 100px upwards with negative margin on mobile */}
        <div className="pb-8 sm:pb-12 -mb-[100px] sm:mb-0">
          <ProjectCarousel />
        </div>
      </div>
    </section>
  );
};

export default Hero;
