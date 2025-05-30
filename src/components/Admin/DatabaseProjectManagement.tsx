
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2, Globe, Star } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { EnhancedProjectForm } from './EnhancedProjectForm';

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
}

interface ProjectFormData {
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
  slug?: string;
}

const initialFormData: ProjectFormData = {
  name: '',
  subtitle: '',
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
  show_in_carousel: false,
  duration: '',
  location: '',
  team_size: '',
  client: '',
  status: 'upcoming',
  challenge: '',
  solution: '',
  engagement_result: '',
  leads_result: '',
  conversion_result: '',
  timeline_result: '',
  tags: [],
  slug: ''
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
      subtitle: project.subtitle || '',
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
      show_in_carousel: project.show_in_carousel,
      duration: project.duration || '',
      location: project.location || '',
      team_size: project.team_size || '',
      client: project.client || '',
      status: project.status || 'upcoming',
      challenge: project.challenge || '',
      solution: project.solution || '',
      engagement_result: project.engagement_result || '',
      leads_result: project.leads_result || '',
      conversion_result: project.conversion_result || '',
      timeline_result: project.timeline_result || '',
      tags: project.tags || [],
      slug: project.slug || ''
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
                    projectId={project.id}
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
