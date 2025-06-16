
import React from 'react';
import { cn } from '@/lib/utils';

interface AuroraBackgroundProps {
  className?: string;
}

export const AuroraBackground = ({ className }: AuroraBackgroundProps) => {
  return (
    <div className={cn("aurora-gradient-background", className)}>
      <div className="aurora-gradient-layer-1"></div>
      <div className="aurora-gradient-layer-2"></div>
      <div className="aurora-gradient-layer-3"></div>
    </div>
  );
};

export default AuroraBackground;
