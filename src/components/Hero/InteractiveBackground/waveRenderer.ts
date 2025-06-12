
import { MousePosition } from './types';

export const renderWave = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, time: number, mouse: MousePosition) => {
  // Single, subtle wave at the bottom
  ctx.beginPath();
  ctx.moveTo(0, canvas.height);

  for (let x = 0; x <= canvas.width; x += 8) {
    const wave = Math.sin((x * 0.003) + (time * 0.5)) * 15;
    const mouseInfluence = Math.sin((x - mouse.x) * 0.004) * 
                          Math.exp(-Math.abs(x - mouse.x) * 0.002) * 8;
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
};
