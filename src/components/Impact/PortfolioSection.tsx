
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { getProjectsByCategory } from '@/data/supabaseProjects';
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
        <PortfolioHeader />

        {/* Filter Controls */}
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

        {/* Projects Content */}
        {allProjects.length > 0 ? (
          <>
            <ProjectsGrid 
              projects={currentProjects}
              viewMode={viewMode}
              initialProjects={INITIAL_PROJECTS}
            />

            <LoadingIndicator isLoading={isLoading} />

            {hasMore && !isLoading && (
              <LoadMoreButton 
                onLoadMore={loadMoreProjects}
                remainingCount={allProjects.length - displayedProjects}
              />
            )}

            <EndOfProjectsMessage 
              totalProjects={allProjects.length}
              initialProjects={INITIAL_PROJECTS}
            />
          </>
        ) : (
          <EmptyProjectsState />
        )}
      </div>
    </section>
  );
};
