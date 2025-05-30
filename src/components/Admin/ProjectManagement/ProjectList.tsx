
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ProjectCard } from './ProjectCard';
import { EnhancedProjectForm } from '../EnhancedProjectForm';

interface Project {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  image_url: string;
  category: string;
  is_featured: boolean;
  featured_image: string;
  featured_image_alt?: string;
  featured_video: string;
  video_thumbnail: string;
  hero_image: string;
  hero_image_alt?: string;
  gallery_images: string[];
  gallery_image_alts?: string[];
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
}

interface ProjectFormData {
  name: string;
  subtitle: string;
  description: string;
  image_url: string;
  category: string;
  is_featured: boolean;
  featured_image: string;
  featured_image_alt: string;
  featured_video: string;
  video_thumbnail: string;
  hero_image: string;
  hero_image_alt: string;
  gallery_images: string[];
  gallery_image_alts: string[];
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
  slug?: string;
}

interface ProjectListProps {
  projects: Project[];
  editingProject: Project | null;
  editingProjectData: ProjectFormData;
  isSubmitting: boolean;
  onEditProject: (project: Project) => void;
  onDeleteProject: (id: string) => void;
  onDuplicateProject: (project: Project) => void;
  onUpdateProject: () => void;
  onCancelEdit: () => void;
  onEditingProjectDataChange: (data: ProjectFormData) => void;
}

export const ProjectList = ({
  projects,
  editingProject,
  editingProjectData,
  isSubmitting,
  onEditProject,
  onDeleteProject,
  onDuplicateProject,
  onUpdateProject,
  onCancelEdit,
  onEditingProjectDataChange
}: ProjectListProps) => {
  if (projects.length === 0) {
    return (
      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="p-6 text-center">
          <p className="text-gray-400">No projects found. Create your first project above.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-6">
      {projects.map((project) => (
        <div key={project.id}>
          {editingProject?.id === project.id ? (
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <EnhancedProjectForm
                  data={editingProjectData}
                  onChange={onEditingProjectDataChange}
                  onSave={onUpdateProject}
                  onCancel={onCancelEdit}
                  isLoading={isSubmitting}
                  mode="edit"
                  projectId={project.id}
                />
              </CardContent>
            </Card>
          ) : (
            <ProjectCard
              project={project}
              onEdit={onEditProject}
              onDelete={onDeleteProject}
              onDuplicate={onDuplicateProject}
            />
          )}
        </div>
      ))}
    </div>
  );
};
