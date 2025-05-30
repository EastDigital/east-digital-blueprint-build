
import React from 'react';
import { HeroContent } from './HeroContent';
import { InteractiveBackground } from './InteractiveBackground';
import { ProjectCarousel } from './ProjectCarousel';

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-gradient-to-br from-eastdigital-dark via-eastdigital-dark to-gray-900">
      <InteractiveBackground />
      
      <div className="relative z-10 container mx-auto px-4 pt-20 pb-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <HeroContent />
          
          {/* Projects Showcase */}
          <div className="lg:pl-8">
            <div className="mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Featured <span className="text-eastdigital-orange">Projects</span>
              </h3>
              <p className="text-gray-400">
                Discover our latest work in real estate marketing and 3D visualization
              </p>
            </div>
            
            <ProjectCarousel />
          </div>
        </div>
      </div>
    </section>
  );
};
