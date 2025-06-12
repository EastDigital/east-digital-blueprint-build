
import { CanvasRefs } from './types';

export const renderBackground = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, time: number) => {
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
};

export const renderGeometricElements = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, time: number) => {
  // Simple floating geometric elements
  for (let i = 0; i < 3; i++) {
    const x = canvas.width * (0.2 + i * 0.3) + Math.sin(time + i * 2) * 20;
    const y = canvas.height * (0.3 + Math.sin(time * 0.3 + i) * 0.1) + Math.cos(time * 0.5 + i * 1.5) * 30;
    const size = 6 + Math.sin(time + i) * 2;
    
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(time * 0.3 + i * 0.5);
    
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
};
