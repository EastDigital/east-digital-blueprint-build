
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { EnhancedProjectForm } from '../EnhancedProjectForm';

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

interface CreateProjectFormProps {
  newProjectData: ProjectFormData;
  isSubmitting: boolean;
  onCreateProject: () => void;
  onCancel: () => void;
  onNewProjectDataChange: (data: ProjectFormData) => void;
}

export const CreateProjectForm = ({
  newProjectData,
  isSubmitting,
  onCreateProject,
  onCancel,
  onNewProjectDataChange
}: CreateProjectFormProps) => {
  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Create New Project
        </CardTitle>
      </CardHeader>
      <CardContent>
        <EnhancedProjectForm
          data={newProjectData}
          onChange={onNewProjectDataChange}
          onSave={onCreateProject}
          onCancel={onCancel}
          isLoading={isSubmitting}
          mode="create"
        />
      </CardContent>
    </Card>
  );
};
