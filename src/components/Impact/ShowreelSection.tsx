
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

export const ShowreelSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [dominantColor, setDominantColor] = useState('#FF6900');
  const [glowIntensity, setGlowIntensity] = useState(0.5);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();

  // Function to extract dominant color from video frame
  const extractDominantColor = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    if (!ctx || video.videoWidth === 0 || video.videoHeight === 0) return;
    
    // Set canvas size to match video (scaled down for performance)
    const scale = 0.1;
    canvas.width = video.videoWidth * scale;
    canvas.height = video.videoHeight * scale;
    
    // Draw current video frame to canvas
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    try {
      // Get pixel data
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      // Sample pixels for color analysis (every 4th pixel for performance)
      const colorCounts: Record<string, number> = {};
      let totalBrightness = 0;
      let pixelCount = 0;
      
      for (let i = 0; i < data.length; i += 16) { // Skip pixels for performance
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const alpha = data[i + 3];
        
        if (alpha > 128) { // Only consider non-transparent pixels
          // Calculate brightness
          const brightness = (r * 0.299 + g * 0.587 + b * 0.114) / 255;
          totalBrightness += brightness;
          pixelCount++;
          
          // Group similar colors together (reduce precision)
          const rBucket = Math.floor(r / 32) * 32;
          const gBucket = Math.floor(g / 32) * 32;
          const bBucket = Math.floor(b / 32) * 32;
          
          const colorKey = `${rBucket},${gBucket},${bBucket}`;
          colorCounts[colorKey] = (colorCounts[colorKey] || 0) + 1;
        }
      }
      
      // Find the most common color (excluding very dark colors)
      let dominantColorKey = '';
      let maxCount = 0;
      
      Object.entries(colorCounts).forEach(([colorKey, count]) => {
        const [r, g, b] = colorKey.split(',').map(Number);
        const brightness = (r * 0.299 + g * 0.587 + b * 0.114) / 255;
        
        // Prefer brighter, more saturated colors for the glow
        if (brightness > 0.2 && count > maxCount) {
          dominantColorKey = colorKey;
          maxCount = count;
        }
      });
      
      if (dominantColorKey) {
        const [r, g, b] = dominantColorKey.split(',').map(Number);
        const hexColor = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
        setDominantColor(hexColor);
      }
      
      // Set glow intensity based on average brightness
      const avgBrightness = pixelCount > 0 ? totalBrightness / pixelCount : 0.5;
      setGlowIntensity(Math.max(0.3, Math.min(1, avgBrightness * 1.5)));
      
    } catch (error) {
      console.log('Color extraction error (normal during video loading):', error);
    }
  }, []);

  // Start color analysis when video plays
  const startColorAnalysis = useCallback(() => {
    const analyzeFrame = () => {
      extractDominantColor();
      animationFrameRef.current = requestAnimationFrame(analyzeFrame);
    };
    analyzeFrame();
  }, [extractDominantColor]);

  // Stop color analysis
  const stopColorAnalysis = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  }, []);

  // Handle video play/pause
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        stopColorAnalysis();
      } else {
        videoRef.current.play();
        startColorAnalysis();
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

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopColorAnalysis();
    };
  }, [stopColorAnalysis]);

  // Dynamic glow style based on extracted color and intensity
  const dynamicGlowStyle = {
    background: `radial-gradient(ellipse at center, ${dominantColor}${Math.floor(glowIntensity * 127).toString(16).padStart(2, '0')} 0%, transparent 70%)`,
    opacity: glowIntensity,
    transition: 'all 0.3s ease-out'
  };

  return (
    <section className="py-16 lg:py-24 relative overflow-hidden" style={{ backgroundColor: '#222222' }}>
      {/* Hidden canvas for color analysis */}
      <canvas 
        ref={canvasRef} 
        style={{ display: 'none' }}
        aria-hidden="true"
      />

      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-r from-eastdigital-orange/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-l from-eastdigital-orange/8 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-b from-eastdigital-orange/5 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-4 lg:mb-6 animate-fade-in">
            <span className="bg-gradient-to-r from-white via-eastdigital-orange to-white bg-clip-text text-transparent">
              See Our Work in Action
            </span>
          </h2>
          <p className="text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto px-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Experience the magic of transformation through our 3D architectural visualizations, 
            strategic digital campaigns, and immersive experiences that bring visions to life.
          </p>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          {/* Dynamic Video-Synced Glow Effect */}
          <div 
            className="absolute -inset-8 rounded-3xl blur-2xl transition-all duration-300 ease-out"
            style={dynamicGlowStyle}
          ></div>
          
          {/* Secondary glow layer for more depth */}
          <div 
            className="absolute -inset-4 rounded-3xl blur-xl opacity-70 transition-all duration-200 ease-out"
            style={{
              background: `radial-gradient(ellipse at center, ${dominantColor}40 0%, transparent 60%)`,
            }}
          ></div>
          
          <div className="relative aspect-video rounded-2xl lg:rounded-3xl overflow-hidden bg-black shadow-2xl border border-eastdigital-orange/20">
            {/* Actual Video */}
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              muted={isMuted}
              loop
              playsInline
              crossOrigin="anonymous"
              onLoadedData={() => {
                // Auto-play with a slight delay for better UX
                setTimeout(() => {
                  if (videoRef.current && !isPlaying) {
                    videoRef.current.play();
                    setIsPlaying(true);
                    startColorAnalysis();
                  }
                }, 500);
              }}
              onPlay={() => startColorAnalysis()}
              onPause={() => stopColorAnalysis()}
            >
              <source src="https://www.eastdigital.in/web-images/3d-arch-demo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
            {/* Video Controls Overlay */}
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

          {/* Call to Action Below Video */}
          <div className="text-center mt-8 lg:mt-12">
            <p className="text-eastdigital-orange font-semibold text-lg mb-4">
              Ready to Transform Your Vision?
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="px-4 py-2 bg-eastdigital-orange/10 border border-eastdigital-orange/30 rounded-full text-white text-sm">
                3D Architectural Rendering
              </span>
              <span className="px-4 py-2 bg-eastdigital-orange/10 border border-eastdigital-orange/30 rounded-full text-white text-sm">
                Digital Marketing Campaigns
              </span>
              <span className="px-4 py-2 bg-eastdigital-orange/10 border border-eastdigital-orange/30 rounded-full text-white text-sm">
                Immersive Experiences
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
