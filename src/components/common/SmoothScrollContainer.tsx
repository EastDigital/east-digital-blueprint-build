
import React from 'react';
import { cn } from '@/lib/utils';

interface SmoothScrollContainerProps {
  children: React.ReactNode;
  className?: string;
  enableSnapScroll?: boolean;
  snapType?: 'y' | 'x' | 'both';
}

export const SmoothScrollContainer = ({ 
  children, 
  className,
  enableSnapScroll = false,
  snapType = 'y'
}: SmoothScrollContainerProps) => {
  return (
    <div 
      className={cn(
        'smooth-scroll',
        enableSnapScroll && snapType === 'y' && 'scroll-snap-y',
        enableSnapScroll && snapType === 'x' && 'scroll-snap-type-x',
        enableSnapScroll && snapType === 'both' && 'scroll-snap-type-both',
        'mobile-smooth-scroll', // Mobile-optimized scrolling
        className
      )}
    >
      {children}
    </div>
  );
};
