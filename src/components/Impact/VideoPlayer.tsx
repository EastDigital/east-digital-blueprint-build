
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
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Handle video play/pause
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        onPause();
        setIsPlaying(false);
      } else {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log('Video started playing successfully');
              setIsPlaying(true);
              onPlay(videoRef.current!);
            })
            .catch((error) => {
              console.error('Error playing video:', error);
              setVideoError(true);
            });
        }
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    console.error('Video error:', e);
    console.log('Video failed to load, showing placeholder');
    setVideoError(true);
    setIsLoading(false);
  };

  const handleLoadStart = () => {
    console.log('Video load started');
    setIsLoading(true);
    setVideoError(false);
  };

  const handleCanPlay = () => {
    console.log('Video can play');
    setIsLoading(false);
  };

  const handleLoadedData = () => {
    console.log('Video loaded successfully');
    setIsLoading(false);
    
    // Try to auto-play after a delay
    setTimeout(() => {
      if (videoRef.current && !isPlaying) {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log('Auto-play successful');
              setIsPlaying(true);
              onPlay(videoRef.current!);
            })
            .catch((error) => {
              console.log('Auto-play failed (this is normal on many browsers):', error);
            });
        }
      }
    }, 1000);
  };

  return (
    <div className="relative aspect-video rounded-2xl lg:rounded-3xl overflow-hidden bg-black shadow-2xl border border-eastdigital-orange/20">
      {!videoError ? (
        <>
          {/* Loading indicator */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black z-10">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-eastdigital-orange border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-white">Loading video...</p>
              </div>
            </div>
          )}

          {/* Actual Video */}
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            muted={isMuted}
            loop
            playsInline
            preload="metadata"
            onError={handleVideoError}
            onLoadStart={handleLoadStart}
            onCanPlay={handleCanPlay}
            onLoadedData={handleLoadedData}
            onPlay={() => {
              console.log('Video play event triggered');
              setIsPlaying(true);
              if (videoRef.current) {
                onPlay(videoRef.current);
              }
            }}
            onPause={() => {
              console.log('Video pause event triggered');
              setIsPlaying(false);
              onPause();
            }}
            style={{ zIndex: 1 }}
          >
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
            <h3 className="text-white text-xl font-semibold mb-2">Video Unavailable</h3>
            <p className="text-gray-400 mb-4">Unable to load the video content</p>
            <button 
              onClick={() => {
                setVideoError(false);
                setIsLoading(true);
                if (videoRef.current) {
                  videoRef.current.load();
                }
              }}
              className="px-4 py-2 bg-eastdigital-orange rounded-lg text-white hover:bg-eastdigital-orange/80 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      )}
      
      {/* Video Controls Overlay - only show if video is loaded */}
      {!videoError && !isLoading && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" style={{ zIndex: 2 }}>
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
    </div>
  );
};
