
import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface VideoPlayerProps {
  onPlay: (videoElement: HTMLVideoElement) => void;
  onPause: () => void;
  dominantColor: string;
}

export const VideoPlayer = ({ onPlay, onPause, dominantColor }: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Handle video play/pause
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        onPause();
      } else {
        videoRef.current.play();
        onPlay(videoRef.current);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVideoError = () => {
    console.log('Video failed to load, showing placeholder');
    setVideoError(true);
  };

  return (
    <div className="relative aspect-video rounded-2xl lg:rounded-3xl overflow-hidden bg-black shadow-2xl border border-eastdigital-orange/20">
      {!videoError ? (
        <>
          {/* Actual Video */}
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            muted={isMuted}
            loop
            playsInline
            crossOrigin="anonymous"
            onError={handleVideoError}
            onLoadedData={() => {
              console.log('Video loaded successfully');
              // Auto-play with a slight delay for better UX
              setTimeout(() => {
                if (videoRef.current && !isPlaying) {
                  videoRef.current.play().then(() => {
                    setIsPlaying(true);
                    onPlay(videoRef.current!);
                  }).catch((error) => {
                    console.log('Auto-play failed:', error);
                  });
                }
              }, 500);
            }}
            onPlay={() => {
              if (videoRef.current) {
                onPlay(videoRef.current);
              }
            }}
            onPause={onPause}
          >
            {/* Use the correct video URL */}
            <source src="https://www.eastdigital.in/web-images/3d-arch-demo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </>
      ) : (
        // Placeholder when video fails to load
        <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-eastdigital-orange/20 rounded-full flex items-center justify-center mb-4 mx-auto">
              <Play className="h-8 w-8 text-eastdigital-orange ml-1" />
            </div>
            <h3 className="text-white text-xl font-semibold mb-2">Showreel Coming Soon</h3>
            <p className="text-gray-400">Our latest projects showcase will be available shortly</p>
          </div>
        </div>
      )}
      
      {/* Video Controls Overlay - only show if video is loaded */}
      {!videoError && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
            {/* Play/Pause Button */}
            <button 
              onClick={togglePlay}
              className="group bg-eastdigital-orange/90 backdrop-blur-sm border border-eastdigital-orange rounded-full p-3 hover:bg-eastdigital-orange transition-all duration-300 hover:scale-110"
            >
              {isPlaying ? (
                <Pause className="h-6 w-6 text-white group-hover:scale-110 transition-transform duration-300" fill="white" />
              ) : (
                <Play className="h-6 w-6 text-white ml-0.5 group-hover:scale-110 transition-transform duration-300" fill="white" />
              )}
            </button>

            {/* Volume Button */}
            <button 
              onClick={toggleMute}
              className="group bg-white/10 backdrop-blur-sm border border-white/20 rounded-full p-3 hover:bg-white/20 transition-all duration-300"
            >
              {isMuted ? (
                <VolumeX className="h-5 w-5 text-white group-hover:scale-110 transition-transform duration-300" />
              ) : (
                <Volume2 className="h-5 w-5 text-white group-hover:scale-110 transition-transform duration-300" />
              )}
            </button>
          </div>
        </div>
      )}

      {/* Floating Elements for Visual Interest */}
      <div className="absolute top-4 right-4 opacity-20">
        <div 
          className="w-3 h-3 rounded-full animate-ping transition-all duration-300"
          style={{ backgroundColor: dominantColor }}
        ></div>
      </div>
      <div className="absolute bottom-4 left-4 opacity-20">
        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};
