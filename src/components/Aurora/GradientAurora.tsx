
import React, { useEffect, useRef } from 'react';

interface GradientAuroraProps {
  className?: string;
}

export const GradientAurora = ({ className = '' }: GradientAuroraProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const timeRef = useRef(0);

  const auroraColors = [
    'rgba(255, 105, 0, 0.03)', // East Digital Orange - very subtle
    'rgba(255, 224, 202, 0.02)', // Light orange - very subtle
    'rgba(0, 255, 183, 0.015)', // Cyan - very subtle
    'rgba(157, 78, 221, 0.02)', // Purple - very subtle
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      timeRef.current += 0.005;

      // Create a subtle gradient from top to bottom
      const mainGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      
      // Very subtle color transitions
      const topIntensity = 0.08 + Math.sin(timeRef.current * 0.5) * 0.02;
      const midIntensity = 0.04 + Math.cos(timeRef.current * 0.3) * 0.015;
      const bottomIntensity = 0.02 + Math.sin(timeRef.current * 0.7) * 0.01;

      mainGradient.addColorStop(0, `rgba(255, 105, 0, ${topIntensity})`);
      mainGradient.addColorStop(0.3, `rgba(157, 78, 221, ${midIntensity})`);
      mainGradient.addColorStop(0.7, `rgba(0, 255, 183, ${midIntensity * 0.8})`);
      mainGradient.addColorStop(1, `rgba(255, 224, 202, ${bottomIntensity})`);

      ctx.fillStyle = mainGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add subtle horizontal waves for movement
      for (let i = 0; i < 3; i++) {
        const waveY = (canvas.height / 4) * (i + 1);
        const waveHeight = 100 + Math.sin(timeRef.current + i) * 30;
        
        const waveGradient = ctx.createLinearGradient(0, waveY - waveHeight, 0, waveY + waveHeight);
        const waveIntensity = 0.015 + Math.sin(timeRef.current * 0.8 + i * 0.5) * 0.005;
        
        waveGradient.addColorStop(0, 'rgba(255, 105, 0, 0)');
        waveGradient.addColorStop(0.5, `rgba(255, 105, 0, ${waveIntensity})`);
        waveGradient.addColorStop(1, 'rgba(255, 105, 0, 0)');

        ctx.save();
        ctx.fillStyle = waveGradient;
        
        // Create wave shape
        ctx.beginPath();
        for (let x = 0; x <= canvas.width; x += 20) {
          const y = waveY + Math.sin((x / 200) + timeRef.current + i) * (waveHeight / 3);
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.lineTo(canvas.width, waveY + waveHeight);
        ctx.lineTo(0, waveY + waveHeight);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ background: 'transparent' }}
    />
  );
};
