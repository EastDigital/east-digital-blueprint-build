
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface SimpleProjectCardProps {
  project: {
    id: string;
    title: string;
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

  return (
    <div className="group">
      <div 
        onClick={handleCardClick}
        className="block cursor-pointer bg-gray-900/30 backdrop-blur-sm border border-gray-800/30 rounded-2xl overflow-hidden hover:border-eastdigital-orange/30 transition-all duration-500 hover:shadow-xl hover:shadow-eastdigital-orange/10 hover:-translate-y-1"
      >
        {/* Image Section */}
        <div className="relative aspect-[4/3] overflow-hidden">
          {project.featuredVideo ? (
            <div className="relative w-full h-full">
              <video
                src={project.featuredVideo}
                poster={project.videoThumbnail || project.featuredImage}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
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
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          )}
          
          {/* Subtle overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        
        {/* Content Section - Simplified */}
        <div className="p-6">
          <h3 className="text-lg font-semibold text-white group-hover:text-eastdigital-orange transition-colors duration-300 mb-2">
            {project.title}
          </h3>
          <p className="text-gray-400 text-sm">
            {project.client}
          </p>
        </div>
      </div>
    </div>
  );
};
