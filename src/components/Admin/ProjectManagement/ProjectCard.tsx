
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ProjectStatus } from './ProjectStatus';
import { ProjectActions } from './ProjectActions';
import { ProjectDetails } from './ProjectDetails';

interface Project {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  image_url: string;
  category: string;
  is_featured: boolean;
  featured_image: string;
  featured_video: string;
  video_thumbnail: string;
  hero_image: string;
  gallery_images: string[];
  gallery_videos: string[];
  seo_title: string;
  seo_description: string;
  seo_keywords: string;
  show_in_carousel: boolean;
  duration: string;
  location: string;
  team_size: string;
  client: string;
  status: string;
  challenge: string;
  solution: string;
  engagement_result: string;
  leads_result: string;
  conversion_result: string;
  timeline_result: string;
  tags: string[];
  slug: string;
  created_at: string;
  updated_at: string;
  featured_image_alt?: string;
  hero_image_alt?: string;
  gallery_image_alts?: string[];
}

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
  onDuplicate: (project: Project) => void;
}

export const ProjectCard = ({ project, onEdit, onDelete, onDuplicate }: ProjectCardProps) => {
  return (
    <Card className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-colors">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-1">{project.name}</h3>
            {project.subtitle && (
              <p className="text-sm text-gray-400 mb-2">{project.subtitle}</p>
            )}
            <ProjectStatus 
              status={project.status}
              isFeatured={project.is_featured}
              showInCarousel={project.show_in_carousel}
            />
          </div>
          <ProjectActions 
            project={project}
            onEdit={onEdit}
            onDelete={onDelete}
            onDuplicate={onDuplicate}
          />
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <ProjectDetails 
          category={project.category}
          client={project.client}
          location={project.location}
          duration={project.duration}
          slug={project.slug}
          description={project.description}
          tags={project.tags}
        />
      </CardContent>
    </Card>
  );
};
