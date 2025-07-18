import React from 'react';
import { HeroContent } from './HeroContent';
import { ProjectCarousel } from './ProjectCarousel';

export const Hero = () => {
  return (
    <section className="relative min-h-screen overflow-hidden flex flex-col justify-between py-10">
      {/* Video Background and Overlay */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          poster="https://www.eastdigital.in/img/product_afc_001.jpg"
          src="https://www.eastdigital.in/img/hero_video_folio.mp4"
        />
        {/* The single, corrected overlay div */}
        <div className="absolute inset-0 video-texture-overlay"></div>
      </div>

      {/* Hero Content (takes up the main space) */}
      <div className="relative z-10 container mx-auto px-2 sm:px-4 flex-grow flex items-center justify-center">
        <HeroContent />
      </div>
      
      {/* Project Carousel (at the bottom) */}
      <div className="relative z-10">
        <ProjectCarousel />
      </div>
    </section>
  );
};

export default Hero;
