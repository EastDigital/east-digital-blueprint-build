
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';

interface ModernProjectCardProps {
  project: {
    id: string;
    title: string;
    subtitle: string;
    shortDescription: string;
    featuredImage: string;
    category: string;
    client: string;
    location: string;
    year: string;
    status: 'completed' | 'in-progress' | 'upcoming';
  };
}

export const ModernProjectCard = ({ project }: ModernProjectCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'in-progress':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'upcoming':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <Link to={`/project/${project.id}`} className="group block">
      <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-xl overflow-hidden hover:border-eastdigital-orange/30 transition-all duration-300 hover:shadow-lg hover:shadow-eastdigital-orange/10 hover:-translate-y-1">
        {/* Image Section */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <img 
            src={project.featuredImage} 
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          
          {/* Status Badge */}
          <div className="absolute top-3 right-3">
            <span className={`px-2 py-1 rounded-md text-xs font-medium border ${getStatusColor(project.status)}`}>
              {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
            </span>
          </div>
          
          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <span className="bg-eastdigital-orange/90 backdrop-blur-sm text-white px-3 py-1 rounded-md text-xs font-medium">
              {project.category}
            </span>
          </div>
          
          {/* Hover Arrow */}
          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
              <ArrowRight className="h-4 w-4 text-gray-900" />
            </div>
          </div>
        </div>
        
        {/* Content Section */}
        <div className="p-4">
          <div className="flex items-center gap-3 mb-3 text-xs text-gray-400">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{project.year}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span>{project.location}</span>
            </div>
          </div>
          
          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-eastdigital-orange transition-colors duration-300 line-clamp-1">
            {project.title}
          </h3>
          
          <p className="text-sm text-gray-400 mb-3 line-clamp-1">
            {project.subtitle}
          </p>
          
          <p className="text-sm text-gray-300 line-clamp-2 leading-relaxed">
            {project.shortDescription}
          </p>
          
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-800">
            <span className="text-xs text-gray-500">{project.client}</span>
            <span className="text-xs text-eastdigital-orange font-medium group-hover:text-eastdigital-hover transition-colors duration-300">
              View Project
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};
