
import React from 'react';
import { Play } from 'lucide-react';

export const ShowreelSection = () => {
  return (
    <section className="py-16 lg:py-24" style={{ backgroundColor: '#222222' }}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 lg:mb-6">
            See Our Work in Action
          </h2>
          <p className="text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto px-4">
            Watch how we transform real estate marketing through innovative design, strategic digital campaigns, and immersive 3D visualizations.
          </p>
        </div>
        
        <div className="relative max-w-5xl mx-auto px-4">
          <div className="relative aspect-video rounded-2xl lg:rounded-3xl overflow-hidden bg-gradient-to-br from-gray-900 to-black shadow-2xl">
            {/* Video Placeholder */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900"></div>
            <img 
              src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&h=675&fit=crop" 
              alt="Video Showreel"
              className="w-full h-full object-cover opacity-40"
            />
            
            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="group bg-white/10 backdrop-blur-sm border border-white/20 rounded-full p-6 lg:p-8 hover:bg-white/20 transition-all duration-300 hover:scale-110">
                <Play className="h-8 w-8 lg:h-12 lg:w-12 text-white ml-1 group-hover:scale-110 transition-transform duration-300" fill="white" />
              </button>
            </div>
            
            {/* Video Overlay Text */}
            <div className="absolute bottom-4 lg:bottom-8 left-4 lg:left-8 right-4 lg:right-8">
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2">
                Real Estate Marketing Showreel 2024
              </h3>
              <p className="text-white/80 text-sm lg:text-base">
                A glimpse into our award-winning projects and innovative solutions
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
