import React from 'react';
import { ModernProjectCard } from './ModernProjectCard'; // Use the Modern card

interface Project {
  // This interface should match your Supabase table exactly
  id: string;
  name: string;
  description: string;
  featuredImage: string;
  category: string;
  client?: string;
  location?: string;
  year?: string;
  status?: 'completed' | 'in-progress' | 'upcoming';
  [key: string]: any; // Allows for other properties
}

interface ProjectsGridProps {
  projects: Project[];
  viewMode: 'grid' | 'list';
  initialProjects: number;
}

export const ProjectsGrid = ({ projects }: ProjectsGridProps) => {
  return (
    // Your grid layout is fine, no changes needed here
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
      {projects.map((project, index) => (
        <div
          key={project.id}
          className="opacity-0 animate-fade-in"
          style={{
            animationDelay: `${(index % 12) * 100}ms`, // Adjusted for smoother loading
            animationFillMode: 'forwards'
          }}
        >
          {/* Pass the entire, original project object directly to the card */}
          <ModernProjectCard project={project} />
        </div>
      ))}
    </div>
  );
};