
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Circle, Clock } from 'lucide-react';

interface MinimalProjectCardProps {
  project: {
    id: string;
    title: string;
    featuredImage: string;
    category: string;
    status: 'completed' | 'in-progress' | 'upcoming';
    subtitle?: string;
  };
}

export const MinimalProjectCard = ({ project }: MinimalProjectCardProps) => {
  const navigate = useNavigate();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <Circle className="h-4 w-4 text-emerald-500 fill-emerald-500" />;
      case 'in-progress':
        return <Clock className="h-4 w-4 text-amber-500" />;
      case 'upcoming':
        return <Circle className="h-4 w-4 text-slate-400" />;
      default:
        return <Circle className="h-4 w-4 text-slate-400" />;
    }
  };

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    console.log('Project card clicked - navigating to:', `/project/${project.id}`);
    navigate(`/project/${project.id}`);
  };

  return (
    <div className="group">
      <div 
        onClick={handleCardClick}
        className="block cursor-pointer bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-xl overflow-hidden hover:border-eastdigital-orange/30 transition-all duration-300 hover:shadow-lg hover:shadow-eastdigital-orange/10 hover:-translate-y-1"
      >
        {/* Image Section */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img 
            src={project.featuredImage} 
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* 20% Top Overlay - Black to Transparent */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(to bottom, #000000 0%, rgba(0,0,0,0.8) 10%, rgba(0,0,0,0.3) 20%, transparent 20%)'
            }}
          ></div>
          
          {/* Status Icon */}
          <div className="absolute top-3 right-3 z-10">
            {getStatusIcon(project.status)}
          </div>
          
          {/* Category Badge */}
          <div className="absolute top-3 left-3 z-10">
            <span className="text-white px-2 py-1 rounded text-xs font-medium">
              {project.category}
            </span>
          </div>
        </div>
        
        {/* Content Section */}
        <div className="p-4">
          <h3 className="text-base font-semibold text-white group-hover:text-eastdigital-orange transition-colors duration-300 line-clamp-1 mb-2">
            {project.title}
          </h3>
          {project.subtitle && (
            <p className="text-gray-400 text-sm line-clamp-2">
              {project.subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
