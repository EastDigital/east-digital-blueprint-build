
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
    default: "bg-white/[0.03] backdrop-blur-2xl border border-white/8 shadow-2xl shadow-black/20",
    subtle: "bg-white/[0.02] backdrop-blur-xl border border-white/5 shadow-lg shadow-black/10",
    intense: "bg-white/[0.06] backdrop-blur-3xl border border-white/12 shadow-3xl shadow-black/30"
  };

  const interactiveClasses = interactive 
    ? "transition-all duration-500 hover:bg-white/[0.08] hover:border-white/20 hover:shadow-3xl hover:shadow-eastdigital-orange/5 hover:-translate-y-2 hover:scale-[1.02]" 
    : "";

  return (
    <div className={cn(baseClasses, variantClasses[variant], interactiveClasses, className)}>
      {/* Realistic Glass Surface with Multiple Reflection Layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/6 via-transparent to-transparent opacity-40 pointer-events-none"></div>
      
      {/* Secondary reflection layer */}
      <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-white/3 to-eastdigital-orange/4 opacity-30 pointer-events-none"></div>
      
      {/* Sharp highlight reflection */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"></div>
      <div className="absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b from-transparent via-white/15 to-transparent pointer-events-none"></div>
      
      {/* Animated surface ripple */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent animate-pulse opacity-50 pointer-events-none"></div>
      
      {/* Content with enhanced contrast */}
      <div className="relative z-10 backdrop-blur-sm">
        {children}
      </div>
      
      {/* Enhanced Bottom Glow */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-eastdigital-orange/40 to-transparent shadow-lg shadow-eastdigital-orange/20"></div>
      
      {/* Corner reflections */}
      <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-white/10 to-transparent rounded-bl-2xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-6 h-6 bg-gradient-to-tr from-eastdigital-orange/8 to-transparent rounded-tr-2xl pointer-events-none"></div>
    </div>
  );
};
