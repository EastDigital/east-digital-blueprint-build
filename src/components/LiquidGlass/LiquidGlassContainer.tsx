
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
      {/* Deep Black Background with Subtle Gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-950 to-zinc-950">
        {/* Realistic Glass Orbs with Enhanced Reflections */}
        <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-gradient-to-br from-eastdigital-orange/8 via-white/3 to-transparent rounded-full blur-3xl animate-pulse">
          {/* Inner reflection */}
          <div className="absolute inset-2 bg-gradient-to-tl from-white/5 via-transparent to-transparent rounded-full blur-xl"></div>
        </div>
        
        <div className="absolute top-3/4 right-1/4 w-56 h-56 bg-gradient-to-tl from-white/4 via-eastdigital-orange/6 to-transparent rounded-full blur-4xl animate-pulse" style={{ animationDelay: '2s' }}>
          {/* Multiple reflection layers */}
          <div className="absolute inset-3 bg-gradient-to-br from-eastdigital-orange/4 via-transparent to-white/2 rounded-full blur-2xl"></div>
          <div className="absolute top-4 left-4 w-8 h-8 bg-white/8 rounded-full blur-sm"></div>
        </div>
        
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-gradient-to-r from-transparent via-white/6 to-eastdigital-orange/8 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '4s' }}>
          {/* Sharp highlight reflection */}
          <div className="absolute top-2 right-3 w-4 h-4 bg-white/12 rounded-full blur-xs"></div>
        </div>

        {/* Additional ambient glass reflections */}
        <div className="absolute bottom-1/4 left-1/3 w-24 h-64 bg-gradient-to-t from-eastdigital-orange/3 via-white/2 to-transparent rounded-full blur-3xl opacity-60 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/3 right-1/3 w-36 h-36 bg-gradient-to-bl from-white/4 via-eastdigital-orange/3 to-transparent rounded-full blur-2xl opacity-70 animate-pulse" style={{ animationDelay: '3s' }}></div>
        
        {withParticles && (
          <>
            {/* Enhanced Floating Particles with Glass Effect */}
            <div className="absolute top-20 left-20 w-3 h-3 bg-gradient-to-br from-white/15 to-eastdigital-orange/10 rounded-full animate-float shadow-lg">
              <div className="absolute inset-0.5 bg-white/5 rounded-full blur-xs"></div>
            </div>
            <div className="absolute top-40 right-32 w-2 h-2 bg-gradient-to-tl from-eastdigital-orange/20 to-white/8 rounded-full animate-float-delayed shadow-md">
              <div className="absolute top-0 left-0 w-1 h-1 bg-white/20 rounded-full blur-px"></div>
            </div>
            <div className="absolute bottom-32 left-1/3 w-4 h-4 bg-gradient-to-r from-white/12 to-transparent rounded-full animate-float-slow shadow-xl">
              <div className="absolute inset-1 bg-eastdigital-orange/8 rounded-full blur-xs"></div>
            </div>
            
            {/* Floating glass shards */}
            <div className="absolute top-1/3 left-2/3 w-1 h-8 bg-gradient-to-b from-white/10 to-transparent rotate-45 animate-float opacity-60"></div>
            <div className="absolute bottom-1/3 right-1/4 w-6 h-1 bg-gradient-to-r from-eastdigital-orange/8 to-white/4 rotate-12 animate-float-delayed opacity-50"></div>
          </>
        )}

        {/* Realistic surface reflections */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/[0.01] pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.005] via-transparent to-eastdigital-orange/[0.01] pointer-events-none"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};
