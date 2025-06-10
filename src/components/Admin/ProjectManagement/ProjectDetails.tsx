
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface ProjectDetailsProps {
  client?: string;
  location?: string;
  duration?: string;
  slug?: string;
  description?: string;
  tags?: string[];
  category?: string;
}

export const ProjectDetails = ({ 
  client, 
  location, 
  duration, 
  slug, 
  description, 
  tags,
  category 
}: ProjectDetailsProps) => {
  return (
    <>
      <div className="space-y-2 text-sm text-gray-400">
        {category && (
          <div>
            <Badge variant="outline" className="text-xs border-gray-600 text-gray-300 mb-2">
              {category}
            </Badge>
          </div>
        )}
        {client && (
          <div>
            <span className="text-gray-300">Client:</span> {client}
          </div>
        )}
        {location && (
          <div>
            <span className="text-gray-300">Location:</span> {location}
          </div>
        )}
        {duration && (
          <div>
            <span className="text-gray-300">Duration:</span> {duration}
          </div>
        )}
        {slug && (
          <div>
            <span className="text-gray-300">Slug:</span> {slug}
          </div>
        )}
      </div>
      {description && (
        <p className="text-gray-400 text-sm mt-3 line-clamp-2">
          {description}
        </p>
      )}
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-3">
          {tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs bg-gray-800 text-gray-300">
              {tag}
            </Badge>
          ))}
          {tags.length > 3 && (
            <Badge variant="secondary" className="text-xs bg-gray-800 text-gray-300">
              +{tags.length - 3}
            </Badge>
          )}
        </div>
      )}
    </>
  );
};
