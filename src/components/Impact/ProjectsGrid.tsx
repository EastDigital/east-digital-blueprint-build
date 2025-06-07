
import React from 'react';
import { MinimalProjectCard } from './MinimalProjectCard';

interface Project {
  id: string;
  name: string;
  description: string;
  featuredImage: string;
  category: string;
  tags: string[];
  isCurrentlyActive: boolean;
}

interface ProjectsGridProps {
  projects: Project[];
  viewMode: 'grid' | 'list';
  initialProjects: number;
}

export const ProjectsGrid = ({ projects, viewMode, initialProjects }: ProjectsGridProps) => {
  const getProjectStatus = (isCurrentlyActive: boolean): "completed" | "in-progress" | "upcoming" => {
    return isCurrentlyActive ? "in-progress" : "completed";
  };

  return (
    <div className={`grid gap-6 lg:gap-8 mb-12 ${
      viewMode === 'grid' 
        ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
        : 'grid-cols-1 lg:grid-cols-2'
    }`}>
      {projects.map((project, index) => (
        <div
          key={project.id}
          className="opacity-0 animate-fade-in"
          style={{
            animationDelay: `${(index % initialProjects) * 100}ms`,
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
  );
};
