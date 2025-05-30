
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2, Eye, Globe, Star } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { EnhancedProjectForm } from './EnhancedProjectForm';

interface Project {
  id: string;
  name: string;
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
  created_at: string;
  updated_at: string;
}

interface ProjectFormData {
  name: string;
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
}

const initialFormData: ProjectFormData = {
  name: '',
  description: '',
  image_url: '',
  category: '',
  is_featured: false,
  featured_image: '',
  hero_image: '',
  gallery_images: [],
  seo_title: '',
  seo_description: '',
  seo_keywords: '',
  show_in_carousel: false
};

export const DatabaseProjectManagement = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [newProjectData, setNewProjectData] = useState<ProjectFormData>(initialFormData);
  const [editingProjectData, setEditingProjectData] = useState<ProjectFormData>(initialFormData);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch projects: " + error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateProject = async () => {
    if (!newProjectData.name.trim()) {
      toast({
        title: "Error",
        description: "Project name is required",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const { data, error } = await supabase
        .from('projects')
        .insert([newProjectData])
        .select()
        .single();

      if (error) throw error;

      setProjects([data, ...projects]);
      setNewProjectData(initialFormData);
      setShowCreateForm(false);

      toast({
        title: "Success",
        description: "Project created successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to create project: " + error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateProject = async () => {
    if (!editingProject) return;

    setIsSubmitting(true);
    try {
      const { data, error } = await supabase
        .from('projects')
        .update({
          ...editingProjectData,
          updated_at: new Date().toISOString()
        })
        .eq('id', editingProject.id)
        .select()
        .single();

      if (error) throw error;

      setProjects(projects.map(p => p.id === editingProject.id ? data : p));
      setEditingProject(null);

      toast({
        title: "Success",
        description: "Project updated successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to update project: " + error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setProjects(projects.filter(p => p.id !== id));

      toast({
        title: "Success",
        description: "Project deleted successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to delete project: " + error.message,
        variant: "destructive",
      });
    }
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setEditingProjectData({
      name: project.name,
      description: project.description || '',
      image_url: project.image_url || '',
      category: project.category || '',
      is_featured: project.is_featured,
      featured_image: project.featured_image || '',
      hero_image: project.hero_image || '',
      gallery_images: project.gallery_images || [],
      seo_title: project.seo_title || '',
      seo_description: project.seo_description || '',
      seo_keywords: project.seo_keywords || '',
      show_in_carousel: project.show_in_carousel
    });
  };

  const handleCancelEdit = () => {
    setEditingProject(null);
    setEditingProjectData(initialFormData);
  };

  const handleCancelCreate = () => {
    setShowCreateForm(false);
    setNewProjectData(initialFormData);
  };

  if (isLoading) {
    return <div className="text-white">Loading projects...</div>;
  }

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Enhanced Project Management</h1>
          {!showCreateForm && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => setShowCreateForm(true)}
                  className="bg-eastdigital-orange hover:bg-eastdigital-orange/90"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Project
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Create a new project with enhanced features</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>

        {/* Create Project Form */}
        {showCreateForm && (
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
                onChange={setNewProjectData}
                onSave={handleCreateProject}
                onCancel={handleCancelCreate}
                isLoading={isSubmitting}
                mode="create"
              />
            </CardContent>
          </Card>
        )}

        {/* Project List */}
        <div className="grid gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                {editingProject?.id === project.id ? (
                  <EnhancedProjectForm
                    data={editingProjectData}
                    onChange={setEditingProjectData}
                    onSave={handleUpdateProject}
                    onCancel={handleCancelEdit}
                    isLoading={isSubmitting}
                    mode="edit"
                  />
                ) : (
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
                        </div>
                      </div>
                      
                      {project.category && (
                        <p className="text-gray-400 mb-2">{project.category}</p>
                      )}
                      
                      {project.description && (
                        <p className="text-gray-300 mb-3">{project.description}</p>
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
                              <img 
                                key={idx}
                                src={img} 
                                alt={`Gallery ${idx + 1}`}
                                className="w-12 h-12 object-cover rounded border border-gray-700"
                                title={`Gallery Image ${idx + 1}`}
                              />
                            ))}
                            {project.gallery_images.length > 3 && (
                              <div className="w-12 h-12 bg-gray-700 rounded flex items-center justify-center text-xs text-gray-300">
                                +{project.gallery_images.length - 3}
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* SEO Info */}
                      {(project.seo_title || project.seo_description) && (
                        <div className="bg-gray-800 rounded p-2 mb-3">
                          <p className="text-xs text-gray-400 mb-1">SEO:</p>
                          {project.seo_title && (
                            <p className="text-sm text-white font-medium">{project.seo_title}</p>
                          )}
                          {project.seo_description && (
                            <p className="text-xs text-gray-300">{project.seo_description}</p>
                          )}
                        </div>
                      )}
                      
                      <p className="text-gray-500 text-sm">
                        Created: {new Date(project.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    
                    <div className="flex gap-2">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            onClick={() => handleEditProject(project)}
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
                            onClick={() => handleDeleteProject(project.id)}
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
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {projects.length === 0 && !showCreateForm && (
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-6 text-center">
              <p className="text-gray-400">No projects found. Create your first project above.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </TooltipProvider>
  );
};
