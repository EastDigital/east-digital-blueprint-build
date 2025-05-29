
import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Clock, Calendar } from 'lucide-react';

interface MinimalProjectCardProps {
  project: {
    id: string;
    title: string;
    featuredImage: string;
    category: string;
    status: 'completed' | 'in-progress' | 'upcoming';
  };
}

export const MinimalProjectCard = ({ project }: MinimalProjectCardProps) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'in-progress':
        return <Clock className="h-4 w-4 text-orange-400" />;
      case 'upcoming':
        return <Calendar className="h-4 w-4 text-blue-400" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <Link to={`/project/${project.id}`} className="group block">
      <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-xl overflow-hidden hover:border-eastdigital-orange/30 transition-all duration-300 hover:shadow-lg hover:shadow-eastdigital-orange/10 hover:-translate-y-1">
        {/* Image Section */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img 
            src={project.featuredImage} 
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* 20% Top Overlay - Black to Transparent */}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/50 to-transparent" style={{
            background: 'linear-gradient(to bottom, #000000 0%, rgba(0,0,0,0.8) 10%, rgba(0,0,0,0.3) 20%, transparent 20%)'
          }}></div>
          
          {/* Status Icon */}
          <div className="absolute top-3 right-3 z-10">
            {getStatusIcon(project.status)}
          </div>
          
          {/* Category Badge */}
          <div className="absolute top-3 left-3 z-10">
            <span className="bg-eastdigital-orange/90 backdrop-blur-sm text-white px-2 py-1 rounded text-xs font-medium">
              {project.category}
            </span>
          </div>
        </div>
        
        {/* Minimal Content Section */}
        <div className="p-3">
          <h3 className="text-base font-semibold text-white group-hover:text-eastdigital-orange transition-colors duration-300 line-clamp-1">
            {project.title}
          </h3>
        </div>
      </div>
    </Link>
  );
};
