import React from 'react';
import { HeroContent } from './HeroContent';
import { ProjectCarousel } from './ProjectCarousel';
import { InteractiveBackground } from './InteractiveBackground';
export const Hero = () => {
  return <section className="relative min-h-screen bg-eastdigital-dark overflow-hidden flex flex-col">
      {/* Interactive Background Animation */}
      <InteractiveBackground />
      
      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-2 sm:px-4 flex flex-col justify-between min-h-[calc(100vh-80px)]">
        {/* Main Content - Centered with generous spacing */}
        <div className="flex-1 flex items-center justify-center pt-0 pb-0 sm:pt-16 sm:pb-0 py-0">
          <HeroContent />
        </div>
        
        {/* Carousel - Fixed at bottom with proper spacing */}
        <div className="pb-8 sm:pb-12">
          <ProjectCarousel />
        </div>
      </div>
    </section>;
};
export default Hero;