
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
    default: "bg-white/[0.02] backdrop-blur-xl border border-white/[0.04] shadow-xl shadow-black/10",
    subtle: "bg-white/[0.01] backdrop-blur-lg border border-white/[0.02] shadow-lg shadow-black/5",
    intense: "bg-white/[0.03] backdrop-blur-2xl border border-white/[0.06] shadow-2xl shadow-black/15"
  };

  const interactiveClasses = interactive 
    ? "transition-all duration-300 hover:bg-white/[0.03] hover:border-white/[0.06]" 
    : "";

  return (
    <div className={cn(baseClasses, variantClasses[variant], interactiveClasses, className)}>
      {/* Subtle top light reflection */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent"></div>
      
      {/* Very subtle surface texture */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.01] via-transparent to-transparent opacity-50"></div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};
