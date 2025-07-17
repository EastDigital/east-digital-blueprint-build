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
      {/* The solid black background has been removed to reveal the styles passed to the container */}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};
