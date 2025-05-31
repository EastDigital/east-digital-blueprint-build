
import React from 'react';

interface DynamicGlowProps {
  dominantColor: string;
  glowIntensity: number;
  children: React.ReactNode;
}

export const DynamicGlow = ({ dominantColor, glowIntensity, children }: DynamicGlowProps) => {
  return (
    <div className="relative">
      {/* OUTER SCREEN GLOW - Much larger and more intense */}
      <div 
        className="absolute -inset-24 transition-all duration-2000 ease-out"
        style={{
          background: `radial-gradient(ellipse 180% 140% at center, 
            ${dominantColor}40 0%, 
            ${dominantColor}30 15%, 
            ${dominantColor}20 30%, 
            ${dominantColor}12 45%, 
            ${dominantColor}08 60%, 
            ${dominantColor}04 75%, 
            transparent 90%
          )`,
          opacity: Math.max(0.8, glowIntensity * 1.2),
          filter: 'blur(60px)',
        }}
      />
      
      {/* MIDDLE SCREEN GLOW - Enhanced intensity */}
      <div 
        className="absolute -inset-16 transition-all duration-1500 ease-out"
        style={{
          background: `radial-gradient(ellipse 140% 120% at center, 
            ${dominantColor}45 0%, 
            ${dominantColor}30 20%, 
            ${dominantColor}18 40%, 
            ${dominantColor}08 65%, 
            transparent 85%
          )`,
          opacity: Math.max(0.7, glowIntensity * 1.1),
          filter: 'blur(30px)',
        }}
      />
      
      {/* CLOSE SCREEN GLOW - More pronounced */}
      <div 
        className="absolute -inset-8 transition-all duration-1200 ease-out"
        style={{
          background: `radial-gradient(ellipse 120% 100% at center, 
            ${dominantColor}50 0%, 
            ${dominantColor}35 25%, 
            ${dominantColor}20 50%, 
            ${dominantColor}10 75%, 
            transparent 90%
          )`,
          opacity: Math.max(0.8, glowIntensity * 1.0),
          filter: 'blur(20px)',
        }}
      />
      
      {/* DIRECT SCREEN EDGE GLOW - Sharp and bright */}
      <div 
        className="absolute -inset-4 rounded-2xl transition-all duration-1000 ease-out"
        style={{
          background: `radial-gradient(ellipse at center, 
            ${dominantColor}60 0%, 
            ${dominantColor}40 15%, 
            ${dominantColor}25 30%, 
            ${dominantColor}12 50%, 
            transparent 70%
          )`,
          opacity: Math.max(0.9, glowIntensity * 1.1),
          filter: 'blur(8px)',
        }}
      />

      {/* INNER SCREEN BORDER GLOW - Crisp edge definition */}
      <div 
        className="absolute -inset-2 rounded-2xl transition-all duration-800 ease-out"
        style={{
          background: `radial-gradient(ellipse at center, 
            ${dominantColor}35 0%, 
            ${dominantColor}20 25%, 
            transparent 50%
          )`,
          opacity: Math.max(0.6, glowIntensity),
          filter: 'blur(4px)',
        }}
      />
      
      {children}
    </div>
  );
};
