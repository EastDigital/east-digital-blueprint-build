
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Handshake, Clock, Star } from 'lucide-react';

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
        return <Handshake className="h-4 w-4 text-emerald-400 fill-emerald-400" />;
      case 'in-progress':
        return <Clock className="h-4 w-4 text-amber-400" />;
      case 'upcoming':
        return <Star className="h-4 w-4 text-blue-400" />;
      default:
        return <Handshake className="h-4 w-4 text-slate-400" />;
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
        className="block cursor-pointer bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl overflow-hidden hover:border-eastdigital-orange/30 transition-all duration-500 hover:shadow-xl hover:shadow-eastdigital-orange/20 hover:-translate-y-2 hover:scale-[1.02]"
      >
        {/* Image Section */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img 
            src={project.featuredImage} 
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Modern gradient overlay similar to home page */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-b from-purple-600/20 via-blue-600/15 via-cyan-500/10 to-transparent opacity-70"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-orange-400/8 via-yellow-300/5 to-transparent opacity-50"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400/8 via-blue-500/10 via-purple-600/8 to-transparent opacity-60"></div>
            {/* Enhanced bottom fade for seamless blending */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent via-black/20 to-black/60"></div>
          </div>
          
          {/* Status Icon with modern background */}
          <div className="absolute top-4 right-4 z-10">
            <div className="bg-black/40 backdrop-blur-md rounded-full p-2 border border-white/10">
              {getStatusIcon(project.status)}
            </div>
          </div>
        </div>
        
        {/* Content Section with modern spacing */}
        <div className="p-6">
          <h3 className="text-lg font-bold text-white group-hover:text-eastdigital-orange transition-colors duration-300 line-clamp-1 mb-3">
            {project.title}
          </h3>
          {project.subtitle && (
            <p className="text-gray-300 text-sm line-clamp-2 leading-relaxed">
              {project.subtitle}
            </p>
          )}
          
          {/* Modern status indicator */}
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-800/50">
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${
              project.status === 'completed' 
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                : project.status === 'in-progress'
                ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
            }`}>
              {project.status === 'completed' ? 'Completed' : project.status === 'in-progress' ? 'In Progress' : 'Upcoming'}
            </span>
            
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-xs text-eastdigital-orange font-medium">View Project →</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
