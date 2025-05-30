
import React from 'react';

interface DynamicGlowProps {
  dominantColor: string;
  glowIntensity: number;
  children: React.ReactNode;
}

export const DynamicGlow = ({ dominantColor, glowIntensity, children }: DynamicGlowProps) => {
  // Much more subtle glow intensity for realistic cinema lighting
  const subtleIntensity = Math.max(0.2, glowIntensity * 0.6);
  
  // Focused glow around video only - like light from a screen
  const videoGlowStyle = {
    background: `radial-gradient(ellipse 120% 80% at center, ${dominantColor}20 0%, ${dominantColor}10 40%, ${dominantColor}05 60%, transparent 80%)`,
    opacity: subtleIntensity * 0.7,
    transition: 'all 0.8s ease-out'
  };

  const softGlowStyle = {
    background: `radial-gradient(ellipse 140% 100% at center, ${dominantColor}15 0%, ${dominantColor}08 50%, transparent 70%)`,
    opacity: subtleIntensity * 0.5,
    transition: 'all 1.0s ease-out'
  };

  return (
    <div className="relative">
      {/* Soft outer glow - very subtle */}
      <div 
        className="absolute -inset-16 rounded-3xl blur-3xl transition-all duration-1000 ease-out"
        style={softGlowStyle}
      ></div>
      
      {/* Main video glow - focused around the video */}
      <div 
        className="absolute -inset-8 rounded-2xl blur-2xl transition-all duration-800 ease-out"
        style={videoGlowStyle}
      ></div>
      
      {/* Inner accent glow - very close to video */}
      <div 
        className="absolute -inset-4 rounded-2xl blur-lg transition-all duration-600 ease-out"
        style={{
          background: `radial-gradient(ellipse at center, ${dominantColor}25 0%, ${dominantColor}12 30%, transparent 60%)`,
          opacity: subtleIntensity * 0.8,
        }}
      ></div>
      
      {children}
    </div>
  );
};
