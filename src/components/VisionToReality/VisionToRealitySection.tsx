import React from 'react';
import { InteractiveVisionBackground } from './InteractiveVisionBackground';

export const VisionToRealitySection = () => {
  return (
    // MODIFIED LINE: The gradient now starts fading from 70% of the height to transparent.
    <section className="relative py-16 lg:py-24 overflow-hidden">
      
      {/* CORRECTED LINE: Fixed non-standard 'to-100%transparent' to 'to-transparent' for consistency. */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-eastdigital-dark via-eastdigital-dark/80 to-transparent z-10"></div>
      
      <InteractiveVisionBackground />
      
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-eastdigital-orange/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/3 w-72 h-72 bg-blue-500/15 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-eastdigital-orange/10 rounded-full blur-2xl animate-float-slow"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center py-0">
          <div className="inline-flex items-center px-6 py-2 bg-eastdigital-orange/10 border border-eastdigital-orange/20 rounded-full mb-8 animate-fade-in">
            <span className="text-eastdigital-orange text-sm font-medium tracking-widest uppercase">Our Mission</span>
          </div>

          <h2 className="text-4xl font-bold text-white mb-8 leading-tight animate-fade-in lg:text-4xl">
            Turning Real Estate Vision into{' '}
            <span className="bg-gradient-to-r from-eastdigital-orange to-orange-400 bg-clip-text text-transparent">
              Digital Reality
            </span>
          </h2>

          <p className="text-lg lg:text-xl text-eastdigital-lightgray leading-relaxed max-w-3xl mx-auto animate-fade-in font-light">
            At East Digital, we bring real estate concepts to life through immersive visuals, performance-driven marketing, and smart digital solutions. Our services—ranging from 3D architectural rendering and VR walkthroughs to targeted ad campaigns and corporate branding—are tailored to help developers, architects, brokers, and brands stand out in a competitive market.
          </p>
        </div>
      </div>
    </section>
  );
};

export default VisionToRealitySection;