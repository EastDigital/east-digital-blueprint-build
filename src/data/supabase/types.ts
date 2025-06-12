
export interface SupabaseProject {
  id: string;
  name: string;
  subtitle: string | null;
  description: string | null;
  image_url: string | null;
  category: string | null;
  is_featured: boolean;
  featured_image: string | null;
  featured_video: string | null;
  hero_image: string | null;
  gallery_images: string[] | null;
  gallery_videos: string[] | null;
  video_thumbnail: string | null;
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
  featuredVideo: string | null;
  videoThumbnail: string | null;
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
  galleryVideos: string[];
  tags: string[];
}
