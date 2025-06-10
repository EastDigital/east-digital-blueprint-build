
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LiquidGlassCard } from '@/components/LiquidGlass/LiquidGlassCard';

interface SimpleProjectCardProps {
  project: {
    id: string;
    name: string;
    featuredImage: string;
    client: string;
    featuredVideo?: string;
    videoThumbnail?: string;
  };
}

export const SimpleProjectCard = ({ project }: SimpleProjectCardProps) => {
  const navigate = useNavigate();

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    console.log('Project card clicked - navigating to:', `/project/${project.id}`);
    navigate(`/project/${project.id}`);
  };

  console.log('SimpleProjectCard: Rendering project:', project.name);

  return (
    <div className="group">
      <LiquidGlassCard 
        className="cursor-pointer"
        variant="default"
        interactive={true}
      >
        <div onClick={handleCardClick}>
          {/* Image Section */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl">
            {project.featuredVideo ? (
              <div className="relative w-full h-full">
                <video
                  src={project.featuredVideo}
                  poster={project.videoThumbnail || project.featuredImage}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  muted
                  loop
                  playsInline
                  onMouseEnter={(e) => {
                    e.currentTarget.play();
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.pause();
                    e.currentTarget.currentTime = 0;
                  }}
                />
              </div>
            ) : (
              <img 
                src={project.featuredImage} 
                alt={project.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                onError={(e) => {
                  console.log('Image failed to load:', project.featuredImage);
                  e.currentTarget.src = '/placeholder.svg';
                }}
              />
            )}
            
            {/* Liquid Glass Overlay on Hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Refraction Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-eastdigital-orange/10 opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
          </div>
          
          {/* Content Section with Liquid Glass Effect */}
          <div className="p-6 relative">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-eastdigital-orange/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="relative z-10">
              <h3 className="text-lg font-semibold text-white group-hover:text-eastdigital-orange transition-colors duration-300 mb-2">
                {project.name}
              </h3>
              <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">
                {project.client}
              </p>
            </div>
          </div>
        </div>
      </LiquidGlassCard>
    </div>
  );
};
