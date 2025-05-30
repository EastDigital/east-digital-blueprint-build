
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

  return (
    <section className="py-16 lg:py-24 relative overflow-hidden min-h-screen" style={{ backgroundColor: '#0a0a0a' }}>
      {/* Hidden canvas for color analysis */}
      <canvas 
        ref={canvasRef} 
        style={{ display: 'none' }}
        aria-hidden="true"
      />

      {/* Cinema Hall Atmosphere - Light from screen illuminating the entire theater */}
      <div 
        className="absolute inset-0 transition-all duration-2000 ease-out"
        style={{
          background: `
            radial-gradient(ellipse 200% 150% at center 40%, 
              ${dominantColor}12 0%, 
              ${dominantColor}08 25%, 
              ${dominantColor}04 45%, 
              ${dominantColor}02 65%, 
              transparent 85%
            )
          `,
          opacity: Math.max(0.3, glowIntensity * 0.7),
        }}
      />

      {/* Top wall illumination - like ceiling reflection */}
      <div 
        className="absolute top-0 left-0 right-0 h-32 transition-all duration-2000 ease-out"
        style={{
          background: `linear-gradient(to bottom, ${dominantColor}08, transparent)`,
          opacity: glowIntensity * 0.4,
        }}
      />

      {/* Side wall illumination */}
      <div 
        className="absolute left-0 top-0 bottom-0 w-32 transition-all duration-2000 ease-out"
        style={{
          background: `linear-gradient(to right, transparent, ${dominantColor}06)`,
          opacity: glowIntensity * 0.3,
        }}
      />
      <div 
        className="absolute right-0 top-0 bottom-0 w-32 transition-all duration-2000 ease-out"
        style={{
          background: `linear-gradient(to left, transparent, ${dominantColor}06)`,
          opacity: glowIntensity * 0.3,
        }}
      />

      {/* Floor/bottom reflection */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-40 transition-all duration-2000 ease-out"
        style={{
          background: `linear-gradient(to top, ${dominantColor}05, transparent)`,
          opacity: glowIntensity * 0.2,
        }}
      />

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
