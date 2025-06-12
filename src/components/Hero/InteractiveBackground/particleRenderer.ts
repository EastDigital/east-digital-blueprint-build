
import { Particle, MousePosition } from './types';

export const updateAndRenderParticles = (
  canvas: HTMLCanvasElement, 
  ctx: CanvasRenderingContext2D, 
  particles: Particle[], 
  mouse: MousePosition
) => {
  particles.forEach((particle) => {
    // Mouse repel effect
    const dx = particle.x - mouse.x;
    const dy = particle.y - mouse.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const repelRadius = 100;

    if (distance < repelRadius) {
      const force = (repelRadius - distance) / repelRadius;
      particle.x += (dx / distance) * force * 0.5;
      particle.y += (dy / distance) * force * 0.5;
    }

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
};

export const renderConnectionLines = (ctx: CanvasRenderingContext2D, particles: Particle[]) => {
  // Minimal connection lines
  const connectionRadius = 120;
  particles.forEach((particle, i) => {
    particles.slice(i + 1, i + 3).forEach((otherParticle) => {
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
};
