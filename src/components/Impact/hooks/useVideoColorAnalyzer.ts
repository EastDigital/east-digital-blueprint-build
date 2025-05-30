
import { useState, useRef, useCallback, useEffect } from 'react';

export const useVideoColorAnalyzer = () => {
  const [dominantColor, setDominantColor] = useState('#FF6900');
  const [glowIntensity, setGlowIntensity] = useState(0.5);
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
