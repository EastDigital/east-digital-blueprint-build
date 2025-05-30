
import { useCallback } from 'react';

interface ProjectFormData {
  name: string;
  subtitle: string;
  description: string;
  image_url: string;
  category: string;
  is_featured: boolean;
  featured_image: string;
  featured_image_alt: string;
  featured_video: string;
  video_thumbnail: string;
  hero_image: string;
  hero_image_alt: string;
  gallery_images: string[];
  gallery_image_alts: string[];
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
}

export const useProjectFormLogic = (
  data: ProjectFormData,
  onChange: (data: ProjectFormData) => void,
  mode: 'create' | 'edit'
) => {
  const handleTagsChange = useCallback((tagsString: string) => {
    const tags = tagsString.split('\n').filter(tag => tag.trim() !== '');
    onChange({ ...data, tags });
  }, [data, onChange]);

  const handleGalleryImagesChange = useCallback((imagesString: string) => {
    const images = imagesString.split('\n').filter(img => img.trim() !== '');
    onChange({ ...data, gallery_images: images });
  }, [data, onChange]);

  const handleGalleryImageAltsChange = useCallback((altsString: string) => {
    const alts = altsString.split('\n').filter(alt => alt.trim() !== '');
    onChange({ ...data, gallery_image_alts: alts });
  }, [data, onChange]);

  const handleGalleryVideosChange = useCallback((videosString: string) => {
    const videos = videosString.split('\n').filter(video => video.trim() !== '');
    onChange({ ...data, gallery_videos: videos });
  }, [data, onChange]);

  const generateNewSlug = useCallback(() => {
    if (data.name) {
      const slug = data.name
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      onChange({ ...data, slug });
    }
  }, [data, onChange]);

  return {
    handleTagsChange,
    handleGalleryImagesChange,
    handleGalleryImageAltsChange,
    handleGalleryVideosChange,
    generateNewSlug
  };
};
