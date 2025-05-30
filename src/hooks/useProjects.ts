
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface DatabaseProject {
  id: string;
  name: string;
  description: string | null;
  image_url: string | null;
  category: string | null;
  is_featured: boolean;
  featured_image: string | null;
  hero_image: string | null;
  gallery_images: string[] | null;
  seo_title: string | null;
  seo_description: string | null;
  seo_keywords: string | null;
  show_in_carousel: boolean;
  subtitle: string | null;
  duration: string | null;
  location: string | null;
  team_size: string | null;
  client: string | null;
  status: string | null;
  challenge: string | null;
  solution: string | null;
  engagement_result: string | null;
  leads_result: string | null;
  conversion_result: string | null;
  timeline_result: string | null;
  tags: string[] | null;
  slug: string | null;
  featured_image_alt: string | null;
  hero_image_alt: string | null;
  gallery_image_alts: string[] | null;
  created_at: string;
  updated_at: string;
}

export const useProjects = () => {
  const [projects, setProjects] = useState<DatabaseProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (err: any) {
      setError(err.message);
      console.error('Error fetching projects:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const getCarouselProjects = () => {
    return projects.filter(project => project.show_in_carousel);
  };

  const getFeaturedProjects = () => {
    return projects.filter(project => project.is_featured);
  };

  const getProjectBySlug = (slug: string) => {
    return projects.find(project => project.slug === slug);
  };

  const getProjectById = (id: string) => {
    return projects.find(project => project.id === id);
  };

  return {
    projects,
    isLoading,
    error,
    getCarouselProjects,
    getFeaturedProjects,
    getProjectBySlug,
    getProjectById,
    refetch: fetchProjects
  };
};
