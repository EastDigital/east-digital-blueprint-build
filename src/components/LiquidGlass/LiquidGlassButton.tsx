
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
    primary: "bg-eastdigital-orange/[0.15] border-eastdigital-orange/[0.25] text-white hover:bg-eastdigital-orange/[0.25] hover:border-eastdigital-orange/[0.4]",
    secondary: "bg-white/[0.03] border-white/[0.08] text-white hover:bg-white/[0.06] hover:border-white/[0.15]",
    ghost: "bg-transparent border-transparent text-white hover:bg-white/[0.03] hover:border-white/[0.08]"
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
      {/* Subtle shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000"></div>
      
      {/* Content */}
      <span className="relative z-10">{children}</span>
    </button>
  );
};
