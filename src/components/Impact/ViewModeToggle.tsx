
import React from 'react';
import { Grid, List } from 'lucide-react';

interface ViewModeToggleProps {
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
}

export const ViewModeToggle = ({ viewMode, onViewModeChange }: ViewModeToggleProps) => {
  return (
    <div className="flex items-center gap-2 bg-gray-800/50 backdrop-blur-sm rounded-full p-1 border border-gray-700/50">
      <button
        onClick={() => onViewModeChange('grid')}
        className={`p-2 rounded-full transition-all duration-300 ${
          viewMode === 'grid' 
            ? 'bg-eastdigital-orange text-white' 
            : 'text-gray-400 hover:text-white'
        }`}
      >
        <Grid className="h-4 w-4" />
      </button>
      <button
        onClick={() => onViewModeChange('list')}
        className={`p-2 rounded-full transition-all duration-300 ${
          viewMode === 'list' 
            ? 'bg-eastdigital-orange text-white' 
            : 'text-gray-400 hover:text-white'
        }`}
      >
        <List className="h-4 w-4" />
      </button>
    </div>
  );
};
