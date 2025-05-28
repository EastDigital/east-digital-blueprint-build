
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
      <div className="relative z-10 container mx-auto px-2 sm:px-4 flex flex-col min-h-screen">
        {/* Top Row - Content with minimal mobile padding */}
        <div className="flex-1 flex items-center justify-center py-4 md:py-16">
          <HeroContent />
        </div>
        
        {/* Bottom Row - Carousel with reduced bottom padding on mobile */}
        <div className="pb-6 md:pb-12">
          <ProjectCarousel />
        </div>
      </div>
    </section>
  );
};

export default Hero;
