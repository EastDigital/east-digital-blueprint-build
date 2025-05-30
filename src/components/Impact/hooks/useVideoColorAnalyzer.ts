
import { useState, useRef, useCallback, useEffect } from 'react';

export const useVideoColorAnalyzer = () => {
  const [dominantColor, setDominantColor] = useState('#4A9EFF'); // Changed default to blue
  const [glowIntensity, setGlowIntensity] = useState(0.4); // Lower default intensity
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
      
      // Sample pixels for color analysis
      const colorCounts: Record<string, { count: number; brightness: number; saturation: number }> = {};
      let totalBrightness = 0;
      let pixelCount = 0;
      
      for (let i = 0; i < data.length; i += 16) { // Less frequent sampling for performance
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const alpha = data[i + 3];
        
        if (alpha > 128) { // Only consider non-transparent pixels
          // Calculate brightness and saturation
          const brightness = (r * 0.299 + g * 0.587 + b * 0.114) / 255;
          const max = Math.max(r, g, b) / 255;
          const min = Math.min(r, g, b) / 255;
          const saturation = max === 0 ? 0 : (max - min) / max;
          
          totalBrightness += brightness;
          pixelCount++;
          
          // Group colors with wider buckets to find true dominant colors
          const rBucket = Math.floor(r / 32) * 32;
          const gBucket = Math.floor(g / 32) * 32;
          const bBucket = Math.floor(b / 32) * 32;
          
          const colorKey = `${rBucket},${gBucket},${bBucket}`;
          if (!colorCounts[colorKey]) {
            colorCounts[colorKey] = { count: 0, brightness: 0, saturation: 0 };
          }
          colorCounts[colorKey].count += 1;
          colorCounts[colorKey].brightness += brightness;
          colorCounts[colorKey].saturation += saturation;
        }
      }
      
      // Find the most suitable color for ambient lighting
      let dominantColorKey = '';
      let maxScore = 0;
      
      Object.entries(colorCounts).forEach(([colorKey, data]) => {
        const [r, g, b] = colorKey.split(',').map(Number);
        const avgBrightness = data.brightness / data.count;
        const avgSaturation = data.saturation / data.count;
        
        // Prefer colors that are visible but not too dark or too bright
        const score = (avgBrightness * 0.3 + avgSaturation * 0.3 + (data.count / pixelCount) * 0.4) * data.count;
        
        if (avgBrightness > 0.1 && avgBrightness < 0.9 && score > maxScore) {
          dominantColorKey = colorKey;
          maxScore = score;
        }
      });
      
      if (dominantColorKey) {
        const [r, g, b] = dominantColorKey.split(',').map(Number);
        const hexColor = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
        setDominantColor(hexColor);
        console.log('Detected dominant color:', hexColor);
      }
      
      // More conservative glow intensity calculation
      const avgBrightness = pixelCount > 0 ? totalBrightness / pixelCount : 0.4;
      const conservativeIntensity = Math.max(0.2, Math.min(0.8, avgBrightness * 1.2));
      setGlowIntensity(conservativeIntensity);
      
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
