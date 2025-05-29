
import React, { useState, useEffect, useRef } from 'react';
import { ProjectCard } from './ProjectCard';
import { Building, Home, Factory, Zap, TreePine } from 'lucide-react';

// Mock project data with images - will be replaced with dynamic data from admin
const mockProjects = [
  { id: 1, name: 'Ascon Group', icon: Building, image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&h=400&fit=crop' },
  { id: 2, name: 'Reliance Energy', icon: Zap, image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop' },
  { id: 3, name: 'Omaxe', icon: Home, image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop' },
  { id: 4, name: 'Industrial Complex', icon: Factory, image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop' },
  { id: 5, name: 'Green Valley', icon: TreePine, image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop' },
  { id: 6, name: 'Metro Heights', icon: Building, image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&h=400&fit=crop' },
  { id: 7, name: 'Solar Park', icon: Zap, image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop' },
  { id: 8, name: 'Luxury Villas', icon: Home, image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop' },
];

export const ProjectCarousel = () => {
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const scrollPositionRef = useRef(0);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const scrollSpeed = 0.5; // pixels per frame

    const animate = () => {
      if (!isPaused && carousel) {
        scrollPositionRef.current += scrollSpeed;
        
        // Reset position when we've scrolled past the first set of items
        if (scrollPositionRef.current >= carousel.scrollWidth / 2) {
          scrollPositionRef.current = 0;
        }
        
        carousel.scrollLeft = scrollPositionRef.current;
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
    const carousel = carouselRef.current;
    if (carousel) {
      scrollPositionRef.current = carousel.scrollLeft;
    }
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  return (
    <div className="w-full">
      <div 
        ref={carouselRef}
        className="flex gap-3 sm:gap-4 md:gap-6 overflow-hidden pl-4 sm:pl-4 md:pl-4 lg:pl-4"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ scrollBehavior: 'auto' }}
      >
        {/* Duplicate the projects array for seamless infinite scroll */}
        {[...mockProjects, ...mockProjects].map((project, index) => (
          <ProjectCard
            key={`${project.id}-${index}`}
            name={project.name}
            image={project.image}
          />
        ))}
      </div>
    </div>
  );
};
