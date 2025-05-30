
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Globe, Star } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

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
}

export const ProjectCard = ({ project, onEdit, onDelete }: ProjectCardProps) => {
  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <h3 className="text-xl font-semibold text-white">{project.name}</h3>
              <div className="flex gap-1">
                {project.is_featured && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="bg-yellow-600 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                        <Star className="h-3 w-3" />
                        Featured
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>This project is featured</p>
                    </TooltipContent>
                  </Tooltip>
                )}
                {project.show_in_carousel && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="bg-eastdigital-orange text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                        <Globe className="h-3 w-3" />
                        Carousel
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Shown in homepage carousel</p>
                    </TooltipContent>
                  </Tooltip>
                )}
                {project.status && (
                  <span className={`px-2 py-1 rounded text-xs ${
                    project.status === 'completed' ? 'bg-green-600' :
                    project.status === 'active' ? 'bg-blue-600' :
                    project.status === 'on-hold' ? 'bg-red-600' :
                    'bg-gray-600'
                  } text-white`}>
                    {project.status}
                  </span>
                )}
              </div>
            </div>
            
            {project.subtitle && (
              <p className="text-gray-300 mb-2 font-medium">{project.subtitle}</p>
            )}
            
            {project.category && (
              <p className="text-gray-400 mb-2">{project.category}</p>
            )}
            
            {project.description && (
              <p className="text-gray-300 mb-3">{project.description}</p>
            )}

            {/* Project Details Summary */}
            {(project.duration || project.location || project.client) && (
              <div className="bg-gray-800 rounded p-3 mb-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
                  {project.duration && (
                    <div>
                      <span className="text-gray-400">Duration:</span>
                      <span className="text-white ml-1">{project.duration}</span>
                    </div>
                  )}
                  {project.location && (
                    <div>
                      <span className="text-gray-400">Location:</span>
                      <span className="text-white ml-1">{project.location}</span>
                    </div>
                  )}
                  {project.client && (
                    <div>
                      <span className="text-gray-400">Client:</span>
                      <span className="text-white ml-1">{project.client}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Tags */}
            {project.tags && project.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-3">
                {project.tags.slice(0, 5).map((tag, idx) => (
                  tag && (
                    <span key={idx} className="bg-eastdigital-orange/20 text-eastdigital-orange px-2 py-1 rounded text-xs">
                      {tag}
                    </span>
                  )
                ))}
                {project.tags.length > 5 && (
                  <span className="text-gray-400 text-xs">+{project.tags.length - 5} more</span>
                )}
              </div>
            )}

            {/* Image Preview */}
            <div className="flex gap-2 mb-3">
              {project.featured_image && (
                <img 
                  src={project.featured_image} 
                  alt="Featured"
                  className="w-16 h-16 object-cover rounded border border-gray-700"
                  title="Featured Image"
                />
              )}
              {project.hero_image && (
                <img 
                  src={project.hero_image} 
                  alt="Hero"
                  className="w-16 h-16 object-cover rounded border border-gray-700"
                  title="Hero Image"
                />
              )}
              {project.gallery_images && project.gallery_images.length > 0 && (
                <div className="flex gap-1">
                  {project.gallery_images.slice(0, 3).map((img, idx) => (
                    img && (
                      <img 
                        key={idx}
                        src={img} 
                        alt={`Gallery ${idx + 1}`}
                        className="w-12 h-12 object-cover rounded border border-gray-700"
                        title={`Gallery Image ${idx + 1}`}
                      />
                    )
                  ))}
                  {project.gallery_images.length > 3 && (
                    <div className="w-12 h-12 bg-gray-700 rounded flex items-center justify-center text-xs text-gray-300">
                      +{project.gallery_images.length - 3}
                    </div>
                  )}
                </div>
              )}
            </div>

            <p className="text-gray-500 text-sm">
              Created: {new Date(project.created_at).toLocaleDateString()}
              {project.slug && (
                <span className="ml-4">
                  Slug: <span className="text-eastdigital-orange">{project.slug}</span>
                </span>
              )}
            </p>
          </div>
          
          <div className="flex gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => onEdit(project)}
                  variant="outline"
                  size="sm"
                  className="border-gray-700 text-gray-300 hover:bg-gray-800"
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Edit project</p>
              </TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => onDelete(project.id)}
                  variant="outline"
                  size="sm"
                  className="border-red-700 text-red-400 hover:bg-red-900"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Delete project</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
