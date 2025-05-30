
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useProjects } from '@/hooks/useProjects';

export const PortfolioSection = () => {
  const { projects, isLoading } = useProjects();

  if (isLoading) {
    return (
      <section id="portfolio" className="py-16 lg:py-24 bg-black">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center h-64">
            <div className="text-white">Loading projects...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="portfolio" className="py-16 lg:py-24 bg-black">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 font-poppins">
            Our <span className="text-eastdigital-orange">Portfolio</span>
          </h2>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto">
            Explore our diverse collection of successful projects that showcase our expertise in real estate marketing, 3D visualization, and digital campaigns.
          </p>
        </div>

        {/* Projects Grid */}
        {projects.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {projects.slice(0, 6).map((project) => (
              <div 
                key={project.id}
                className="group relative overflow-hidden rounded-2xl bg-gray-900 border border-gray-800 hover:border-eastdigital-orange/50 transition-all duration-300"
              >
                {/* Project Image */}
                <div className="relative overflow-hidden aspect-video">
                  <img 
                    src={project.featured_image || project.image_url || '/placeholder.svg'} 
                    alt={project.featured_image_alt || project.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Category Badge */}
                  {project.category && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-eastdigital-orange/90 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {project.category}
                      </span>
                    </div>
                  )}
                  
                  {/* Featured Badge */}
                  {project.is_featured && (
                    <div className="absolute top-4 right-4">
                      <span className="bg-yellow-600/90 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Featured
                      </span>
                    </div>
                  )}
                  
                  {/* Hover CTA */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Link to={`/projects/${project.slug || project.id}`}>
                      <Button className="bg-eastdigital-orange hover:bg-eastdigital-orange/90 text-white">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
                
                {/* Project Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-eastdigital-orange transition-colors">
                    {project.name}
                  </h3>
                  
                  {project.description && (
                    <p className="text-gray-400 mb-4 line-clamp-2">
                      {project.description}
                    </p>
                  )}
                  
                  {/* Project Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    {project.client && (
                      <span>Client: {project.client}</span>
                    )}
                    {project.duration && (
                      <span>{project.duration}</span>
                    )}
                  </div>
                  
                  {/* Tags */}
                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {project.tags.slice(0, 3).map((tag, index) => (
                        <span 
                          key={index}
                          className="bg-gray-800 text-gray-300 px-2 py-1 rounded text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="text-gray-500 text-xs">
                          +{project.tags.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-400 mb-16">
            No projects available at the moment.
          </div>
        )}

        {/* View All Projects CTA */}
        {projects.length > 6 && (
          <div className="text-center">
            <Link to="/impact">
              <Button 
                size="lg" 
                className="bg-eastdigital-orange hover:bg-eastdigital-orange/90 text-white px-8 py-3 rounded-full"
              >
                View All Projects
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};
