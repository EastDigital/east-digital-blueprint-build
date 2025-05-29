
import React, { useState, useMemo, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { getProjectsByCategory } from '@/data/projects';
import { MinimalProjectCard } from './MinimalProjectCard';

const categories = [
  { id: 'ALL', label: 'All Projects' },
  { id: '3d-rendering', label: '3D Rendering & Visualization' },
  { id: 'digital-marketing', label: 'Digital Marketing Campaigns' },
  { id: 'corporate-solutions', label: 'Corporate Solutions' }
];

const INITIAL_PROJECTS = 9;
const PROJECTS_PER_LOAD = 6;

export const PortfolioSection = () => {
  const [activeCategory, setActiveCategory] = useState('All Projects');
  const [displayedProjects, setDisplayedProjects] = useState(INITIAL_PROJECTS);
  const [isLoading, setIsLoading] = useState(false);

  const allProjects = useMemo(() => {
    console.log('Getting projects for category:', activeCategory);
    return getProjectsByCategory(activeCategory);
  }, [activeCategory]);

  const currentProjects = useMemo(() => {
    return allProjects.slice(0, displayedProjects);
  }, [allProjects, displayedProjects]);

  const hasMore = displayedProjects < allProjects.length;

  const loadMoreProjects = useCallback(async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log('Load more clicked, current displayed:', displayedProjects, 'total:', allProjects.length);
    
    if (isLoading || !hasMore) {
      console.log('Cannot load more - isLoading:', isLoading, 'hasMore:', hasMore);
      return;
    }
    
    setIsLoading(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    setDisplayedProjects(prev => {
      const newCount = Math.min(prev + PROJECTS_PER_LOAD, allProjects.length);
      console.log('New displayed count:', newCount);
      return newCount;
    });
    setIsLoading(false);
  }, [isLoading, hasMore, allProjects.length, displayedProjects]);

  const handleCategoryChange = useCallback((categoryLabel: string) => {
    console.log('Category changed to:', categoryLabel);
    setActiveCategory(categoryLabel);
    setDisplayedProjects(INITIAL_PROJECTS);
  }, []);

  return (
    <section className="py-16 lg:py-24" style={{ backgroundColor: '#141414' }}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 lg:mb-6">
            Featured Projects
          </h2>
          <p className="text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8 lg:mb-12 px-4">
            Explore our portfolio of successful real estate marketing campaigns, 3D visualizations, and corporate solutions that have helped our clients achieve exceptional results.
          </p>
          
          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-2 lg:gap-4 px-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.label)}
                className={`px-4 lg:px-8 py-3 lg:py-4 rounded-full font-medium text-sm lg:text-lg transition-all duration-300 cursor-pointer ${
                  activeCategory === category.label
                    ? 'bg-eastdigital-orange text-white shadow-lg hover:bg-eastdigital-orange/90'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white border border-gray-700'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid - 3 columns on desktop, 2 on tablet, 1 on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {currentProjects.map((project, index) => (
            <div
              key={project.id}
              style={{
                animationDelay: `${(index % INITIAL_PROJECTS) * 100}ms`,
                animation: 'fade-in 0.6s ease-out forwards'
              }}
            >
              <MinimalProjectCard project={project} />
            </div>
          ))}
        </div>

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 text-eastdigital-orange animate-spin" />
            <span className="ml-3 text-white">Loading more projects...</span>
          </div>
        )}

        {/* Show More Projects Button */}
        {hasMore && !isLoading && (
          <div className="text-center">
            <button 
              onClick={loadMoreProjects}
              className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 text-lg rounded-full border border-gray-700 hover:border-eastdigital-orange/50 transition-all duration-300 cursor-pointer"
            >
              Show More Projects ({allProjects.length - displayedProjects} remaining)
            </button>
          </div>
        )}

        {/* End of Projects Message */}
        {!hasMore && allProjects.length > INITIAL_PROJECTS && (
          <div className="text-center py-8">
            <p className="text-gray-400">You've seen all {allProjects.length} projects in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
};
