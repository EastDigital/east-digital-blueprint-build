
import React, { useState, useEffect, useRef } from 'react';
import { ProjectCard } from './ProjectCard';
import { getCarouselProjects } from '@/data/supabaseProjects';

interface CarouselProject {
  id: string;
  name: string;
  featuredImage: string;
  featuredVideo?: string | null;
  videoThumbnail?: string | null;
}

export const ProjectCarousel = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [carouselProjects, setCarouselProjects] = useState<CarouselProject[]>([]);
  const carouselRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const scrollPositionRef = useRef(0);
  const startXRef = useRef(0);
  const startScrollRef = useRef(0);

  useEffect(() => {
    const fetchProjects = async () => {
      const projects = await getCarouselProjects();
      console.log('Fetched carousel projects:', projects);
      setCarouselProjects(projects);
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel || carouselProjects.length === 0) return;

    // Only enable animation if we have multiple projects
    if (carouselProjects.length <= 1) return;

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
  }, [isPaused, isDragging, carouselProjects]);

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

  if (carouselProjects.length === 0) {
    return (
      <div className="w-full">
        <div className="flex items-center justify-center h-[225px] sm:h-[370px] text-gray-400">
          <p>No carousel projects found. Add projects in the admin panel.</p>
        </div>
      </div>
    );
  }

  // Only duplicate if we have more than one project for infinite scroll
  const displayProjects = carouselProjects.length > 1 
    ? [...carouselProjects, ...carouselProjects] 
    : carouselProjects;

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
        {displayProjects.map((project, index) => {
          const isSecondSet = carouselProjects.length > 1 && index >= carouselProjects.length;
          const uniqueKey = carouselProjects.length > 1 
            ? `${project.id}-${isSecondSet ? 'duplicate' : 'original'}-${index}`
            : `${project.id}-single`;
          
          return (
            <ProjectCard
              key={uniqueKey}
              name={project.name}
              image={project.featuredImage}
              video={project.featuredVideo}
              videoThumbnail={project.videoThumbnail}
              projectId={project.id}
            />
          );
        })}
      </div>
    </div>
  );
};
