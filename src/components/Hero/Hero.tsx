
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
      <div className="relative z-10 container mx-auto px-2 sm:px-4 flex flex-col min-h-[80vh] sm:min-h-screen">
        {/* Top Row - Content with no flex-1 on mobile to prevent centering */}
        <div className="pt-8 pb-4 sm:flex-1 sm:flex sm:items-center sm:justify-center sm:py-8 md:py-16">
          <HeroContent />
        </div>
        
        {/* Bottom Row - Carousel */}
        <div className="pb-4 sm:pb-4 md:pb-8">
          <ProjectCarousel />
        </div>
      </div>
    </section>
  );
};

export default Hero;
