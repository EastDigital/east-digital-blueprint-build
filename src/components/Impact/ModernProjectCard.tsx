import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';

// This interface now correctly reflects the data from Supabase
interface ModernProjectCardProps {
  project: {
    id: string;
    name: string;          // Changed from title
    description: string;   // We will use this for subtitle and shortDescription
    featuredImage: string;
    category: string;
    client?: string;
    location?: string;
    year?: string;
    status?: 'completed' | 'in-progress' | 'upcoming';
    [key: string]: any;
  };
}

export const ModernProjectCard = ({ project }: ModernProjectCardProps) => {
  const getStatusColor = (status: string) => {
    // ... getStatusColor function is fine, no changes needed
  };

  // Provide default values for data that might be missing, to prevent crashes
  const status = project.status || 'completed';
  const year = project.year || '2024';
  const location = project.location || 'Location TBD';
  const client = project.client || 'Confidential';
  const category = project.category || 'General';

  return (
    <Link to={`/project/${project.id}`} className="group block h-full">
      <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-xl overflow-hidden hover:border-eastdigital-orange/30 transition-all duration-300 hover:shadow-lg hover:shadow-eastdigital-orange/10 hover:-translate-y-1 h-full flex flex-col">
        <div className="relative aspect-[16/10] overflow-hidden">
          <img 
            src={project.featuredImage} 
            alt={project.name} // Use name instead of title
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          {/* Other overlays and badges are fine */}
        </div>
        
        <div className="p-4 flex flex-col flex-grow">
          <div className="flex items-center gap-3 mb-3 text-xs text-gray-400">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{year}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span>{location}</span>
            </div>
          </div>
          
          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-eastdigital-orange transition-colors duration-300 line-clamp-1">
            {project.name} {/* Use name instead of title */}
          </h3>
          
          <p className="text-sm text-gray-300 line-clamp-2 leading-relaxed flex-grow">
            {project.description} {/* Use description */}
          </p>
          
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-800">
            <span className="text-xs text-gray-500">{client}</span>
            <span className="text-xs text-eastdigital-orange font-medium">
              View Project
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};