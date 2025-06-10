
import React from 'react';
import { cn } from '@/lib/utils';

interface LiquidGlassCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'subtle' | 'intense';
  interactive?: boolean;
}

export const LiquidGlassCard = ({ 
  children, 
  className, 
  variant = 'default',
  interactive = true 
}: LiquidGlassCardProps) => {
  const baseClasses = "relative overflow-hidden rounded-2xl";
  
  const variantClasses = {
    default: "bg-white/[0.02] backdrop-blur-xl border border-white/10",
    subtle: "bg-white/[0.01] backdrop-blur-lg border border-white/5",
    intense: "bg-white/[0.05] backdrop-blur-2xl border border-white/20"
  };

  const interactiveClasses = interactive 
    ? "transition-all duration-500 hover:bg-white/[0.08] hover:border-white/30 hover:shadow-2xl hover:shadow-eastdigital-orange/10 hover:-translate-y-1" 
    : "";

  return (
    <div className={cn(baseClasses, variantClasses[variant], interactiveClasses, className)}>
      {/* Liquid Glass Reflection Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-50"></div>
      
      {/* Animated Refraction Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent animate-pulse"></div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Bottom Glow */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-eastdigital-orange/30 to-transparent"></div>
    </div>
  );
};
