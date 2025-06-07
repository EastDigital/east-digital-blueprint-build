
import React from 'react';
import { Loader2, Grid } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LoadingIndicatorProps {
  isLoading: boolean;
}

export const LoadingIndicator = ({ isLoading }: LoadingIndicatorProps) => {
  if (!isLoading) return null;

  return (
    <div className="flex items-center justify-center py-8">
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-full px-6 py-3 border border-gray-700/50">
        <div className="flex items-center gap-3">
          <Loader2 className="h-5 w-5 text-eastdigital-orange animate-spin" />
          <span className="text-white text-sm">Loading more projects...</span>
        </div>
      </div>
    </div>
  );
};

interface LoadMoreButtonProps {
  onLoadMore: (e: React.MouseEvent<HTMLButtonElement>) => void;
  remainingCount: number;
}

export const LoadMoreButton = ({ onLoadMore, remainingCount }: LoadMoreButtonProps) => {
  return (
    <div className="text-center">
      <button 
        onClick={onLoadMore}
        className="bg-gray-800/50 backdrop-blur-sm hover:bg-gray-700/50 text-white px-8 py-3 text-base rounded-full border border-gray-700/50 hover:border-eastdigital-orange/50 transition-all duration-300 cursor-pointer group"
      >
        <span className="group-hover:text-eastdigital-orange transition-colors duration-300">
          Load More Projects ({remainingCount} remaining)
        </span>
      </button>
    </div>
  );
};

interface EndOfProjectsMessageProps {
  totalProjects: number;
  initialProjects: number;
}

export const EndOfProjectsMessage = ({ totalProjects, initialProjects }: EndOfProjectsMessageProps) => {
  if (totalProjects <= initialProjects) return null;

  return (
    <div className="text-center py-8">
      <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl px-6 py-4 border border-gray-700/30 inline-block">
        <p className="text-gray-400">You've seen all {totalProjects} projects in this category.</p>
        <p className="text-gray-500 mt-1 text-sm">Explore other categories to discover more work.</p>
      </div>
    </div>
  );
};

export const EmptyProjectsState = () => {
  return (
    <div className="text-center py-16">
      <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl px-8 py-12 border border-gray-700/30 max-w-md mx-auto">
        <div className="w-16 h-16 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
          <Grid className="h-8 w-8 text-gray-500" />
        </div>
        <p className="text-gray-400 text-lg mb-2">No projects found</p>
        <p className="text-gray-500">No projects available in this category. Add projects through the admin panel to see them here.</p>
      </div>
    </div>
  );
};
