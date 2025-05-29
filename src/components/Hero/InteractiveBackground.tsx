
import React, { useEffect, useRef } from 'react';

export const InteractiveBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0 });
  const timeRef = useRef(0);
  const particlesRef = useRef<Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
  }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Reinitialize particles on resize
      initParticles();
    };

    // Initialize floating particles - responsive count
    const initParticles = () => {
      particlesRef.current = [];
      const isMobile = window.innerWidth < 768;
      const particleCount = isMobile 
        ? Math.floor((canvas.width * canvas.height) / 25000) // Fewer particles on mobile
        : Math.floor((canvas.width * canvas.height) / 15000);
      
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * (isMobile ? 0.3 : 0.5), // Slower on mobile
          vy: (Math.random() - 0.5) * (isMobile ? 0.3 : 0.5),
          size: Math.random() * (isMobile ? 1.5 : 2) + 1, // Smaller on mobile
          opacity: Math.random() * 0.5 + 0.1
        });
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      timeRef.current += 0.008;
      const isMobile = window.innerWidth < 768;
      
      // Create subtle gradient background
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height)
      );
      gradient.addColorStop(0, 'rgba(255, 105, 0, 0.02)');
      gradient.addColorStop(0.5, 'rgba(255, 105, 0, 0.01)');
      gradient.addColorStop(1, 'rgba(255, 105, 0, 0.03)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw animated wave layers - responsive amplitude
      const waveCount = isMobile ? 1 : 2; // Fewer waves on mobile
      for (let i = 0; i < waveCount; i++) {
        ctx.beginPath();
        ctx.moveTo(0, canvas.height);

        // Create wave path - smaller waves on mobile
        for (let x = 0; x <= canvas.width; x += (isMobile ? 12 : 8)) {
          const baseWave = Math.sin((x * 0.003) + (timeRef.current * (0.8 + i * 0.2))) * (isMobile ? 10 + i * 5 : 20 + i * 10);
          const mouseInfluence = Math.sin((x - mouseRef.current.x) * 0.008) * 
                                Math.exp(-Math.abs(x - mouseRef.current.x) * 0.0008) * (isMobile ? 8 : 15);
          const y = canvas.height - (isMobile ? 50 : 100) + baseWave + mouseInfluence + (i * (isMobile ? 10 : 20));
          
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();

        const waveGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        waveGradient.addColorStop(0, `rgba(255, 105, 0, ${0.05 - i * 0.02})`);
        waveGradient.addColorStop(1, `rgba(255, 105, 0, ${0.02 - i * 0.01})`);
        
        ctx.fillStyle = waveGradient;
        ctx.fill();
      }

      // Update and draw particles
      particlesRef.current.forEach((particle) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Mouse interaction - reduced on mobile
        const distance = Math.sqrt(
          Math.pow(particle.x - mouseRef.current.x, 2) + 
          Math.pow(particle.y - mouseRef.current.y, 2)
        );
        
        let finalOpacity = particle.opacity;
        const interactionRadius = isMobile ? 60 : 100;
        if (distance < interactionRadius) {
          finalOpacity *= (1 + (interactionRadius - distance) / interactionRadius);
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 105, 0, ${Math.min(finalOpacity, 0.6)})`;
        ctx.fill();
      });

      // Draw connection lines between nearby particles - fewer on mobile
      const connectionRadius = isMobile ? 80 : 120;
      particlesRef.current.forEach((particle, i) => {
        particlesRef.current.slice(i + 1).forEach((otherParticle) => {
          const distance = Math.sqrt(
            Math.pow(particle.x - otherParticle.x, 2) + 
            Math.pow(particle.y - otherParticle.y, 2)
          );
          
          if (distance < connectionRadius) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(255, 105, 0, ${0.1 * (1 - distance / connectionRadius)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

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
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ background: 'transparent' }}
    />
  );
};
