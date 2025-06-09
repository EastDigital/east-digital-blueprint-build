
import React from 'react';
import { SimpleProjectCard } from './SimpleProjectCard';

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

interface ProjectsGridProps {
  projects: Project[];
  viewMode: 'grid' | 'list';
  initialProjects: number;
}

export const ProjectsGrid = ({ projects, viewMode, initialProjects }: ProjectsGridProps) => {
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
          <SimpleProjectCard 
            project={{
              id: project.id,
              name: project.name,
              featuredImage: project.featuredImage,
              featuredVideo: project.featuredVideo,
              videoThumbnail: project.videoThumbnail,
              client: project.client || 'Client Name'
            }} 
          />
        </div>
      ))}
    </div>
  );
};
