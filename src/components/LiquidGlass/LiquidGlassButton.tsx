
import React from 'react';
import { cn } from '@/lib/utils';

interface LiquidGlassButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  disabled?: boolean;
}

export const LiquidGlassButton = ({ 
  children, 
  className, 
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false
}: LiquidGlassButtonProps) => {
  const baseClasses = "relative overflow-hidden rounded-full font-medium transition-all duration-300 border backdrop-blur-xl";
  
  const variantClasses = {
    primary: "bg-eastdigital-orange/20 border-eastdigital-orange/40 text-white hover:bg-eastdigital-orange/30 hover:border-eastdigital-orange/60",
    secondary: "bg-white/[0.05] border-white/20 text-white hover:bg-white/[0.1] hover:border-white/40",
    ghost: "bg-transparent border-transparent text-white hover:bg-white/[0.05] hover:border-white/20"
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(baseClasses, variantClasses[variant], sizeClasses[size], disabledClasses, className)}
    >
      {/* Liquid Glass Shimmer Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000"></div>
      
      {/* Content */}
      <span className="relative z-10">{children}</span>
    </button>
  );
};
