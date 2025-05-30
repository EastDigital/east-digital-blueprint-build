
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Edit, Trash2, Copy } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  image_url: string;
  category: string;
  is_featured: boolean;
  featured_image: string;
  hero_image: string;
  gallery_images: string[];
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
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'upcoming':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-colors">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-1">{project.name}</h3>
            {project.subtitle && (
              <p className="text-sm text-gray-400 mb-2">{project.subtitle}</p>
            )}
            <div className="flex flex-wrap gap-2 mb-3">
              {project.category && (
                <Badge variant="outline" className="text-xs border-gray-600 text-gray-300">
                  {project.category}
                </Badge>
              )}
              <Badge className={`text-xs ${getStatusColor(project.status)}`}>
                {project.status.replace('-', ' ')}
              </Badge>
              {project.is_featured && (
                <Badge className="text-xs bg-yellow-600 text-yellow-100">
                  Featured
                </Badge>
              )}
              {project.show_in_carousel && (
                <Badge className="text-xs bg-purple-600 text-purple-100">
                  Carousel
                </Badge>
              )}
            </div>
          </div>
          <div className="flex space-x-2 ml-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(project)}
                  className="h-8 w-8 p-0 border-gray-600 text-gray-300 hover:text-white hover:bg-gray-700 hover:border-gray-500"
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Edit Project</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onDuplicate(project)}
                  className="h-8 w-8 p-0 border-blue-600 text-blue-400 hover:text-blue-300 hover:bg-blue-900/50 hover:border-blue-500"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Duplicate Project</p>
              </TooltipContent>
            </Tooltip>

            <AlertDialog>
              <Tooltip>
                <TooltipTrigger asChild>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 p-0 border-red-600 text-red-400 hover:text-red-300 hover:bg-red-900/50 hover:border-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Delete Project</p>
                </TooltipContent>
              </Tooltip>
              <AlertDialogContent className="bg-gray-900 border-gray-800 text-white">
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription className="text-gray-300">
                    This action cannot be undone. This will permanently delete the project "{project.name}".
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => onDelete(project.id)}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2 text-sm text-gray-400">
          {project.client && (
            <div>
              <span className="text-gray-300">Client:</span> {project.client}
            </div>
          )}
          {project.location && (
            <div>
              <span className="text-gray-300">Location:</span> {project.location}
            </div>
          )}
          {project.duration && (
            <div>
              <span className="text-gray-300">Duration:</span> {project.duration}
            </div>
          )}
          {project.slug && (
            <div>
              <span className="text-gray-300">Slug:</span> {project.slug}
            </div>
          )}
        </div>
        {project.description && (
          <p className="text-gray-400 text-sm mt-3 line-clamp-2">
            {project.description}
          </p>
        )}
        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {project.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs bg-gray-800 text-gray-300">
                {tag}
              </Badge>
            ))}
            {project.tags.length > 3 && (
              <Badge variant="secondary" className="text-xs bg-gray-800 text-gray-300">
                +{project.tags.length - 3}
              </Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
