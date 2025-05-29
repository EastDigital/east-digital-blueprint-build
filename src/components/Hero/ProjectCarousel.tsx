
import React, { useState, useEffect, useRef } from 'react';
import { ProjectCard } from './ProjectCard';
import { projectsData } from '@/data/projects';

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
        {[...projectsData, ...projectsData].map((project, index) => (
          <ProjectCard
            key={`${project.id}-${index}`}
            name={project.name}
            image={project.featuredImage}
            projectId={project.id}
          />
        ))}
      </div>
    </div>
  );
};
