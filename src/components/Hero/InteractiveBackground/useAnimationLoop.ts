
import { useCallback } from 'react';
import { renderBackground, renderGeometricElements } from './backgroundRenderer';
import { renderWave } from './waveRenderer';
import { updateAndRenderParticles, renderConnectionLines } from './particleRenderer';
import { CanvasRefs } from './types';

export const useAnimationLoop = (refs: CanvasRefs) => {
  const animate = useCallback(() => {
    const { canvas, ctx, animationRef, mouseRef, timeRef, particlesRef } = refs;
    
    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    timeRef.current += 0.005;

    // Render background gradient
    renderBackground(canvas, ctx, timeRef.current);

    // Render floating geometric elements
    renderGeometricElements(canvas, ctx, timeRef.current);

    // Render wave at bottom
    renderWave(canvas, ctx, timeRef.current, mouseRef.current);

    // Update and render particles
    updateAndRenderParticles(canvas, ctx, particlesRef.current, mouseRef.current);

    // Render connection lines between particles
    renderConnectionLines(ctx, particlesRef.current);

    animationRef.current = requestAnimationFrame(animate);
  }, [refs]);

  return { animate };
};
