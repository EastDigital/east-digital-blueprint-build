
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Handshake, Clock, Star } from 'lucide-react';
import { LiquidGlassCard } from '@/components/LiquidGlass/LiquidGlassCard';

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

  const getStatusColors = (status: string) => {
    switch (status) {
      case 'completed':
        return {
          bg: 'bg-emerald-500/10',
          text: 'text-emerald-400',
          border: 'border-emerald-500/20',
          glow: 'shadow-emerald-500/20'
        };
      case 'in-progress':
        return {
          bg: 'bg-amber-500/10',
          text: 'text-amber-400',
          border: 'border-amber-500/20',
          glow: 'shadow-amber-500/20'
        };
      case 'upcoming':
        return {
          bg: 'bg-blue-500/10',
          text: 'text-blue-400',
          border: 'border-blue-500/20',
          glow: 'shadow-blue-500/20'
        };
      default:
        return {
          bg: 'bg-gray-500/10',
          text: 'text-gray-400',
          border: 'border-gray-500/20',
          glow: 'shadow-gray-500/20'
        };
    }
  };

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    console.log('Project card clicked - navigating to:', `/project/${project.id}`);
    navigate(`/project/${project.id}`);
  };

  const statusColors = getStatusColors(project.status);

  return (
    <div className="group">
      <LiquidGlassCard 
        variant="default"
        interactive={true}
        className="cursor-pointer border-2 border-transparent hover:border-eastdigital-orange/30 transition-all duration-500 hover:shadow-xl hover:shadow-eastdigital-orange/20 hover:-translate-y-2 hover:scale-[1.02]"
      >
        <div onClick={handleCardClick}>
          {/* Image Section with Enhanced Glass Effect */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl">
            <img 
              src={project.featuredImage} 
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            
            {/* Multi-layered Glass Overlay Effect */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Base gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-purple-600/20 via-blue-600/15 via-cyan-500/10 to-transparent opacity-70"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-orange-400/8 via-yellow-300/5 to-transparent opacity-50"></div>
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400/8 via-blue-500/10 via-purple-600/8 to-transparent opacity-60"></div>
              
              {/* Glass reflection effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-eastdigital-orange/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Enhanced bottom fade for seamless blending */}
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent via-black/20 to-black/60"></div>
            </div>
            
            {/* Status Icon with Liquid Glass Background */}
            <div className="absolute top-4 right-4 z-10">
              <LiquidGlassCard variant="subtle" className={`p-2 border ${statusColors.border} ${statusColors.glow} shadow-lg`}>
                {getStatusIcon(project.status)}
              </LiquidGlassCard>
            </div>
          </div>
          
          {/* Content Section with Enhanced Glass Effect */}
          <div className="relative p-6">
            {/* Content Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-eastdigital-orange/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-2xl"></div>
            
            <div className="relative z-10">
              <h3 className="text-lg font-bold text-white group-hover:text-eastdigital-orange transition-colors duration-300 line-clamp-1 mb-3">
                {project.title}
              </h3>
              {project.subtitle && (
                <p className="text-gray-300 text-sm line-clamp-2 leading-relaxed mb-4">
                  {project.subtitle}
                </p>
              )}
              
              {/* Enhanced Status Indicator */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-800/50">
                <LiquidGlassCard 
                  variant="subtle" 
                  className={`px-3 py-1.5 ${statusColors.bg} ${statusColors.border} backdrop-blur-xl`}
                >
                  <span className={`text-xs font-medium ${statusColors.text}`}>
                    {project.status === 'completed' ? 'Completed' : project.status === 'in-progress' ? 'In Progress' : 'Upcoming'}
                  </span>
                </LiquidGlassCard>
                
                {/* Call to Action with Glass Effect */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <LiquidGlassCard variant="subtle" className="px-3 py-1">
                    <span className="text-xs text-eastdigital-orange font-medium">View Project →</span>
                  </LiquidGlassCard>
                </div>
              </div>
            </div>
            
            {/* Enhanced Bottom Border Glow */}
            <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-gradient-to-r from-transparent via-eastdigital-orange/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
        </div>
      </LiquidGlassCard>
    </div>
  );
};
