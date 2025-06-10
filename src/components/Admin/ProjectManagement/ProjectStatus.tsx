
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface ProjectStatusProps {
  status: string;
  isFeatured: boolean;
  showInCarousel: boolean;
}

export const ProjectStatus = ({ status, isFeatured, showInCarousel }: ProjectStatusProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'upcoming':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="flex flex-wrap gap-2 mb-3">
      <Badge className={`text-xs ${getStatusColor(status)}`}>
        {status.replace('-', ' ')}
      </Badge>
      {isFeatured && (
        <Badge className="text-xs bg-yellow-600 text-yellow-100">
          Featured
        </Badge>
      )}
      {showInCarousel && (
        <Badge className="text-xs bg-purple-600 text-purple-100">
          Carousel
        </Badge>
      )}
    </div>
  );
};
