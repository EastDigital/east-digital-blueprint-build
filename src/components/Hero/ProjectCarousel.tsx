
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useProjects } from '@/hooks/useProjects';

export const ProjectCarousel = () => {
  const { getCarouselProjects, isLoading } = useProjects();
  const carouselProjects = getCarouselProjects();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white">Loading projects...</div>
      </div>
    );
  }

  if (carouselProjects.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-400">No carousel projects available</div>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {carouselProjects.slice(0, 6).map((project) => (
        <div key={project.id} className="group relative overflow-hidden rounded-2xl bg-gray-900 border border-gray-800">
          <div className="aspect-video relative overflow-hidden">
            <img 
              src={project.featured_image || project.image_url || '/placeholder.svg'} 
              alt={project.featured_image_alt || project.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          
          <div className="p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-eastdigital-orange text-sm font-medium">
                {project.category || 'Project'}
              </span>
              {project.is_featured && (
                <span className="bg-eastdigital-orange/20 text-eastdigital-orange px-2 py-1 rounded text-xs">
                  Featured
                </span>
              )}
            </div>
            
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-eastdigital-orange transition-colors">
              {project.name}
            </h3>
            
            {project.description && (
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                {project.description}
              </p>
            )}
            
            <Link to={`/projects/${project.slug || project.id}`}>
              <Button 
                variant="ghost" 
                className="w-full justify-between text-white hover:text-eastdigital-orange hover:bg-eastdigital-orange/10 group"
              >
                View Project
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};
