
import React, { useState, useEffect, useRef } from 'react';
import { ProjectCard } from './ProjectCard';
import { Building, Home, Factory, Zap, TreePine } from 'lucide-react';

// Mock project data - will be replaced with dynamic data from admin
const mockProjects = [
  { id: 1, name: 'Ascon Group', icon: Building },
  { id: 2, name: 'Reliance Energy', icon: Zap },
  { id: 3, name: 'Omaxe', icon: Home },
  { id: 4, name: 'Industrial Complex', icon: Factory },
  { id: 5, name: 'Green Valley', icon: TreePine },
  { id: 6, name: 'Metro Heights', icon: Building },
  { id: 7, name: 'Solar Park', icon: Zap },
  { id: 8, name: 'Luxury Villas', icon: Home },
];

export const ProjectCarousel = () => {
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    let scrollPosition = 0;
    const scrollSpeed = 0.5; // pixels per frame

    const animate = () => {
      if (!isPaused && carousel) {
        scrollPosition += scrollSpeed;
        
        // Reset position when we've scrolled past the first set of items
        if (scrollPosition >= carousel.scrollWidth / 2) {
          scrollPosition = 0;
        }
        
        carousel.scrollLeft = scrollPosition;
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPaused]);

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  return (
    <div className="w-full">
      <div 
        ref={carouselRef}
        className="flex gap-6 overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ scrollBehavior: 'auto' }}
      >
        {/* Duplicate the projects array for seamless infinite scroll */}
        {[...mockProjects, ...mockProjects].map((project, index) => (
          <ProjectCard
            key={`${project.id}-${index}`}
            name={project.name}
            icon={project.icon}
          />
        ))}
      </div>
    </div>
  );
};
