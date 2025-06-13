import React from 'react';
import { cn } from '@/lib/utils';

interface AuroraBackgroundProps {
  className?: string;
}

export const AuroraBackground = ({ className }: AuroraBackgroundProps) => {
  return (
    <div className={cn("absolute top-0 left-0 right-0 bottom-0 -z-10 overflow-hidden", className)}>
      {/* --- START: MODIFIED CODE WITH HIGHER INTENSITY --- */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full bg-purple-500/50 mix-blend-lighten filter blur-[150px] animate-aurora-1"
        style={{ top: '10%', left: '10%' }}
      />
      <div
        className="absolute w-[600px] h-[600px] rounded-full bg-eastdigital-orange/50 mix-blend-lighten filter blur-[150px] animate-aurora-2"
        style={{ bottom: '10%', right: '10%' }}
      />
      <div
        className="absolute w-[400px] h-[400px] rounded-full bg-blue-500/40 mix-blend-lighten filter blur-[150px] animate-aurora-3"
        style={{ top: '30%', right: '25%' }}
      />
      {/* --- END: MODIFIED CODE WITH HIGHER INTENSITY --- */}
    </div>
  );
};
