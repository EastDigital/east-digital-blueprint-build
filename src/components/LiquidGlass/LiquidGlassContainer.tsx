
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
      {/* Liquid Glass Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-eastdigital-dark via-gray-900/50 to-black">
        {/* Floating Glass Orbs */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-eastdigital-orange/10 via-transparent to-white/5 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-gradient-to-tl from-white/5 via-eastdigital-orange/5 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-gradient-to-r from-transparent via-white/10 to-eastdigital-orange/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        
        {withParticles && (
          <>
            {/* Floating Particles */}
            <div className="absolute top-20 left-20 w-2 h-2 bg-white/20 rounded-full animate-float"></div>
            <div className="absolute top-40 right-32 w-1 h-1 bg-eastdigital-orange/30 rounded-full animate-float-delayed"></div>
            <div className="absolute bottom-32 left-1/3 w-3 h-3 bg-white/10 rounded-full animate-float-slow"></div>
          </>
        )}
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};
