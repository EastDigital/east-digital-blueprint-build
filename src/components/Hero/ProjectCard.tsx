import React, { useState, useRef, useEffect } from 'react';
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
  const [isHovering, setIsHovering] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout>();
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
  const handleMouseEnter = () => {
    if (video && !videoError) {
      setIsHovering(true);
      setIsVideoPlaying(true);

      // Stop video after 10 seconds
      hoverTimeoutRef.current = setTimeout(() => {
        setIsVideoPlaying(false);
        if (videoRef.current) {
          videoRef.current.currentTime = 0; // Reset to beginning
        }
      }, 10000); // 10 seconds
    }
  };
  const handleMouseLeave = () => {
    setIsHovering(false);
    setIsVideoPlaying(false);

    // Clear the timeout if user leaves before 10 seconds
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }

    // Reset video to beginning
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  };

  // Effect to handle video play/pause
  useEffect(() => {
    if (videoRef.current) {
      if (isVideoPlaying && video && !videoError) {
        videoRef.current.play().catch(() => {
          setVideoError(true);
          setIsVideoPlaying(false);
        });
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isVideoPlaying, video, videoError]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);
  const displayImage = videoThumbnail || image;
  const hasVideo = video && !videoError;
  return <div className="relative flex-shrink-0 w-[280px] sm:w-[320px] md:w-[380px] lg:w-[420px] h-[234px] sm:h-[240px] md:h-[288px] lg:h-[336px] rounded-2xl overflow-hidden cursor-pointer group transition-all duration-300 hover:scale-105 hover:shadow-2xl" onClick={handleCardClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {/* Background Image/Video */}
      <div className="absolute inset-0">
        {hasVideo ? <>
            {/* Video element - always present but conditionally visible */}
            <video ref={videoRef} className={`w-full h-full object-cover transition-opacity duration-300 ${isVideoPlaying ? 'opacity-100' : 'opacity-0'}`} src={video} muted playsInline onError={handleVideoError} style={{
          pointerEvents: 'none'
        }} />
            {/* Thumbnail/Image - shown when video is not playing */}
            <img src={displayImage} alt={name} className={`absolute inset-0 w-full h-full object-cover transition-all duration-300 ${isVideoPlaying ? 'opacity-0' : 'opacity-100'} group-hover:scale-110`} />
          </> : <img src={displayImage} alt={name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />}
      </div>

      {/* Top Dark Overlay - Increased by 10% */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/80 to-transparent"></div>

      {/* Video Play Button - Only show when not auto-playing on hover */}
      {hasVideo && !isHovering && <button onClick={handleVideoToggle} className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 backdrop-blur-sm z-10" aria-label={isVideoPlaying ? "Pause video" : "Play video"}>
          {isVideoPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
        </button>}

      {/* Content - Moved higher */}
      <div className="absolute top-0 left-0 right-0 p-3 sm:p-4 z-10 py-[8px]">
        <h3 className="text-lg sm:text-xl md:text-2xl font-normal leading-tight" style={{
        color: '#FFE0CA',
        fontFamily: 'Poppins, sans-serif',
        fontSize: '16px'
      }}>
          {name}
        </h3>
        {hasVideo && <p className="text-gray-300 text-sm mt-1 opacity-80">
            {isHovering ? 'Playing preview...' : 'Hover to preview'}
          </p>}
      </div>

      {/* Hover Effect */}
      <div className="absolute inset-0 bg-eastdigital-orange/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 py-0"></div>
    </div>;
};