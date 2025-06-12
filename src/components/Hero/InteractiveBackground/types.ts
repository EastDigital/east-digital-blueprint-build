
export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

export interface MousePosition {
  x: number;
  y: number;
}

export interface CanvasRefs {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  animationRef: React.MutableRefObject<number | undefined>;
  mouseRef: React.MutableRefObject<MousePosition>;
  timeRef: React.MutableRefObject<number>;
  particlesRef: React.MutableRefObject<Particle[]>;
}
