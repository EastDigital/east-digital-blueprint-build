
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { getAllProjects } from '@/data/supabaseProjects'; 
import { PortfolioHeader } from './PortfolioHeader';
import { CategoryFilter } from './CategoryFilter';
import { ViewModeToggle } from './ViewModeToggle';
import { ProjectsGrid } from './ProjectsGrid';
import { LoadingIndicator, LoadMoreButton, EndOfProjectsMessage, EmptyProjectsState } from './ProjectsLoadingStates';

const INITIAL_PROJECTS = 9;
const PROJECTS_PER_LOAD = 6;

interface Project {
  id: string;
  name: string;
  description: string;
  featuredImage: string;
  featuredVideo?: string;
  videoThumbnail?: string;
  category: string; 
  tags: string[];
  isCurrentlyActive: boolean;
  client?: string;
}

export const PortfolioSection = () => {
  const [activeCategory, setActiveCategory] = useState('All Projects');
  const [displayedCount, setDisplayedCount] = useState(INITIAL_PROJECTS);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    const fetchAllProjects = async () => {
      setIsLoading(true);
      try {
        console.log('PortfolioSection: Starting to fetch projects...');
        const projects = await getAllProjects();
        console.log('PortfolioSection: Fetched projects:', projects);
        setAllProjects(projects);
      } catch (error) {
        console.error('PortfolioSection: Error fetching projects:', error);
        setAllProjects([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllProjects();
  }, []);

  const filteredProjects = useMemo(() => {
    console.log(`PortfolioSection: Filtering for category: ${activeCategory}`);
    console.log('PortfolioSection: All projects:', allProjects);
    
    if (activeCategory === 'All Projects') {
      console.log('PortfolioSection: Showing all projects');
      return allProjects;
    }
    
    const filtered = allProjects.filter(project => {
      console.log(`Project "${project.name}" has category: "${project.category}"`);
      return project.category === activeCategory;
    });
    
    console.log(`PortfolioSection: Filtered projects for "${activeCategory}":`, filtered);
    return filtered;
  }, [allProjects, activeCategory]);

  const currentProjects = useMemo(() => {
    return filteredProjects.slice(0, displayedCount);
  }, [filteredProjects, displayedCount]);

  const hasMore = displayedCount < filteredProjects.length;

  const loadMoreProjects = useCallback(async () => {
    if (isLoadingMore || !hasMore) return;
    
    setIsLoadingMore(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setDisplayedCount(prev => prev + PROJECTS_PER_LOAD);
    setIsLoadingMore(false);
  }, [isLoadingMore, hasMore]);

  const handleCategoryChange = useCallback((categoryLabel: string) => {
    console.log(`PortfolioSection: Category changed to: ${categoryLabel}`);
    setActiveCategory(categoryLabel);
    setDisplayedCount(INITIAL_PROJECTS);
  }, []);

  if (isLoading) {
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
        <PortfolioHeader />

        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-8 lg:mb-12">
          <CategoryFilter 
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
          />
          <ViewModeToggle 
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />
        </div>

        {filteredProjects.length > 0 && (
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-400 text-sm">
              Showing {currentProjects.length} of {filteredProjects.length} projects
            </p>
            {activeCategory !== 'All Projects' && (
              <div className="text-sm text-gray-500">
                Category: <span className="text-eastdigital-orange">{activeCategory}</span>
              </div>
            )}
          </div>
        )}

        {filteredProjects.length > 0 ? (
          <>
            <ProjectsGrid 
              projects={currentProjects}
              viewMode={viewMode}
              initialProjects={INITIAL_PROJECTS}
            />
            
            <LoadingIndicator isLoading={isLoadingMore} />

            {hasMore && !isLoadingMore && (
              <LoadMoreButton 
                onLoadMore={loadMoreProjects}
                remainingCount={filteredProjects.length - displayedCount}
              />
            )}

            {!hasMore && (
              <EndOfProjectsMessage 
                totalProjects={filteredProjects.length}
                initialProjects={INITIAL_PROJECTS}
              />
            )}
          </>
        ) : (
          <EmptyProjectsState />
        )}
      </div>
    </section>
  );
};
