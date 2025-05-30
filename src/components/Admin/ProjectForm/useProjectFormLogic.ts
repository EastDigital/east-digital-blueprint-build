
import { useEffect } from 'react';

interface ProjectFormData {
  name: string;
  slug?: string;
  tags: string[];
  gallery_images: string[];
  gallery_image_alts: string[];
}

export const useProjectFormLogic = (
  data: ProjectFormData,
  onChange: (data: ProjectFormData) => void,
  mode: 'create' | 'edit'
) => {
  // Generate slug from title
  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  };

  // Auto-generate slug when title changes (only for new projects or when slug is empty)
  useEffect(() => {
    if (data.name && (mode === 'create' || !data.slug)) {
      const newSlug = generateSlug(data.name);
      if (newSlug !== data.slug) {
        onChange({ ...data, slug: newSlug });
      }
    }
  }, [data.name, mode]);

  const handleTagsChange = (tagsString: string) => {
    const tags = tagsString.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
    onChange({ ...data, tags });
  };

  const handleGalleryImagesChange = (imagesString: string) => {
    const images = imagesString.split('\n').map(img => img.trim()).filter(img => img.length > 0);
    onChange({ ...data, gallery_images: images });
  };

  const handleGalleryImageAltsChange = (altsString: string) => {
    const alts = altsString.split('\n').map(alt => alt.trim()).filter(alt => alt.length > 0);
    onChange({ ...data, gallery_image_alts: alts });
  };

  const generateNewSlug = () => {
    if (data.name) {
      const newSlug = generateSlug(data.name) + '-' + Math.floor(Math.random() * 1000);
      onChange({ ...data, slug: newSlug });
    }
  };

  return {
    handleTagsChange,
    handleGalleryImagesChange,
    handleGalleryImageAltsChange,
    generateNewSlug
  };
};
