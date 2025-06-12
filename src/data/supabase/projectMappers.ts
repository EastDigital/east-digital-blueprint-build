
import { SupabaseProject, ProjectDetailsType } from './types';
import { categoryDisplayMap } from './categoryMapping';

// Map raw project data for Impact page (formatted for PortfolioSection component)
export const mapProjectForPortfolio = (project: SupabaseProject) => {
  return {
    id: project.id,
    name: project.name,
    description: project.description || '',
    featuredImage: project.featured_image || '/placeholder.svg',
    featuredVideo: project.featured_video,
    videoThumbnail: project.video_thumbnail,
    // Map database category to display category
    category: categoryDisplayMap[project.category || ''] || project.category || '',
    tags: project.tags || [],
    isCurrentlyActive: project.status === 'active',
    client: project.client || 'Client Name'
  };
};

// Map project data for detailed view
export const mapProjectForDetails = (data: SupabaseProject): ProjectDetailsType => {
  return {
    id: data.id,
    title: data.name,
    subtitle: data.subtitle || '',
    description: data.description || '',
    heroImage: data.hero_image || data.featured_image || '/placeholder.svg',
    featuredImage: data.featured_image || '/placeholder.svg',
    featuredVideo: data.featured_video,
    videoThumbnail: data.video_thumbnail,
    category: categoryDisplayMap[data.category || ''] || data.category || '',
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
    galleryVideos: data.gallery_videos || [],
    tags: data.tags || []
  };
};
