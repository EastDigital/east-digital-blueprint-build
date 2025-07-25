
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

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

interface ProjectFormData {
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
  slug?: string;
  featured_image_alt: string;
  hero_image_alt: string;
  gallery_image_alts: string[];
}

const initialFormData: ProjectFormData = {
  name: '',
  subtitle: '',
  description: '',
  image_url: '',
  category: '',
  is_featured: false,
  featured_image: '',
  featured_video: '',
  video_thumbnail: '',
  hero_image: '',
  gallery_images: [],
  gallery_videos: [],
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
  slug: '',
  featured_image_alt: '',
  hero_image_alt: '',
  gallery_image_alts: []
};

export const useProjectManagement = () => {
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
      // Clean and prepare data for insertion
      const projectData = {
        ...newProjectData,
        name: newProjectData.name.trim(),
        subtitle: newProjectData.subtitle?.trim() || null,
        description: newProjectData.description?.trim() || null,
        category: newProjectData.category || null,
        status: newProjectData.status || 'upcoming',
        tags: newProjectData.tags?.length ? newProjectData.tags : null,
        gallery_images: newProjectData.gallery_images?.length ? newProjectData.gallery_images : null,
        gallery_videos: newProjectData.gallery_videos?.length ? newProjectData.gallery_videos : null,
        gallery_image_alts: newProjectData.gallery_image_alts?.length ? newProjectData.gallery_image_alts : null,
      };

      const { data, error } = await supabase
        .from('projects')
        .insert([projectData])
        .select()
        .single();

      if (error) {
        console.error('Database error:', error);
        throw new Error(error.message || 'Failed to create project');
      }

      setProjects([data, ...projects]);
      setNewProjectData(initialFormData);
      setShowCreateForm(false);

      toast({
        title: "Success!",
        description: `Project "${data.name}" created successfully${data.slug ? ` with URL: /${data.slug}` : ''}`,
      });
    } catch (error: any) {
      console.error('Error creating project:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to create project",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateProject = async () => {
    if (!editingProject || !editingProjectData.name.trim()) {
      toast({
        title: "Error",
        description: "Project name is required",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Clean and prepare data for update
      const updateData = {
        ...editingProjectData,
        name: editingProjectData.name.trim(),
        subtitle: editingProjectData.subtitle?.trim() || null,
        description: editingProjectData.description?.trim() || null,
        category: editingProjectData.category || null,
        status: editingProjectData.status || 'upcoming',
        tags: editingProjectData.tags?.length ? editingProjectData.tags : null,
        gallery_images: editingProjectData.gallery_images?.length ? editingProjectData.gallery_images : null,
        gallery_videos: editingProjectData.gallery_videos?.length ? editingProjectData.gallery_videos : null,
        gallery_image_alts: editingProjectData.gallery_image_alts?.length ? editingProjectData.gallery_image_alts : null,
        updated_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('projects')
        .update(updateData)
        .eq('id', editingProject.id)
        .select()
        .single();

      if (error) {
        console.error('Database error:', error);
        throw new Error(error.message || 'Failed to update project');
      }

      setProjects(projects.map(p => p.id === editingProject.id ? data : p));
      setEditingProject(null);
      setEditingProjectData(initialFormData);

      toast({
        title: "Success!",
        description: `Project "${data.name}" updated successfully${data.slug ? ` (URL: /${data.slug})` : ''}`,
      });
    } catch (error: any) {
      console.error('Error updating project:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to update project",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDuplicateProject = async (project: Project) => {
    setIsSubmitting(true);
    try {
      const duplicateData = {
        name: `${project.name} (Copy)`,
        subtitle: project.subtitle || '',
        description: project.description || '',
        image_url: project.image_url || '',
        category: project.category || '',
        is_featured: false, // Reset featured status for duplicates
        featured_image: project.featured_image || '',
        featured_video: project.featured_video || '',
        video_thumbnail: project.video_thumbnail || '',
        hero_image: project.hero_image || '',
        gallery_images: project.gallery_images || [],
        gallery_videos: project.gallery_videos || [],
        seo_title: project.seo_title || '',
        seo_description: project.seo_description || '',
        seo_keywords: project.seo_keywords || '',
        show_in_carousel: false, // Reset carousel status for duplicates
        duration: project.duration || '',
        location: project.location || '',
        team_size: project.team_size || '',
        client: project.client || '',
        status: 'upcoming', // Reset status for duplicates
        challenge: project.challenge || '',
        solution: project.solution || '',
        engagement_result: project.engagement_result || '',
        leads_result: project.leads_result || '',
        conversion_result: project.conversion_result || '',
        timeline_result: project.timeline_result || '',
        tags: project.tags || [],
        slug: '', // Let the trigger generate a new slug
        featured_image_alt: project.featured_image_alt || '',
        hero_image_alt: project.hero_image_alt || '',
        gallery_image_alts: project.gallery_image_alts || []
      };

      const { data, error } = await supabase
        .from('projects')
        .insert([duplicateData])
        .select()
        .single();

      if (error) throw error;

      setProjects([data, ...projects]);

      toast({
        title: "Success",
        description: "Project duplicated successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to duplicate project: " + error.message,
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
      featured_video: project.featured_video || '',
      video_thumbnail: project.video_thumbnail || '',
      hero_image: project.hero_image || '',
      gallery_images: project.gallery_images || [],
      gallery_videos: project.gallery_videos || [],
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
      slug: project.slug || '',
      featured_image_alt: project.featured_image_alt || '',
      hero_image_alt: project.hero_image_alt || '',
      gallery_image_alts: project.gallery_image_alts || []
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

  return {
    projects,
    editingProject,
    newProjectData,
    editingProjectData,
    isLoading,
    isSubmitting,
    showCreateForm,
    setShowCreateForm,
    setNewProjectData,
    setEditingProjectData,
    handleCreateProject,
    handleUpdateProject,
    handleDuplicateProject,
    handleDeleteProject,
    handleEditProject,
    handleCancelEdit,
    handleCancelCreate
  };
};
