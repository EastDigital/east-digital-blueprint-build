
import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

export const ShowreelSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="py-16 lg:py-24 relative overflow-hidden" style={{ backgroundColor: '#222222' }}>
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-r from-eastdigital-orange/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-l from-eastdigital-orange/8 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-b from-eastdigital-orange/5 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-4 lg:mb-6 animate-fade-in">
            <span className="bg-gradient-to-r from-white via-eastdigital-orange to-white bg-clip-text text-transparent">
              See Our Work in Action
            </span>
          </h2>
          <p className="text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto px-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Experience the magic of transformation through our 3D architectural visualizations, 
            strategic digital campaigns, and immersive experiences that bring visions to life.
          </p>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          {/* Glowing Border Effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-eastdigital-orange/50 via-transparent to-eastdigital-orange/50 rounded-3xl blur-lg animate-pulse"></div>
          
          <div className="relative aspect-video rounded-2xl lg:rounded-3xl overflow-hidden bg-black shadow-2xl border border-eastdigital-orange/20">
            {/* Actual Video */}
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              muted={isMuted}
              loop
              playsInline
              onLoadedData={() => {
                // Auto-play with a slight delay for better UX
                setTimeout(() => {
                  if (videoRef.current && !isPlaying) {
                    videoRef.current.play();
                    setIsPlaying(true);
                  }
                }, 500);
              }}
            >
              <source src="https://www.eastdigital.in/web-images/3d-arch-demo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
            {/* Video Controls Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                {/* Play/Pause Button */}
                <button 
                  onClick={togglePlay}
                  className="group bg-eastdigital-orange/90 backdrop-blur-sm border border-eastdigital-orange rounded-full p-3 hover:bg-eastdigital-orange transition-all duration-300 hover:scale-110"
                >
                  {isPlaying ? (
                    <Pause className="h-6 w-6 text-white group-hover:scale-110 transition-transform duration-300" fill="white" />
                  ) : (
                    <Play className="h-6 w-6 text-white ml-0.5 group-hover:scale-110 transition-transform duration-300" fill="white" />
                  )}
                </button>

                {/* Volume Button */}
                <button 
                  onClick={toggleMute}
                  className="group bg-white/10 backdrop-blur-sm border border-white/20 rounded-full p-3 hover:bg-white/20 transition-all duration-300"
                >
                  {isMuted ? (
                    <VolumeX className="h-5 w-5 text-white group-hover:scale-110 transition-transform duration-300" />
                  ) : (
                    <Volume2 className="h-5 w-5 text-white group-hover:scale-110 transition-transform duration-300" />
                  )}
                </button>
              </div>
            </div>

            {/* Floating Elements for Visual Interest */}
            <div className="absolute top-4 right-4 opacity-20">
              <div className="w-3 h-3 bg-eastdigital-orange rounded-full animate-ping"></div>
            </div>
            <div className="absolute bottom-4 left-4 opacity-20">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Call to Action Below Video */}
          <div className="text-center mt-8 lg:mt-12">
            <p className="text-eastdigital-orange font-semibold text-lg mb-4">
              Ready to Transform Your Vision?
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="px-4 py-2 bg-eastdigital-orange/10 border border-eastdigital-orange/30 rounded-full text-white text-sm">
                3D Architectural Rendering
              </span>
              <span className="px-4 py-2 bg-eastdigital-orange/10 border border-eastdigital-orange/30 rounded-full text-white text-sm">
                Digital Marketing Campaigns
              </span>
              <span className="px-4 py-2 bg-eastdigital-orange/10 border border-eastdigital-orange/30 rounded-full text-white text-sm">
                Immersive Experiences
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
