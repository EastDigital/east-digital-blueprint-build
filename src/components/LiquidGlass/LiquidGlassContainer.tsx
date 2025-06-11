
import React from 'react';
import { cn } from '@/lib/utils';

interface LiquidGlassContainerProps {
  children: React.ReactNode;
  className?: string;
  withParticles?: boolean;
}

export const LiquidGlassContainer = ({ 
  children, 
  className,
  withParticles = false 
}: LiquidGlassContainerProps) => {
  return (
    <div className={cn("relative", className)}>
      {/* Pure deep black background */}
      <div className="absolute inset-0 bg-black">
        {/* Very subtle ambient lighting - no harsh orbs */}
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-eastdigital-orange/[0.02] rounded-full blur-[120px] opacity-60"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-white/[0.008] rounded-full blur-[100px] opacity-40"></div>
        
        {/* Minimal atmospheric gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-zinc-950/20"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};
