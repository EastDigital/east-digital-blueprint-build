
import React from 'react';
import { cn } from '@/lib/utils';

interface SubtleBackgroundProps {
  className?: string;
  variant?: 'dots' | 'grid' | 'gradient';
}

export const SubtleBackground = ({ className, variant = 'dots' }: SubtleBackgroundProps) => {
  const getDotPattern = () => (
    <div className="absolute inset-0 opacity-[0.015]">
      <div 
        className="w-full h-full"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,105,0,0.3) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />
    </div>
  );

  const getGridPattern = () => (
    <div className="absolute inset-0 opacity-[0.02]">
      <div 
        className="w-full h-full"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,105,0,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,105,0,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />
    </div>
  );

  const getGradientPattern = () => (
    <>
      {/* Subtle ambient lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-eastdigital-orange/[0.008] rounded-full blur-[120px]"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/[0.006] rounded-full blur-[100px]"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-cyan-500/[0.004] rounded-full blur-[140px]"></div>
      
      {/* Subtle noise texture */}
      <div 
        className="absolute inset-0 opacity-[0.01]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </>
  );

  return (
    <div className={cn("absolute inset-0 pointer-events-none", className)}>
      {variant === 'dots' && getDotPattern()}
      {variant === 'grid' && getGridPattern()}
      {variant === 'gradient' && getGradientPattern()}
    </div>
  );
};

export default SubtleBackground;
