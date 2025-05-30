
import React from 'react';

interface DynamicGlowProps {
  dominantColor: string;
  glowIntensity: number;
  children: React.ReactNode;
}

export const DynamicGlow = ({ dominantColor, glowIntensity, children }: DynamicGlowProps) => {
  return (
    <div className="relative">
      {/* Screen light bleeding effect - like a movie screen in a dark theater */}
      <div 
        className="absolute -inset-16 transition-all duration-2000 ease-out"
        style={{
          background: `radial-gradient(ellipse 150% 120% at center, 
            ${dominantColor}20 0%, 
            ${dominantColor}15 20%, 
            ${dominantColor}08 40%, 
            ${dominantColor}04 60%, 
            transparent 80%
          )`,
          opacity: Math.max(0.4, glowIntensity * 0.8),
          filter: 'blur(40px)',
        }}
      />
      
      {/* Closer screen glow */}
      <div 
        className="absolute -inset-8 transition-all duration-1500 ease-out"
        style={{
          background: `radial-gradient(ellipse 120% 100% at center, 
            ${dominantColor}25 0%, 
            ${dominantColor}12 30%, 
            transparent 70%
          )`,
          opacity: Math.max(0.5, glowIntensity * 0.9),
          filter: 'blur(20px)',
        }}
      />
      
      {/* Direct screen edge glow */}
      <div 
        className="absolute -inset-2 rounded-2xl transition-all duration-1000 ease-out"
        style={{
          background: `radial-gradient(ellipse at center, 
            ${dominantColor}30 0%, 
            ${dominantColor}15 20%, 
            transparent 50%
          )`,
          opacity: Math.max(0.6, glowIntensity),
          filter: 'blur(10px)',
        }}
      />
      
      {children}
    </div>
  );
};
