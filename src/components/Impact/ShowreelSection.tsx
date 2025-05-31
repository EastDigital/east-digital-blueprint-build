
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
    <section className="py-16 lg:py-24 relative overflow-hidden min-h-screen bg-black">
      {/* Hidden canvas for color analysis */}
      <canvas 
        ref={canvasRef} 
        style={{ display: 'none' }}
        aria-hidden="true"
      />

      {/* MAIN CINEMA HALL ATMOSPHERE - Much stronger light from screen illuminating the entire theater */}
      <div 
        className="absolute inset-0 transition-all duration-2000 ease-out"
        style={{
          background: `
            radial-gradient(ellipse 300% 200% at center 30%, 
              ${dominantColor}35 0%, 
              ${dominantColor}25 20%, 
              ${dominantColor}18 35%, 
              ${dominantColor}12 50%, 
              ${dominantColor}08 65%, 
              ${dominantColor}04 80%, 
              transparent 100%
            )
          `,
          opacity: Math.max(0.8, glowIntensity * 1.2),
        }}
      />

      {/* SECONDARY AMBIENT GLOW - Creates depth */}
      <div 
        className="absolute inset-0 transition-all duration-1800 ease-out"
        style={{
          background: `
            radial-gradient(ellipse 250% 150% at center 40%, 
              ${dominantColor}20 0%, 
              ${dominantColor}15 30%, 
              ${dominantColor}08 60%, 
              transparent 85%
            )
          `,
          opacity: Math.max(0.6, glowIntensity * 0.9),
          filter: 'blur(10px)',
        }}
      />

      {/* TOP WALL ILLUMINATION - Much stronger ceiling reflection */}
      <div 
        className="absolute top-0 left-0 right-0 h-48 transition-all duration-2000 ease-out"
        style={{
          background: `linear-gradient(to bottom, 
            ${dominantColor}25 0%, 
            ${dominantColor}15 30%, 
            ${dominantColor}08 60%, 
            transparent 100%
          )`,
          opacity: Math.max(0.7, glowIntensity * 1.0),
        }}
      />

      {/* SIDE WALL ILLUMINATION - Enhanced side lighting */}
      <div 
        className="absolute left-0 top-0 bottom-0 w-48 transition-all duration-2000 ease-out"
        style={{
          background: `linear-gradient(to right, 
            transparent 0%, 
            ${dominantColor}12 40%, 
            ${dominantColor}20 100%
          )`,
          opacity: Math.max(0.6, glowIntensity * 0.8),
        }}
      />
      <div 
        className="absolute right-0 top-0 bottom-0 w-48 transition-all duration-2000 ease-out"
        style={{
          background: `linear-gradient(to left, 
            transparent 0%, 
            ${dominantColor}12 40%, 
            ${dominantColor}20 100%
          )`,
          opacity: Math.max(0.6, glowIntensity * 0.8),
        }}
      />

      {/* FLOOR REFLECTION - Stronger bottom reflection */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-56 transition-all duration-2000 ease-out"
        style={{
          background: `linear-gradient(to top, 
            ${dominantColor}18 0%, 
            ${dominantColor}12 25%, 
            ${dominantColor}06 50%, 
            transparent 100%
          )`,
          opacity: Math.max(0.5, glowIntensity * 0.7),
        }}
      />

      {/* ATMOSPHERIC PARTICLES - Simulates light particles in air */}
      <div 
        className="absolute inset-0 transition-all duration-3000 ease-out"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, ${dominantColor}15 0%, transparent 30%),
            radial-gradient(circle at 80% 20%, ${dominantColor}12 0%, transparent 25%),
            radial-gradient(circle at 60% 80%, ${dominantColor}10 0%, transparent 35%),
            radial-gradient(circle at 30% 70%, ${dominantColor}08 0%, transparent 20%)
          `,
          opacity: Math.max(0.4, glowIntensity * 0.6),
          filter: 'blur(30px)',
        }}
      />

      {/* ENHANCED CORNER ILLUMINATION - Light bouncing from corners */}
      <div 
        className="absolute top-0 left-0 w-32 h-32 transition-all duration-2000 ease-out"
        style={{
          background: `radial-gradient(ellipse at bottom right, ${dominantColor}20, transparent 70%)`,
          opacity: glowIntensity * 0.8,
        }}
      />
      <div 
        className="absolute top-0 right-0 w-32 h-32 transition-all duration-2000 ease-out"
        style={{
          background: `radial-gradient(ellipse at bottom left, ${dominantColor}20, transparent 70%)`,
          opacity: glowIntensity * 0.8,
        }}
      />
      <div 
        className="absolute bottom-0 left-0 w-40 h-40 transition-all duration-2000 ease-out"
        style={{
          background: `radial-gradient(ellipse at top right, ${dominantColor}15, transparent 70%)`,
          opacity: glowIntensity * 0.6,
        }}
      />
      <div 
        className="absolute bottom-0 right-0 w-40 h-40 transition-all duration-2000 ease-out"
        style={{
          background: `radial-gradient(ellipse at top left, ${dominantColor}15, transparent 70%)`,
          opacity: glowIntensity * 0.6,
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
