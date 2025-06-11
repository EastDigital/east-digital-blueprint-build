
import React, { useEffect, useRef } from 'react';

interface InteractiveAuroraProps {
  intensity?: 'low' | 'medium' | 'high';
  className?: string;
}

export const InteractiveAurora = ({ intensity = 'high', className = '' }: InteractiveAuroraProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0 });
  const timeRef = useRef(0);
  const auroraLayers = useRef<Array<{
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;
    opacity: number;
    speed: number;
    direction: number;
    phase: number;
    amplitude: number;
  }>>([]);

  const auroraColors = [
    '#FF6900', // East Digital Orange
    '#FFE0CA', // Light orange
    '#00FFB7', // Cyan
    '#9D4EDD', // Purple
    '#FF006E', // Pink
    '#8338EC', // Violet
    '#3A86FF', // Blue
    '#06FFA5', // Green
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
      initializeAurora();
    };

    const initializeAurora = () => {
      auroraLayers.current = [];
      const layerCount = intensity === 'high' ? 8 : intensity === 'medium' ? 5 : 3;
      
      for (let i = 0; i < layerCount; i++) {
        auroraLayers.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          width: 200 + Math.random() * 400,
          height: 100 + Math.random() * 200,
          color: auroraColors[Math.floor(Math.random() * auroraColors.length)],
          opacity: 0.1 + Math.random() * 0.3,
          speed: 0.5 + Math.random() * 2,
          direction: Math.random() * Math.PI * 2,
          phase: Math.random() * Math.PI * 2,
          amplitude: 50 + Math.random() * 100
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      timeRef.current += 0.02;

      // Create base gradient
      const baseGradient = ctx.createRadialGradient(
        canvas.width / 2, 
        canvas.height / 2, 
        0,
        canvas.width / 2, 
        canvas.height / 2, 
        Math.max(canvas.width, canvas.height)
      );
      baseGradient.addColorStop(0, 'rgba(0, 0, 0, 0.1)');
      baseGradient.addColorStop(1, 'rgba(0, 0, 0, 0.3)');
      ctx.fillStyle = baseGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw aurora layers
      auroraLayers.current.forEach((layer, index) => {
        // Random color changes
        if (Math.random() < 0.002) {
          layer.color = auroraColors[Math.floor(Math.random() * auroraColors.length)];
        }

        // Mouse interaction - stronger effect
        const mouseDistance = Math.sqrt(
          Math.pow(mouseRef.current.x - layer.x, 2) + 
          Math.pow(mouseRef.current.y - layer.y, 2)
        );
        const mouseInfluence = Math.max(0, 1 - mouseDistance / 300) * 2;

        // Update position with random movement
        layer.x += Math.sin(timeRef.current * layer.speed + layer.phase) * layer.amplitude * 0.01;
        layer.y += Math.cos(timeRef.current * layer.speed * 0.7 + layer.phase) * layer.amplitude * 0.005;
        
        // Add mouse influence
        if (mouseInfluence > 0) {
          const dx = (mouseRef.current.x - layer.x) * mouseInfluence * 0.02;
          const dy = (mouseRef.current.y - layer.y) * mouseInfluence * 0.02;
          layer.x += dx;
          layer.y += dy;
        }

        // Wrap around edges
        if (layer.x < -layer.width) layer.x = canvas.width + layer.width;
        if (layer.x > canvas.width + layer.width) layer.x = -layer.width;
        if (layer.y < -layer.height) layer.y = canvas.height + layer.height;
        if (layer.y > canvas.height + layer.height) layer.y = -layer.height;

        // Dynamic opacity changes
        const baseOpacity = layer.opacity;
        const dynamicOpacity = baseOpacity + Math.sin(timeRef.current * 2 + index) * 0.1 + mouseInfluence * 0.2;

        // Create aurora gradient
        const gradient = ctx.createRadialGradient(
          layer.x, layer.y, 0,
          layer.x, layer.y, layer.width
        );
        
        const color = layer.color;
        gradient.addColorStop(0, `${color}${Math.floor(dynamicOpacity * 255).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(0.5, `${color}${Math.floor(dynamicOpacity * 0.5 * 255).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(1, `${color}00`);

        // Draw aurora with blur effect
        ctx.save();
        ctx.filter = `blur(${20 + mouseInfluence * 10}px)`;
        ctx.fillStyle = gradient;
        
        // Create wavy aurora shape
        ctx.beginPath();
        const segments = 20;
        for (let i = 0; i <= segments; i++) {
          const angle = (i / segments) * Math.PI * 2;
          const waveOffset = Math.sin(timeRef.current * 3 + angle * 3 + layer.phase) * 30;
          const x = layer.x + Math.cos(angle) * (layer.width + waveOffset);
          const y = layer.y + Math.sin(angle) * (layer.height + waveOffset * 0.5);
          
          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.closePath();
        ctx.fill();
        ctx.restore();

        // Add sparkle effects
        if (Math.random() < 0.1) {
          const sparkleX = layer.x + (Math.random() - 0.5) * layer.width;
          const sparkleY = layer.y + (Math.random() - 0.5) * layer.height;
          
          ctx.save();
          ctx.fillStyle = `${color}80`;
          ctx.beginPath();
          ctx.arc(sparkleX, sparkleY, 2 + Math.random() * 3, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      });

      // Add energy waves from mouse position
      if (mouseRef.current.x > 0 && mouseRef.current.y > 0) {
        const waveGradient = ctx.createRadialGradient(
          mouseRef.current.x, mouseRef.current.y, 0,
          mouseRef.current.x, mouseRef.current.y, 150
        );
        waveGradient.addColorStop(0, 'rgba(255, 105, 0, 0.3)');
        waveGradient.addColorStop(0.5, 'rgba(255, 105, 0, 0.1)');
        waveGradient.addColorStop(1, 'rgba(255, 105, 0, 0)');
        
        ctx.save();
        ctx.fillStyle = waveGradient;
        ctx.beginPath();
        ctx.arc(mouseRef.current.x, mouseRef.current.y, 150, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    animate();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ background: 'transparent' }}
    />
  );
};
