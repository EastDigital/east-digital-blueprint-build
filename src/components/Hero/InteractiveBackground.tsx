
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
    color: string;
  }>>([]);
  const orbitingElementsRef = useRef<Array<{
    angle: number;
    radius: number;
    speed: number;
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
      
      // Reinitialize elements on resize
      initParticles();
      initOrbitingElements();
    };

    // Initialize floating particles with varied colors
    const initParticles = () => {
      particlesRef.current = [];
      const isMobile = window.innerWidth < 768;
      const particleCount = isMobile 
        ? Math.floor((canvas.width * canvas.height) / 20000)
        : Math.floor((canvas.width * canvas.height) / 12000);
      
      const colors = ['255, 105, 0', '255, 224, 202', '255, 255, 255', '54, 54, 54'];
      
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * (isMobile ? 0.4 : 0.6),
          vy: (Math.random() - 0.5) * (isMobile ? 0.4 : 0.6),
          size: Math.random() * (isMobile ? 2 : 3) + 1,
          opacity: Math.random() * 0.6 + 0.2,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
    };

    // Initialize orbiting elements around invisible centers
    const initOrbitingElements = () => {
      orbitingElementsRef.current = [];
      const isMobile = window.innerWidth < 768;
      const elementCount = isMobile ? 3 : 5;
      
      for (let i = 0; i < elementCount; i++) {
        orbitingElementsRef.current.push({
          angle: Math.random() * Math.PI * 2,
          radius: 50 + Math.random() * (isMobile ? 80 : 120),
          speed: 0.002 + Math.random() * 0.003,
          size: 2 + Math.random() * 4,
          opacity: 0.3 + Math.random() * 0.4
        });
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      timeRef.current += 0.01;
      const isMobile = window.innerWidth < 768;
      
      // Create dynamic gradient background with color shifts
      const gradient = ctx.createRadialGradient(
        canvas.width / 2 + Math.sin(timeRef.current * 0.5) * 100, 
        canvas.height / 2 + Math.cos(timeRef.current * 0.3) * 80, 
        0,
        canvas.width / 2, 
        canvas.height / 2, 
        Math.max(canvas.width, canvas.height)
      );
      gradient.addColorStop(0, 'rgba(255, 105, 0, 0.04)');
      gradient.addColorStop(0.3, 'rgba(255, 105, 0, 0.02)');
      gradient.addColorStop(0.7, 'rgba(54, 54, 54, 0.03)');
      gradient.addColorStop(1, 'rgba(255, 105, 0, 0.05)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw floating geometric shapes
      const shapeCount = isMobile ? 4 : 6;
      for (let i = 0; i < shapeCount; i++) {
        const x = canvas.width * 0.2 + (canvas.width * 0.6 * i / shapeCount) + Math.sin(timeRef.current + i) * 30;
        const y = canvas.height * 0.3 + Math.cos(timeRef.current * 0.7 + i * 2) * 50;
        const size = 8 + Math.sin(timeRef.current + i) * 4;
        
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(timeRef.current * (0.5 + i * 0.2));
        
        if (i % 2 === 0) {
          // Draw diamond
          ctx.beginPath();
          ctx.moveTo(0, -size);
          ctx.lineTo(size, 0);
          ctx.lineTo(0, size);
          ctx.lineTo(-size, 0);
          ctx.closePath();
        } else {
          // Draw triangle
          ctx.beginPath();
          ctx.moveTo(0, -size);
          ctx.lineTo(size * 0.8, size * 0.6);
          ctx.lineTo(-size * 0.8, size * 0.6);
          ctx.closePath();
        }
        
        ctx.fillStyle = `rgba(255, 105, 0, ${0.15 + Math.sin(timeRef.current + i) * 0.1})`;
        ctx.fill();
        ctx.strokeStyle = `rgba(255, 224, 202, ${0.3})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();
      }

      // Draw animated wave layers with more complexity
      const waveCount = isMobile ? 2 : 3;
      for (let i = 0; i < waveCount; i++) {
        ctx.beginPath();
        ctx.moveTo(0, canvas.height);

        for (let x = 0; x <= canvas.width; x += (isMobile ? 10 : 6)) {
          const baseWave = Math.sin((x * 0.004) + (timeRef.current * (0.8 + i * 0.3))) * (isMobile ? 12 + i * 6 : 25 + i * 12);
          const secondaryWave = Math.sin((x * 0.008) + (timeRef.current * (1.2 + i * 0.2))) * (isMobile ? 4 + i * 2 : 8 + i * 4);
          const mouseInfluence = Math.sin((x - mouseRef.current.x) * 0.006) * 
                                Math.exp(-Math.abs(x - mouseRef.current.x) * 0.001) * (isMobile ? 10 : 18);
          const y = canvas.height - (isMobile ? 60 : 120) + baseWave + secondaryWave + mouseInfluence + (i * (isMobile ? 15 : 25));
          
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
        waveGradient.addColorStop(0, `rgba(255, 105, 0, ${0.08 - i * 0.02})`);
        waveGradient.addColorStop(0.5, `rgba(255, 224, 202, ${0.04 - i * 0.01})`);
        waveGradient.addColorStop(1, `rgba(255, 105, 0, ${0.03 - i * 0.01})`);
        
        ctx.fillStyle = waveGradient;
        ctx.fill();
      }

      // Update and draw enhanced particles
      particlesRef.current.forEach((particle) => {
        // Update position with slight gravitational pull
        particle.x += particle.vx + Math.sin(timeRef.current + particle.x * 0.001) * 0.1;
        particle.y += particle.vy + Math.cos(timeRef.current + particle.y * 0.001) * 0.1;

        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Mouse interaction with stronger effect
        const distance = Math.sqrt(
          Math.pow(particle.x - mouseRef.current.x, 2) + 
          Math.pow(particle.y - mouseRef.current.y, 2)
        );
        
        let finalOpacity = particle.opacity + Math.sin(timeRef.current + particle.x * 0.01) * 0.2;
        const interactionRadius = isMobile ? 80 : 120;
        if (distance < interactionRadius) {
          finalOpacity *= (1 + (interactionRadius - distance) / interactionRadius * 0.8);
        }

        // Draw particle with glow effect
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        
        // Glow effect
        const glowGradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 3
        );
        glowGradient.addColorStop(0, `rgba(${particle.color}, ${Math.min(finalOpacity, 0.8)})`);
        glowGradient.addColorStop(1, `rgba(${particle.color}, 0)`);
        
        ctx.fillStyle = glowGradient;
        ctx.fill();
        
        // Core particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${particle.color}, ${Math.min(finalOpacity * 1.2, 1)})`;
        ctx.fill();
      });

      // Draw orbiting elements around invisible centers
      orbitingElementsRef.current.forEach((element, index) => {
        element.angle += element.speed;
        
        const centerX = canvas.width * (0.2 + (index % 3) * 0.3);
        const centerY = canvas.height * (0.3 + (index % 2) * 0.4);
        
        const x = centerX + Math.cos(element.angle) * element.radius;
        const y = centerY + Math.sin(element.angle) * element.radius;
        
        ctx.beginPath();
        ctx.arc(x, y, element.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 105, 0, ${element.opacity})`;
        ctx.fill();
        
        // Trail effect
        const trailLength = 5;
        for (let i = 1; i <= trailLength; i++) {
          const trailAngle = element.angle - (i * 0.1);
          const trailX = centerX + Math.cos(trailAngle) * element.radius;
          const trailY = centerY + Math.sin(trailAngle) * element.radius;
          const trailOpacity = element.opacity * (1 - i / trailLength) * 0.5;
          
          ctx.beginPath();
          ctx.arc(trailX, trailY, element.size * (1 - i / trailLength * 0.5), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 224, 202, ${trailOpacity})`;
          ctx.fill();
        }
      });

      // Enhanced connection lines between nearby particles
      const connectionRadius = isMobile ? 100 : 140;
      particlesRef.current.forEach((particle, i) => {
        particlesRef.current.slice(i + 1, i + 5).forEach((otherParticle) => {
          const distance = Math.sqrt(
            Math.pow(particle.x - otherParticle.x, 2) + 
            Math.pow(particle.y - otherParticle.y, 2)
          );
          
          if (distance < connectionRadius) {
            const opacity = 0.15 * (1 - distance / connectionRadius);
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(255, 105, 0, ${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Enhanced mouse interaction
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
