
import React from 'react';

interface DynamicGlowProps {
  dominantColor: string;
  glowIntensity: number;
  children: React.ReactNode;
}

export const DynamicGlow = ({ dominantColor, glowIntensity, children }: DynamicGlowProps) => {
  // Dynamic glow style based on extracted color and intensity
  const dynamicGlowStyle = {
    background: `radial-gradient(ellipse at center, ${dominantColor}${Math.floor(glowIntensity * 127).toString(16).padStart(2, '0')} 0%, transparent 70%)`,
    opacity: glowIntensity,
    transition: 'all 0.3s ease-out'
  };

  return (
    <div className="relative">
      {/* Dynamic Video-Synced Glow Effect */}
      <div 
        className="absolute -inset-8 rounded-3xl blur-2xl transition-all duration-300 ease-out"
        style={dynamicGlowStyle}
      ></div>
      
      {/* Secondary glow layer for more depth */}
      <div 
        className="absolute -inset-4 rounded-3xl blur-xl opacity-70 transition-all duration-200 ease-out"
        style={{
          background: `radial-gradient(ellipse at center, ${dominantColor}40 0%, transparent 60%)`,
        }}
      ></div>
      
      {children}
    </div>
  );
};
