
import { supabase } from '@/integrations/supabase/client';
import { SupabaseProject } from './types';

// Get all projects from Supabase
export const getSupabaseProjects = async (): Promise<SupabaseProject[]> => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching projects:', error);
    return [];
  }

  return data || [];
};

// Get projects for carousel (show_in_carousel = true) with proper deduplication
export const getCarouselProjects = async () => {
  const { data, error } = await supabase
    .from('projects')
    .select('id, name, featured_image, featured_video, video_thumbnail')
    .eq('show_in_carousel', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching carousel projects:', error);
    return [];
  }

  // Return projects with fallback images and video support
  return data?.map(project => ({
    id: project.id,
    name: project.name,
    featuredImage: project.featured_image || '/placeholder.svg',
    featuredVideo: project.featured_video,
    videoThumbnail: project.video_thumbnail
  })) || [];
};

// Get project by ID for project details page
export const getProjectByIdQuery = async (id: string) => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching project by ID:', error);
    return null;
  }

  return data;
};

// Get project by slug for SEO-friendly URLs
export const getProjectBySlugQuery = async (slug: string) => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Error fetching project by slug:', error);
    return null;
  }

  return data;
};

// Get projects by category
export const getProjectsByCategoryQuery = async (category?: string) => {
  let query = supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (category) {
    query = query.eq('category', category);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching projects by category:', error);
    return [];
  }

  return data || [];
};
