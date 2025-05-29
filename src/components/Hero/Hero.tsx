import React from 'react';
import { HeroContent } from './HeroContent';
import { ProjectCarousel } from './ProjectCarousel';
import { InteractiveBackground } from './InteractiveBackground';
export const Hero = () => {
  return <section className="relative min-h-screen bg-eastdigital-dark overflow-hidden flex flex-col">
      {/* Enhanced Interactive Background Animation */}
      <InteractiveBackground />
      
      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-2 sm:px-4 flex flex-col justify-between min-h-[calc(80vh-180px)] sm:min-h-[calc(100vh-80px)]">
        {/* Main Content - Matching reference spacing */}
        <div className="pt-[60px] pb-[40px] sm:pt-16 sm:pb-0">
          <HeroContent />
        </div>
        
        {/* Carousel - Maintaining spacing from CTA */}
        <div className="pb-8 sm:pb-12 -mb-[100px] sm:mb-0">
          <ProjectCarousel />
        </div>
      </div>
    </section>;
};
export default Hero;