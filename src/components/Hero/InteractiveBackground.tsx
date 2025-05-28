
import React, { useEffect, useRef } from 'react';

export const InteractiveBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0 });
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Wave animation
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      timeRef.current += 0.01;
      
      // Create gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, 'rgba(255, 105, 0, 0.05)');
      gradient.addColorStop(0.5, 'rgba(255, 105, 0, 0.02)');
      gradient.addColorStop(1, 'rgba(255, 105, 0, 0.05)');

      // Draw multiple wave layers
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2);

        // Create wave path
        for (let x = 0; x <= canvas.width; x += 5) {
          const baseWave = Math.sin((x * 0.005) + (timeRef.current * (1 + i * 0.3))) * 30;
          const mouseInfluence = Math.sin((x - mouseRef.current.x) * 0.01) * 
                                Math.exp(-Math.abs(x - mouseRef.current.x) * 0.001) * 20;
          const y = canvas.height / 2 + baseWave + mouseInfluence + (i * 40);
          
          ctx.lineTo(x, y);
        }

        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();

        ctx.fillStyle = gradient;
        ctx.globalAlpha = 0.3 - (i * 0.1);
        ctx.fill();
      }

      // Add floating dots
      for (let i = 0; i < 8; i++) {
        const x = (canvas.width / 8) * i + Math.sin(timeRef.current + i) * 50;
        const y = canvas.height / 2 + Math.cos(timeRef.current * 0.8 + i) * 100;
        
        const distance = Math.sqrt(
          Math.pow(x - mouseRef.current.x, 2) + Math.pow(y - mouseRef.current.y, 2)
        );
        const opacity = Math.max(0.1, 0.4 - distance * 0.0008);
        
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 105, 0, ${opacity})`;
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Mouse interaction
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
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ background: 'transparent' }}
    />
  );
};
