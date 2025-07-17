import React from 'react';
import { HeroContent } from './HeroContent';
import { ProjectCarousel } from './ProjectCarousel';

export const Hero = () => {
  return (
    <section className="relative min-h-screen overflow-hidden flex flex-col mx-0 pb-0 py-[100px] my-0">{/* Dark geometric background with subtle gradient */}
      <div className="absolute top-0 left-0 right-0 h-[50vh] overflow-hidden z-0 bg-gradient-to-b from-slate-950 via-gray-950 to-black">
        {/* Geometric pattern overlay */}
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 25%),
            radial-gradient(circle at 75% 75%, rgba(168, 85, 247, 0.08) 0%, transparent 25%),
            radial-gradient(circle at 50% 0%, rgba(34, 197, 94, 0.06) 0%, transparent 25%),
            linear-gradient(45deg, transparent 40%, rgba(255, 255, 255, 0.02) 50%, transparent 60%)
          `,
          backgroundSize: '200px 200px, 150px 150px, 300px 300px, 50px 50px'
        }}></div>
        {/* Seamless fade transition to black */}
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
    </section>
  );
};

export default Hero;
