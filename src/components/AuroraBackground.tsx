import React from 'react';
import { cn } from '@/lib/utils';

interface AuroraBackgroundProps {
  isVisible: boolean;
}

const AuroraBackground = ({ isVisible }: AuroraBackgroundProps) => {
  return (
    <div
      className={cn(
        'fixed inset-0 w-full h-screen pointer-events-none transition-opacity duration-500 z-0',
        isVisible ? 'opacity-100' : 'opacity-0'
      )}
    >
      <div className="absolute inset-0 aurora-background"></div>
    </div>
  );
};

export default AuroraBackground;
