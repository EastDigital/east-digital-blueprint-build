
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

  // Subtle cinema-like ambient lighting - much more subdued
  const ambientLightingStyle = {
    background: `radial-gradient(ellipse 150% 120% at center 50%, ${dominantColor}08 0%, ${dominantColor}04 30%, ${dominantColor}02 50%, transparent 70%)`,
    opacity: Math.max(0.15, glowIntensity * 0.3),
    transition: 'all 1.2s ease-out'
  };

  return (
    <section className="py-16 lg:py-24 relative overflow-hidden" style={{ backgroundColor: '#1a1a1a' }}>
      {/* Hidden canvas for color analysis */}
      <canvas 
        ref={canvasRef} 
        style={{ display: 'none' }}
        aria-hidden="true"
      />

      {/* Subtle ambient lighting overlay - cinema effect */}
      <div 
        className="absolute inset-0 transition-all duration-1200 ease-out pointer-events-none"
        style={ambientLightingStyle}
      ></div>

      {/* Very subtle accent lighting elements */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div 
          className="absolute top-20 left-1/4 w-32 h-32 rounded-full blur-3xl transition-all duration-1000"
          style={{
            background: `radial-gradient(circle, ${dominantColor}15 0%, transparent 70%)`,
            opacity: glowIntensity * 0.2
          }}
        ></div>
        <div 
          className="absolute bottom-32 right-1/3 w-40 h-40 rounded-full blur-3xl transition-all duration-1000"
          style={{
            background: `radial-gradient(circle, ${dominantColor}12 0%, transparent 70%)`,
            opacity: glowIntensity * 0.15
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
