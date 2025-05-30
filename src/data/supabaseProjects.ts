
import { supabase } from '@/integrations/supabase/client';

export interface SupabaseProject {
  id: string;
  name: string;
  subtitle: string | null;
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
  created_at: string;
  updated_at: string;
}

export interface ProjectDetailsType {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  heroImage: string;
  featuredImage: string;
  category: string;
  duration: string;
  location: string;
  team: string;
  client: string;
  challenge: string;
  solution: string;
  results: {
    engagement: string;
    leads: string;
    conversion: string;
    timeline: string;
  };
  gallery: string[];
  tags: string[];
}

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
    .select('id, name, featured_image')
    .eq('show_in_carousel', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching carousel projects:', error);
    return [];
  }

  // Return projects with fallback images and ensure unique IDs
  return data?.map(project => ({
    id: project.id,
    name: project.name,
    featuredImage: project.featured_image || '/placeholder.svg'
  })) || [];
};

// Get projects by category for Impact page
export const getProjectsByCategory = async (category: string) => {
  let query = supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (category !== 'All Projects') {
    // Map display categories to database values
    const categoryMap: { [key: string]: string } = {
      '3D Rendering & Visualization': '3d-rendering',
      'Digital Marketing Campaigns': 'digital-marketing',
      'Corporate Solutions': 'corporate-solutions'
    };
    
    const dbCategory = categoryMap[category] || category;
    query = query.eq('category', dbCategory);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching projects by category:', error);
    return [];
  }

  return data?.map(project => ({
    id: project.id,
    name: project.name,
    description: project.description || '',
    featuredImage: project.featured_image || '/placeholder.svg',
    category: project.category || '',
    tags: project.tags || [],
    isCurrentlyActive: project.status === 'active'
  })) || [];
};

// Get project by ID for project details page
export const getProjectById = async (id: string): Promise<ProjectDetailsType | null> => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching project by ID:', error);
    return null;
  }

  if (!data) return null;

  return {
    id: data.id,
    title: data.name,
    subtitle: data.subtitle || '',
    description: data.description || '',
    heroImage: data.hero_image || data.featured_image || '/placeholder.svg',
    featuredImage: data.featured_image || '/placeholder.svg',
    category: data.category || '',
    duration: data.duration || '',
    location: data.location || '',
    team: data.team_size || '',
    client: data.client || '',
    challenge: data.challenge || '',
    solution: data.solution || '',
    results: {
      engagement: data.engagement_result || '',
      leads: data.leads_result || '',
      conversion: data.conversion_result || '',
      timeline: data.timeline_result || ''
    },
    gallery: data.gallery_images || [],
    tags: data.tags || []
  };
};

// Get project by slug for SEO-friendly URLs
export const getProjectBySlug = async (slug: string): Promise<ProjectDetailsType | null> => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Error fetching project by slug:', error);
    return null;
  }

  if (!data) return null;

  return {
    id: data.id,
    title: data.name,
    subtitle: data.subtitle || '',
    description: data.description || '',
    heroImage: data.hero_image || data.featured_image || '/placeholder.svg',
    featuredImage: data.featured_image || '/placeholder.svg',
    category: data.category || '',
    duration: data.duration || '',
    location: data.location || '',
    team: data.team_size || '',
    client: data.client || '',
    challenge: data.challenge || '',
    solution: data.solution || '',
    results: {
      engagement: data.engagement_result || '',
      leads: data.leads_result || '',
      conversion: data.conversion_result || '',
      timeline: data.timeline_result || ''
    },
    gallery: data.gallery_images || [],
    tags: data.tags || []
  };
};
