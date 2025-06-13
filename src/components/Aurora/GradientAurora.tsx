
import React, { useEffect, useRef } from 'react';

interface GradientAuroraProps {
  className?: string;
}

export const GradientAurora = ({ className = '' }: GradientAuroraProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const timeRef = useRef(0);

  const auroraColors = [
    '#FF6900', // East Digital Orange
    '#FFE0CA', // Light orange
    '#00FFB7', // Cyan
    '#9D4EDD', // Purple
    '#FF006E', // Pink
    '#8338EC', // Violet
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
      timeRef.current += 0.01;

      // Create flowing gradient bands from top to bottom
      const numBands = 4;
      const bandHeight = canvas.height / numBands;

      for (let i = 0; i < numBands; i++) {
        // Create gradient for each band
        const gradient = ctx.createLinearGradient(0, i * bandHeight, 0, (i + 1) * bandHeight);
        
        const color1 = auroraColors[i % auroraColors.length];
        const color2 = auroraColors[(i + 1) % auroraColors.length];
        
        // Animated opacity for subtle flowing effect
        const opacity1 = 0.03 + Math.sin(timeRef.current * 2 + i * 0.5) * 0.02;
        const opacity2 = 0.02 + Math.cos(timeRef.current * 1.5 + i * 0.7) * 0.015;
        
        gradient.addColorStop(0, `${color1}${Math.floor(opacity1 * 255).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(0.5, `${color2}${Math.floor(opacity2 * 255).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(1, `${color1}${Math.floor(opacity1 * 0.5 * 255).toString(16).padStart(2, '0')}`);

        // Apply wave-like horizontal movement
        const waveOffset = Math.sin(timeRef.current + i * 0.8) * 50;
        
        ctx.save();
        ctx.translate(waveOffset, 0);
        ctx.fillStyle = gradient;
        ctx.fillRect(-100, i * bandHeight, canvas.width + 200, bandHeight + 20);
        ctx.restore();
      }

      // Add subtle vertical flowing streaks
      for (let i = 0; i < 3; i++) {
        const x = (canvas.width / 4) * (i + 1) + Math.sin(timeRef.current * 0.8 + i) * 100;
        const streakGradient = ctx.createLinearGradient(x, 0, x, canvas.height);
        
        const color = auroraColors[Math.floor(timeRef.current * 0.2 + i) % auroraColors.length];
        const opacity = 0.02 + Math.sin(timeRef.current * 1.2 + i * 1.5) * 0.01;
        
        streakGradient.addColorStop(0, `${color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`);
        streakGradient.addColorStop(0.5, `${color}${Math.floor(opacity * 0.8 * 255).toString(16).padStart(2, '0')}`);
        streakGradient.addColorStop(1, `${color}00`);

        ctx.save();
        ctx.filter = 'blur(8px)';
        ctx.fillStyle = streakGradient;
        ctx.fillRect(x - 40, 0, 80, canvas.height);
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
