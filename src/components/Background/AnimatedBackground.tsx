
import React, { useEffect, useRef } from 'react';

interface AnimatedBackgroundProps {
  className?: string;
}

export const AnimatedBackground = ({ className = '' }: AnimatedBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const timeRef = useRef(0);
  const particlesRef = useRef<Array<{
    x: number;
    y: number;
    size: number;
    opacity: number;
    speed: number;
    direction: number;
  }>>([]);

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
      initializeParticles();
    };

    const initializeParticles = () => {
      particlesRef.current = [];
      const particleCount = 50;
      
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.3 + 0.1,
          speed: Math.random() * 0.5 + 0.2,
          direction: Math.random() * Math.PI * 2
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      timeRef.current += 0.005;

      // Subtle animated gradient base
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, 
        canvas.height / 3, 
        0,
        canvas.width / 2, 
        canvas.height / 2, 
        Math.max(canvas.width, canvas.height) * 0.8
      );
      
      const pulseIntensity = 0.01 + Math.sin(timeRef.current * 2) * 0.005;
      gradient.addColorStop(0, `rgba(20, 20, 20, ${pulseIntensity})`);
      gradient.addColorStop(0.4, `rgba(15, 15, 15, ${pulseIntensity * 0.8})`);
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0.02)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Animate floating particles
      particlesRef.current.forEach((particle, index) => {
        // Update position
        particle.x += Math.cos(particle.direction) * particle.speed;
        particle.y += Math.sin(particle.direction) * particle.speed;
        
        // Gentle direction changes
        particle.direction += (Math.random() - 0.5) * 0.02;
        
        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        // Pulsing opacity
        const baseOpacity = particle.opacity;
        const dynamicOpacity = baseOpacity * (0.5 + Math.sin(timeRef.current * 3 + index) * 0.5);
        
        // Draw particle
        ctx.save();
        ctx.globalAlpha = dynamicOpacity;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        
        // Draw subtle glow
        ctx.save();
        ctx.globalAlpha = dynamicOpacity * 0.3;
        ctx.fillStyle = 'rgba(255, 105, 0, 0.1)';
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Add subtle grid pattern
      const gridSize = 100;
      const gridOpacity = 0.01 + Math.sin(timeRef.current) * 0.005;
      
      ctx.save();
      ctx.globalAlpha = gridOpacity;
      ctx.strokeStyle = 'rgba(255, 105, 0, 0.1)';
      ctx.lineWidth = 0.5;
      
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      ctx.restore();

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
