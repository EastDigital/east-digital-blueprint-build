import React from 'react';
import { cn } from '@/lib/utils';

interface AuroraBackgroundProps {
  className?: string;
}

export const AuroraBackground = ({ className }: AuroraBackgroundProps) => {
  return (
    <div className={cn("aurora-background", className)} />
  );
};
