
import React from 'react';

interface DynamicGlowProps {
  dominantColor: string;
  glowIntensity: number;
  children: React.ReactNode;
}

export const DynamicGlow = ({ dominantColor, glowIntensity, children }: DynamicGlowProps) => {
  // Enhanced glow intensity for cinema-like effect
  const enhancedIntensity = Math.max(0.4, glowIntensity * 1.8);
  
  // Create multiple glow layers for depth
  const primaryGlowStyle = {
    background: `radial-gradient(ellipse 800px 600px at center, ${dominantColor}${Math.floor(enhancedIntensity * 80).toString(16).padStart(2, '0')} 0%, ${dominantColor}40 30%, ${dominantColor}20 50%, transparent 70%)`,
    opacity: enhancedIntensity,
    transition: 'all 0.4s ease-out'
  };

  const secondaryGlowStyle = {
    background: `radial-gradient(ellipse 1200px 800px at center, ${dominantColor}30 0%, ${dominantColor}15 40%, transparent 70%)`,
    opacity: enhancedIntensity * 0.8,
    transition: 'all 0.5s ease-out'
  };

  const ambientGlowStyle = {
    background: `radial-gradient(ellipse 1600px 1000px at center, ${dominantColor}20 0%, ${dominantColor}08 50%, transparent 80%)`,
    opacity: enhancedIntensity * 0.6,
    transition: 'all 0.6s ease-out'
  };

  return (
    <div className="relative">
      {/* Ambient Light Layer - Largest spread */}
      <div 
        className="absolute -inset-32 rounded-full blur-3xl transition-all duration-700 ease-out"
        style={ambientGlowStyle}
      ></div>
      
      {/* Secondary Glow Layer - Medium spread */}
      <div 
        className="absolute -inset-24 rounded-2xl blur-2xl transition-all duration-500 ease-out"
        style={secondaryGlowStyle}
      ></div>
      
      {/* Primary Glow Layer - Intense inner glow */}
      <div 
        className="absolute -inset-16 rounded-xl blur-xl transition-all duration-400 ease-out"
        style={primaryGlowStyle}
      ></div>
      
      {/* Focused Inner Glow - Direct video light */}
      <div 
        className="absolute -inset-8 rounded-2xl blur-lg transition-all duration-300 ease-out"
        style={{
          background: `radial-gradient(ellipse at center, ${dominantColor}${Math.floor(enhancedIntensity * 100).toString(16).padStart(2, '0')} 0%, ${dominantColor}60 20%, transparent 50%)`,
          opacity: enhancedIntensity * 1.2,
        }}
      ></div>
      
      {children}
    </div>
  );
};
