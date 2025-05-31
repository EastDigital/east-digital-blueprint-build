
import { useState, useRef, useCallback, useEffect } from 'react';

export const useVideoColorAnalyzer = () => {
  const [dominantColor, setDominantColor] = useState('#4A9EFF');
  const [glowIntensity, setGlowIntensity] = useState(0.8);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();

  // Function to extract dominant color from video frame
  const extractDominantColor = useCallback((videoElement: HTMLVideoElement) => {
    if (!videoElement || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    if (!ctx || videoElement.videoWidth === 0 || videoElement.videoHeight === 0) return;
    
    // Set canvas size to match video (scaled down for performance)
    const scale = 0.15; // Slightly higher resolution for better color detection
    canvas.width = videoElement.videoWidth * scale;
    canvas.height = videoElement.videoHeight * scale;
    
    // Draw current video frame to canvas
    ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
    
    try {
      // Get pixel data from center area of the video (most important for lighting)
      const centerX = Math.floor(canvas.width * 0.25);
      const centerY = Math.floor(canvas.height * 0.25);
      const sampleWidth = Math.floor(canvas.width * 0.5);
      const sampleHeight = Math.floor(canvas.height * 0.5);
      
      const imageData = ctx.getImageData(centerX, centerY, sampleWidth, sampleHeight);
      const data = imageData.data;
      
      // Sample pixels for color analysis
      let totalR = 0, totalG = 0, totalB = 0;
      let totalBrightness = 0;
      let validPixels = 0;
      
      for (let i = 0; i < data.length; i += 12) { // Sample every 3rd pixel for better coverage
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const alpha = data[i + 3];
        
        if (alpha > 100) { // Only consider non-transparent pixels
          const brightness = (r * 0.299 + g * 0.587 + b * 0.114) / 255;
          
          // Weight brighter pixels more heavily for cinema effect
          const weight = Math.pow(brightness + 0.2, 2.0); // Increased weighting for bright areas
          
          totalR += r * weight;
          totalG += g * weight;
          totalB += b * weight;
          totalBrightness += brightness;
          validPixels += weight;
        }
      }
      
      if (validPixels > 0) {
        let avgR = Math.round(totalR / validPixels);
        let avgG = Math.round(totalG / validPixels);
        let avgB = Math.round(totalB / validPixels);
        
        // Enhance color saturation for more vibrant cinema lighting
        const enhancementFactor = 1.4;
        avgR = Math.min(255, Math.round(avgR * enhancementFactor));
        avgG = Math.min(255, Math.round(avgG * enhancementFactor));
        avgB = Math.min(255, Math.round(avgB * enhancementFactor));
        
        const hexColor = `#${avgR.toString(16).padStart(2, '0')}${avgG.toString(16).padStart(2, '0')}${avgB.toString(16).padStart(2, '0')}`;
        setDominantColor(hexColor);
        
        // Enhanced cinema-appropriate intensity calculation
        const avgBrightness = totalBrightness / (validPixels || 1);
        const cinemaIntensity = Math.max(0.6, Math.min(1.0, avgBrightness * 2.0 + 0.4)); // Much stronger base intensity
        setGlowIntensity(cinemaIntensity);
      }
      
    } catch (error) {
      console.log('Color extraction error (normal during video loading):', error);
    }
  }, []);

  // Start color analysis when video plays
  const startColorAnalysis = useCallback((videoElement: HTMLVideoElement) => {
    const analyzeFrame = () => {
      extractDominantColor(videoElement);
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

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopColorAnalysis();
    };
  }, [stopColorAnalysis]);

  return {
    dominantColor,
    glowIntensity,
    canvasRef,
    startColorAnalysis,
    stopColorAnalysis
  };
};
