
import React, { useEffect, useRef } from 'react';

export const InteractiveVisionBackground = () => {
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

    // Initialize particles for vision-themed animation
    const initParticles = () => {
      particlesRef.current = [];
      const isMobile = window.innerWidth < 768;
      const particleCount = isMobile ? 20 : 30;
      
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.4 + 0.1
        });
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Animation loop with vision-themed elements
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      timeRef.current += 0.008;
      
      // Vision-themed gradient background
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, 
        canvas.height / 2, 
        0,
        canvas.width / 2, 
        canvas.height / 2, 
        Math.max(canvas.width, canvas.height) * 0.8
      );
      gradient.addColorStop(0, 'rgba(255, 105, 0, 0.0)');
      gradient.addColorStop(0.5, 'rgba(107, 114, 128, 0.0)');
      gradient.addColorStop(1, 'rgba(255, 105, 0, 0.0)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Floating geometric elements representing "vision" concepts
      for (let i = 0; i < 4; i++) {
        const x = canvas.width * (0.15 + i * 0.25) + Math.sin(timeRef.current + i * 1.5) * 25;
        const y = canvas.height * (0.2 + Math.sin(timeRef.current * 0.4 + i) * 0.15) + Math.cos(timeRef.current * 0.6 + i * 2) * 35;
        const size = 8 + Math.sin(timeRef.current * 0.8 + i) * 3;
        
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(timeRef.current * 0.4 + i * 0.8);
        
        // Different shapes for visual interest
        ctx.beginPath();
        if (i % 3 === 0) {
          // Rectangle
          ctx.rect(-size/2, -size/2, size, size);
        } else if (i % 3 === 1) {
          // Circle
          ctx.arc(0, 0, size/2, 0, Math.PI * 2);
        } else {
          // Triangle
          ctx.moveTo(0, -size/2);
          ctx.lineTo(-size/2, size/2);
          ctx.lineTo(size/2, size/2);
          ctx.closePath();
        }
        
        ctx.fillStyle = `rgba(255, 105, 0, 0.1)`;
        ctx.fill();
        ctx.strokeStyle = `rgba(255, 224, 202, 0.2)`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.restore();
      }

      // Interactive wave pattern - responds to mouse
      ctx.beginPath();
      ctx.moveTo(0, canvas.height * 0.7);

      for (let x = 0; x <= canvas.width; x += 6) {
        const wave1 = Math.sin((x * 0.004) + (timeRef.current * 0.7)) * 20;
        const wave2 = Math.sin((x * 0.002) + (timeRef.current * 0.5)) * 10;
        const mouseInfluence = Math.sin((x - mouseRef.current.x) * 0.005) * 
                              Math.exp(-Math.abs(x - mouseRef.current.x) * 0.001) * 12;
        const y = canvas.height * 0.7 + wave1 + wave2 + mouseInfluence;
        
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(0, canvas.height);
      ctx.closePath();

      const waveGradient = ctx.createLinearGradient(0, canvas.height * 0.6, 0, canvas.height);
      waveGradient.addColorStop(0, 'rgba(255, 105, 0, 0.06)');
      waveGradient.addColorStop(1, 'rgba(255, 105, 0, 0.02)');
      
      ctx.fillStyle = waveGradient;
      ctx.fill();

      // Update and draw particles
      particlesRef.current.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 105, 0, ${particle.opacity})`;
        ctx.fill();
      });

      // Connection lines between nearby particles
      const connectionRadius = 140;
      particlesRef.current.forEach((particle, i) => {
        particlesRef.current.slice(i + 1, i + 4).forEach((otherParticle) => {
          const distance = Math.sqrt(
            Math.pow(particle.x - otherParticle.x, 2) + 
            Math.pow(particle.y - otherParticle.y, 2)
          );
          
          if (distance < connectionRadius) {
            const opacity = 0.08 * (1 - distance / connectionRadius);
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(255, 105, 0, ${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        });
      });

      // Mouse interaction ripples
      if (mouseRef.current.x > 0 && mouseRef.current.y > 0) {
        const rippleRadius = 30 + Math.sin(timeRef.current * 2) * 10;
        ctx.beginPath();
        ctx.arc(mouseRef.current.x, mouseRef.current.y, rippleRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 105, 0, 0.1)`;
        ctx.lineWidth = 2;
        ctx.stroke();
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

    const handleMouseLeave = () => {
      mouseRef.current = { x: 0, y: 0 };
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
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
