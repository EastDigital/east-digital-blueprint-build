
import React from 'react';

const categories = [
  { id: 'ALL', label: 'All Projects', dbValue: null },
  { id: '3d-rendering', label: '3D Rendering & Visualization', dbValue: '3d-rendering' },
  { id: 'digital-marketing', label: 'Digital Marketing Campaigns', dbValue: 'digital-marketing' },
  { id: 'corporate-solutions', label: 'Corporate Solutions', dbValue: 'corporate-solutions' }
];

interface CategoryFilterProps {
  activeCategory: string;
  onCategoryChange: (categoryLabel: string) => void;
}

export const CategoryFilter = ({ activeCategory, onCategoryChange }: CategoryFilterProps) => {
  return (
    <div className="flex flex-wrap justify-center lg:justify-start gap-2 lg:gap-3">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.label)}
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
  );
};

// Export the categories for use in other components
export const categoryMappings = categories;
