
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Pause } from 'lucide-react';

interface ProjectCardProps {
  name: string;
  image: string;
  video?: string | null;
  videoThumbnail?: string | null;
  projectId: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ 
  name, 
  image, 
  video, 
  videoThumbnail, 
  projectId 
}) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/project/${projectId}`);
  };

  const handleVideoToggle = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click when toggling video
    setIsVideoPlaying(!isVideoPlaying);
  };

  const handleVideoError = () => {
    setVideoError(true);
    setIsVideoPlaying(false);
  };

  const displayImage = videoThumbnail || image;
  const hasVideo = video && !videoError;

  return (
    <div 
      className="relative flex-shrink-0 w-[280px] sm:w-[320px] md:w-[380px] lg:w-[420px] h-[180px] sm:h-[200px] md:h-[240px] lg:h-[280px] rounded-2xl overflow-hidden cursor-pointer group transition-all duration-300 hover:scale-105 hover:shadow-2xl"
      onClick={handleCardClick}
    >
      {/* Background Image/Video */}
      <div className="absolute inset-0">
        {hasVideo && isVideoPlaying ? (
          <video
            className="w-full h-full object-cover"
            src={video}
            autoPlay
            muted
            loop
            onError={handleVideoError}
          />
        ) : (
          <img 
            src={displayImage} 
            alt={name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        )}
      </div>

      {/* Top Dark Overlay */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black/80 to-transparent"></div>

      {/* Video Play Button */}
      {hasVideo && (
        <button
          onClick={handleVideoToggle}
          className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 backdrop-blur-sm z-10"
          aria-label={isVideoPlaying ? "Pause video" : "Play video"}
        >
          {isVideoPlaying ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="h-4 w-4 ml-0.5" />
          )}
        </button>
      )}

      {/* Content - Now at the top */}
      <div className="absolute top-0 left-0 right-0 p-4 sm:p-6 z-10">
        <h3 
          className="text-lg sm:text-xl md:text-2xl font-normal leading-tight"
          style={{ 
            color: '#FFE0CA',
            fontFamily: 'Poppins, sans-serif',
            fontSize: '16px'
          }}
        >
          {name}
        </h3>
        {hasVideo && (
          <p className="text-gray-300 text-sm mt-1 opacity-80">
            Click play to preview
          </p>
        )}
      </div>

      {/* Hover Effect */}
      <div className="absolute inset-0 bg-eastdigital-orange/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
};
