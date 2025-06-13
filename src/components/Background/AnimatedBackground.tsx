
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
    pulsePhase: number;
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
      const particleCount = 80;
      
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.4 + 0.1,
          speed: Math.random() * 0.3 + 0.1,
          direction: Math.random() * Math.PI * 2,
          pulsePhase: Math.random() * Math.PI * 2
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      timeRef.current += 0.008;

      // Dynamic background gradient with subtle movement
      const gradient = ctx.createRadialGradient(
        canvas.width / 2 + Math.sin(timeRef.current * 0.3) * 50, 
        canvas.height / 3 + Math.cos(timeRef.current * 0.2) * 30, 
        0,
        canvas.width / 2, 
        canvas.height / 2, 
        Math.max(canvas.width, canvas.height) * 0.8
      );
      
      const pulseIntensity = 0.015 + Math.sin(timeRef.current * 1.5) * 0.008;
      gradient.addColorStop(0, `rgba(40, 40, 40, ${pulseIntensity})`);
      gradient.addColorStop(0.3, `rgba(25, 25, 25, ${pulseIntensity * 0.7})`);
      gradient.addColorStop(0.7, `rgba(15, 15, 15, ${pulseIntensity * 0.5})`);
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0.01)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Floating particles with enhanced movement
      particlesRef.current.forEach((particle, index) => {
        // Update position with organic movement
        particle.x += Math.cos(particle.direction) * particle.speed;
        particle.y += Math.sin(particle.direction) * particle.speed;
        
        // Add subtle drift based on time
        particle.x += Math.sin(timeRef.current * 0.5 + index * 0.1) * 0.2;
        particle.y += Math.cos(timeRef.current * 0.3 + index * 0.15) * 0.15;
        
        // Gentle direction changes
        particle.direction += (Math.random() - 0.5) * 0.03;
        
        // Wrap around edges with buffer
        if (particle.x < -50) particle.x = canvas.width + 50;
        if (particle.x > canvas.width + 50) particle.x = -50;
        if (particle.y < -50) particle.y = canvas.height + 50;
        if (particle.y > canvas.height + 50) particle.y = -50;
        
        // Enhanced pulsing opacity
        const baseOpacity = particle.opacity;
        const pulseOffset = Math.sin(timeRef.current * 2 + particle.pulsePhase) * 0.3;
        const dynamicOpacity = baseOpacity * (0.6 + pulseOffset);
        
        // Draw particle with glow effect
        ctx.save();
        ctx.globalAlpha = dynamicOpacity;
        
        // Main particle
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Glow layers
        ctx.globalAlpha = dynamicOpacity * 0.4;
        ctx.fillStyle = 'rgba(255, 105, 0, 0.2)';
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 2.5, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.globalAlpha = dynamicOpacity * 0.2;
        ctx.fillStyle = 'rgba(255, 224, 202, 0.1)';
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 4, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
      });

      // Enhanced grid pattern with movement
      const gridSize = 120;
      const gridOpacity = 0.015 + Math.sin(timeRef.current * 0.8) * 0.008;
      const gridOffset = Math.sin(timeRef.current * 0.2) * 20;
      
      ctx.save();
      ctx.globalAlpha = gridOpacity;
      ctx.strokeStyle = 'rgba(255, 105, 0, 0.15)';
      ctx.lineWidth = 0.5;
      
      // Vertical lines with subtle movement
      for (let x = gridOffset; x < canvas.width + gridSize; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x + Math.sin(timeRef.current + x * 0.01) * 10, canvas.height);
        ctx.stroke();
      }
      
      // Horizontal lines with subtle movement
      for (let y = gridOffset; y < canvas.height + gridSize; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y + Math.cos(timeRef.current + y * 0.01) * 8);
        ctx.stroke();
      }
      ctx.restore();

      // Add subtle flowing energy streams
      for (let i = 0; i < 2; i++) {
        const streamX = (canvas.width / 3) * (i + 1) + Math.sin(timeRef.current * 0.4 + i * Math.PI) * 100;
        const streamOpacity = 0.008 + Math.sin(timeRef.current * 1.2 + i * 1.5) * 0.004;
        
        const streamGradient = ctx.createLinearGradient(streamX, 0, streamX, canvas.height);
        streamGradient.addColorStop(0, `rgba(255, 105, 0, ${streamOpacity})`);
        streamGradient.addColorStop(0.5, `rgba(157, 78, 221, ${streamOpacity * 0.8})`);
        streamGradient.addColorStop(1, 'rgba(0, 255, 183, 0)');

        ctx.save();
        ctx.filter = 'blur(12px)';
        ctx.fillStyle = streamGradient;
        ctx.fillRect(streamX - 30, 0, 60, canvas.height);
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
