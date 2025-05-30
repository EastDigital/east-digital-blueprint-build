
import React from 'react';
import { useVideoColorAnalyzer } from './hooks/useVideoColorAnalyzer';
import { DynamicGlow } from './DynamicGlow';
import { VideoPlayer } from './VideoPlayer';
import { CallToAction } from './CallToAction';

export const ShowreelSection = () => {
  const {
    dominantColor,
    glowIntensity,
    canvasRef,
    startColorAnalysis,
    stopColorAnalysis
  } = useVideoColorAnalyzer();

  // Enhanced glow for section background
  const sectionGlowStyle = {
    background: `radial-gradient(ellipse 120% 100% at center 60%, ${dominantColor}15 0%, ${dominantColor}08 40%, transparent 70%)`,
    opacity: Math.max(0.3, glowIntensity * 0.8),
    transition: 'all 0.8s ease-out'
  };

  return (
    <section className="py-16 lg:py-24 relative overflow-hidden" style={{ backgroundColor: '#222222' }}>
      {/* Hidden canvas for color analysis */}
      <canvas 
        ref={canvasRef} 
        style={{ display: 'none' }}
        aria-hidden="true"
      />

      {/* Dynamic Section Background Glow - Cinema ambient lighting effect */}
      <div 
        className="absolute inset-0 transition-all duration-800 ease-out pointer-events-none"
        style={sectionGlowStyle}
      ></div>

      {/* Enhanced Dynamic Background Elements with video-synced colors */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-10 left-10 w-96 h-96 rounded-full blur-3xl animate-pulse transition-all duration-700"
          style={{
            background: `radial-gradient(circle, ${dominantColor}20 0%, transparent 70%)`,
            opacity: glowIntensity * 0.6
          }}
        ></div>
        <div 
          className="absolute bottom-20 right-20 w-[500px] h-[500px] rounded-full blur-3xl animate-pulse transition-all duration-700"
          style={{
            background: `radial-gradient(circle, ${dominantColor}15 0%, transparent 70%)`,
            opacity: glowIntensity * 0.5,
            animationDelay: '1s'
          }}
        ></div>
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl animate-pulse transition-all duration-700"
          style={{
            background: `radial-gradient(circle, ${dominantColor}10 0%, transparent 70%)`,
            opacity: glowIntensity * 0.4,
            animationDelay: '2s'
          }}
        ></div>
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
          <DynamicGlow dominantColor={dominantColor} glowIntensity={glowIntensity}>
            <VideoPlayer
              onPlay={startColorAnalysis}
              onPause={stopColorAnalysis}
              dominantColor={dominantColor}
            />
          </DynamicGlow>

          <CallToAction />
        </div>
      </div>
    </section>
  );
};
