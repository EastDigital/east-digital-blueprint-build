
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
      initParticles();
    };

    // Initialize fewer, slower particles
    const initParticles = () => {
      particlesRef.current = [];
      const isMobile = window.innerWidth < 768;
      const particleCount = isMobile ? 15 : 25; // Much fewer particles
      
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.2, // Slower movement
          vy: (Math.random() - 0.5) * 0.2,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.3 + 0.1 // Lower opacity
        });
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Simplified animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      timeRef.current += 0.005; // Much slower time progression
      
      // Subtle gradient background
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, 
        canvas.height / 2, 
        0,
        canvas.width / 2, 
        canvas.height / 2, 
        Math.max(canvas.width, canvas.height) * 0.7
      );
      gradient.addColorStop(0, 'rgba(255, 105, 0, 0.02)');
      gradient.addColorStop(0.5, 'rgba(54, 54, 54, 0.01)');
      gradient.addColorStop(1, 'rgba(255, 105, 0, 0.03)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Simple floating geometric elements - much fewer and slower
      for (let i = 0; i < 3; i++) {
        const x = canvas.width * (0.2 + i * 0.3) + Math.sin(timeRef.current + i * 2) * 20;
        const y = canvas.height * (0.3 + Math.sin(timeRef.current * 0.3 + i) * 0.1) + Math.cos(timeRef.current * 0.5 + i * 1.5) * 30;
        const size = 6 + Math.sin(timeRef.current + i) * 2;
        
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(timeRef.current * 0.3 + i * 0.5);
        
        // Simple shapes with very low opacity
        ctx.beginPath();
        if (i % 2 === 0) {
          ctx.rect(-size/2, -size/2, size, size);
        } else {
          ctx.arc(0, 0, size/2, 0, Math.PI * 2);
        }
        
        ctx.fillStyle = `rgba(255, 105, 0, 0.08)`;
        ctx.fill();
        ctx.strokeStyle = `rgba(255, 224, 202, 0.15)`;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();
      }

      // Single, subtle wave at the bottom
      ctx.beginPath();
      ctx.moveTo(0, canvas.height);

      for (let x = 0; x <= canvas.width; x += 8) {
        const wave = Math.sin((x * 0.003) + (timeRef.current * 0.5)) * 15;
        const mouseInfluence = Math.sin((x - mouseRef.current.x) * 0.004) * 
                              Math.exp(-Math.abs(x - mouseRef.current.x) * 0.002) * 8;
        const y = canvas.height - 80 + wave + mouseInfluence;
        
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(0, canvas.height);
      ctx.closePath();

      const waveGradient = ctx.createLinearGradient(0, canvas.height - 100, 0, canvas.height);
      waveGradient.addColorStop(0, 'rgba(255, 105, 0, 0.05)');
      waveGradient.addColorStop(1, 'rgba(255, 105, 0, 0.02)');
      
      ctx.fillStyle = waveGradient;
      ctx.fill();

      // Update and draw minimal particles
      particlesRef.current.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Simple particle rendering
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 105, 0, ${particle.opacity})`;
        ctx.fill();
      });

      // Minimal connection lines
      const connectionRadius = 120;
      particlesRef.current.forEach((particle, i) => {
        particlesRef.current.slice(i + 1, i + 3).forEach((otherParticle) => {
          const distance = Math.sqrt(
            Math.pow(particle.x - otherParticle.x, 2) + 
            Math.pow(particle.y - otherParticle.y, 2)
          );
          
          if (distance < connectionRadius) {
            const opacity = 0.05 * (1 - distance / connectionRadius);
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(255, 105, 0, ${opacity})`;
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
