
import React, { useEffect } from 'react';
import { useCanvasSetup } from './InteractiveBackground/useCanvasSetup';
import { useAnimationLoop } from './InteractiveBackground/useAnimationLoop';

export const InteractiveBackground = () => {
  const {
    canvasRef,
    animationRef,
    mouseRef,
    timeRef,
    particlesRef,
    resizeCanvas
  } = useCanvasSetup();

  const refs = {
    canvas: canvasRef.current!,
    ctx: canvasRef.current?.getContext('2d')!,
    animationRef,
    mouseRef,
    timeRef,
    particlesRef
  };

  const { animate } = useAnimationLoop(refs);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
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
  }, [animate, resizeCanvas, animationRef, mouseRef]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ background: 'transparent' }}
    />
  );
};
