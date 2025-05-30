
import { useState, useRef, useCallback, useEffect } from 'react';

export const useVideoColorAnalyzer = () => {
  const [dominantColor, setDominantColor] = useState('#4A9EFF');
  const [glowIntensity, setGlowIntensity] = useState(0.6);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();

  // Function to extract dominant color from video frame
  const extractDominantColor = useCallback((videoElement: HTMLVideoElement) => {
    if (!videoElement || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    if (!ctx || videoElement.videoWidth === 0 || videoElement.videoHeight === 0) return;
    
    // Set canvas size to match video (scaled down for performance)
    const scale = 0.1;
    canvas.width = videoElement.videoWidth * scale;
    canvas.height = videoElement.videoHeight * scale;
    
    // Draw current video frame to canvas
    ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
    
    try {
      // Get pixel data from center area of the video (most important for lighting)
      const centerX = Math.floor(canvas.width * 0.3);
      const centerY = Math.floor(canvas.height * 0.3);
      const sampleWidth = Math.floor(canvas.width * 0.4);
      const sampleHeight = Math.floor(canvas.height * 0.4);
      
      const imageData = ctx.getImageData(centerX, centerY, sampleWidth, sampleHeight);
      const data = imageData.data;
      
      // Sample pixels for color analysis
      let totalR = 0, totalG = 0, totalB = 0;
      let totalBrightness = 0;
      let validPixels = 0;
      
      for (let i = 0; i < data.length; i += 16) { // Sample every 4th pixel
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const alpha = data[i + 3];
        
        if (alpha > 128) { // Only consider non-transparent pixels
          const brightness = (r * 0.299 + g * 0.587 + b * 0.114) / 255;
          
          // Weight brighter pixels more heavily for cinema effect
          const weight = Math.pow(brightness + 0.1, 1.5);
          
          totalR += r * weight;
          totalG += g * weight;
          totalB += b * weight;
          totalBrightness += brightness;
          validPixels += weight;
        }
      }
      
      if (validPixels > 0) {
        const avgR = Math.round(totalR / validPixels);
        const avgG = Math.round(totalG / validPixels);
        const avgB = Math.round(totalB / validPixels);
        
        const hexColor = `#${avgR.toString(16).padStart(2, '0')}${avgG.toString(16).padStart(2, '0')}${avgB.toString(16).padStart(2, '0')}`;
        setDominantColor(hexColor);
        
        // Cinema-appropriate intensity calculation
        const avgBrightness = totalBrightness / (validPixels || 1);
        const cinemaIntensity = Math.max(0.3, Math.min(1.0, avgBrightness * 1.5 + 0.2));
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
