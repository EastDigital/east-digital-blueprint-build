
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Grid, List } from 'lucide-react';
import { getProjectsByCategory } from '@/data/supabaseProjects';
import { MinimalProjectCard } from './MinimalProjectCard';

const categories = [
  { id: 'ALL', label: 'All Projects' },
  { id: '3d-rendering', label: '3D Rendering & Visualization' },
  { id: 'digital-marketing', label: 'Digital Marketing Campaigns' },
  { id: 'corporate-solutions', label: 'Corporate Solutions' }
];

const INITIAL_PROJECTS = 9;
const PROJECTS_PER_LOAD = 6;

interface Project {
  id: string;
  name: string;
  description: string;
  featuredImage: string;
  category: string;
  tags: string[];
  isCurrentlyActive: boolean;
}

export const PortfolioSection = () => {
  const [activeCategory, setActiveCategory] = useState('All Projects');
  const [displayedProjects, setDisplayedProjects] = useState(INITIAL_PROJECTS);
  const [isLoading, setIsLoading] = useState(false);
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Fetch projects when category changes
  useEffect(() => {
    const fetchProjects = async () => {
      setIsInitialLoading(true);
      console.log('Getting projects for category:', activeCategory);
      try {
        const projects = await getProjectsByCategory(activeCategory);
        setAllProjects(projects);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setAllProjects([]);
      } finally {
        setIsInitialLoading(false);
      }
    };

    fetchProjects();
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

  // Helper function to map project status
  const getProjectStatus = (isCurrentlyActive: boolean): "completed" | "in-progress" | "upcoming" => {
    return isCurrentlyActive ? "in-progress" : "completed";
  };

  if (isInitialLoading) {
    return (
      <section className="py-16 lg:py-24" style={{ backgroundColor: '#141414' }}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-8 w-8 text-eastdigital-orange animate-spin" />
            <span className="ml-3 text-white">Loading projects...</span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 lg:py-24" style={{ backgroundColor: '#141414' }}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8 lg:mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-eastdigital-orange/10 border border-eastdigital-orange/20 rounded-full mb-6">
            <span className="text-eastdigital-orange text-sm font-medium tracking-wider uppercase">Portfolio</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 lg:mb-6">
            Featured Projects
          </h2>
          <p className="text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8 lg:mb-10 px-4">
            Explore our portfolio of successful real estate marketing campaigns, 3D visualizations, and corporate solutions that have helped our clients achieve exceptional results.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-8 lg:mb-12">
          {/* Category Filter Buttons */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-2 lg:gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.label)}
                className={`px-4 lg:px-6 py-2 lg:py-3 rounded-full font-medium text-sm lg:text-base transition-all duration-300 cursor-pointer ${
                  activeCategory === category.label
                    ? 'bg-eastdigital-orange text-white shadow-lg hover:bg-eastdigital-orange/90'
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700 hover:text-white border border-gray-700/50 backdrop-blur-sm'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-2 bg-gray-800/50 backdrop-blur-sm rounded-full p-1 border border-gray-700/50">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-full transition-all duration-300 ${
                viewMode === 'grid' 
                  ? 'bg-eastdigital-orange text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-full transition-all duration-300 ${
                viewMode === 'list' 
                  ? 'bg-eastdigital-orange text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Projects Count */}
        {allProjects.length > 0 && (
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-400 text-sm">
              Showing {Math.min(displayedProjects, allProjects.length)} of {allProjects.length} projects
            </p>
            {activeCategory !== 'All Projects' && (
              <div className="text-sm text-gray-500">
                Category: <span className="text-eastdigital-orange">{activeCategory}</span>
              </div>
            )}
          </div>
        )}

        {/* Projects Grid */}
        {allProjects.length > 0 ? (
          <>
            <div className={`grid gap-6 lg:gap-8 mb-12 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1 lg:grid-cols-2'
            }`}>
              {currentProjects.map((project, index) => (
                <div
                  key={project.id}
                  className="opacity-0 animate-fade-in"
                  style={{
                    animationDelay: `${(index % INITIAL_PROJECTS) * 100}ms`,
                    animationFillMode: 'forwards'
                  }}
                >
                  <MinimalProjectCard 
                    project={{
                      id: project.id,
                      title: project.name,
                      featuredImage: project.featuredImage,
                      category: project.category,
                      status: getProjectStatus(project.isCurrentlyActive),
                      subtitle: project.description
                    }} 
                  />
                </div>
              ))}
            </div>

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex items-center justify-center py-8">
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-full px-6 py-3 border border-gray-700/50">
                  <div className="flex items-center gap-3">
                    <Loader2 className="h-5 w-5 text-eastdigital-orange animate-spin" />
                    <span className="text-white text-sm">Loading more projects...</span>
                  </div>
                </div>
              </div>
            )}

            {/* Show More Projects Button */}
            {hasMore && !isLoading && (
              <div className="text-center">
                <button 
                  onClick={loadMoreProjects}
                  className="bg-gray-800/50 backdrop-blur-sm hover:bg-gray-700/50 text-white px-8 py-3 text-base rounded-full border border-gray-700/50 hover:border-eastdigital-orange/50 transition-all duration-300 cursor-pointer group"
                >
                  <span className="group-hover:text-eastdigital-orange transition-colors duration-300">
                    Load More Projects ({allProjects.length - displayedProjects} remaining)
                  </span>
                </button>
              </div>
            )}

            {/* End of Projects Message */}
            {!hasMore && allProjects.length > INITIAL_PROJECTS && (
              <div className="text-center py-8">
                <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl px-6 py-4 border border-gray-700/30 inline-block">
                  <p className="text-gray-400">You've seen all {allProjects.length} projects in this category.</p>
                  <p className="text-gray-500 mt-1 text-sm">Explore other categories to discover more work.</p>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl px-8 py-12 border border-gray-700/30 max-w-md mx-auto">
              <div className="w-16 h-16 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Grid className="h-8 w-8 text-gray-500" />
              </div>
              <p className="text-gray-400 text-lg mb-2">No projects found</p>
              <p className="text-gray-500">No projects available in this category. Add projects through the admin panel to see them here.</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
