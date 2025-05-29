
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
  const [isDragging, setIsDragging] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const scrollPositionRef = useRef(0);
  const startXRef = useRef(0);
  const startScrollRef = useRef(0);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const scrollSpeed = 0.5; // pixels per frame

    const animate = () => {
      if (!isPaused && !isDragging && carousel) {
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
  }, [isPaused, isDragging]);

  const handleMouseEnter = () => {
    const carousel = carouselRef.current;
    if (carousel) {
      scrollPositionRef.current = carousel.scrollLeft;
    }
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    if (!isDragging) {
      setIsPaused(false);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    setIsDragging(true);
    setIsPaused(true);
    startXRef.current = e.pageX - carousel.offsetLeft;
    startScrollRef.current = carousel.scrollLeft;
    scrollPositionRef.current = carousel.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const carousel = carouselRef.current;
    if (!carousel) return;

    e.preventDefault();
    const x = e.pageX - carousel.offsetLeft;
    const walk = (x - startXRef.current) * 2;
    const newScrollLeft = startScrollRef.current - walk;
    
    carousel.scrollLeft = newScrollLeft;
    scrollPositionRef.current = newScrollLeft;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsPaused(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    setIsDragging(true);
    setIsPaused(true);
    startXRef.current = e.touches[0].pageX - carousel.offsetLeft;
    startScrollRef.current = carousel.scrollLeft;
    scrollPositionRef.current = carousel.scrollLeft;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    
    const carousel = carouselRef.current;
    if (!carousel) return;

    const x = e.touches[0].pageX - carousel.offsetLeft;
    const walk = (x - startXRef.current) * 2;
    const newScrollLeft = startScrollRef.current - walk;
    
    carousel.scrollLeft = newScrollLeft;
    scrollPositionRef.current = newScrollLeft;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setIsPaused(false);
  };

  return (
    <div className="w-full">
      <div 
        ref={carouselRef}
        className="flex gap-3 sm:gap-4 md:gap-6 overflow-hidden pl-0 sm:pl-4 md:pl-4 lg:pl-4 cursor-grab active:cursor-grabbing select-none"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
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
