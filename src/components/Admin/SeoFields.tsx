
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface SeoFieldsProps {
  seo: {
    pageTitle?: string;
    metaDescription?: string;
    featuredImageAlt?: string;
    heroImageAlt?: string;
    galleryImageAlts?: string[];
  };
  onSeoChange: (seo: any) => void;
  galleryCount: number;
}

export const SeoFields: React.FC<SeoFieldsProps> = ({
  seo,
  onSeoChange,
  galleryCount
}) => {
  const handleSeoFieldChange = (field: string, value: string) => {
    onSeoChange({
      ...seo,
      [field]: value
    });
  };

  const handleGalleryAltChange = (index: number, value: string) => {
    const newAlts = [...(seo.galleryImageAlts || [])];
    newAlts[index] = value;
    onSeoChange({
      ...seo,
      galleryImageAlts: newAlts
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white">SEO Settings</h3>
      
      <div>
        <Label htmlFor="pageTitle" className="text-white">Page Title</Label>
        <Input
          id="pageTitle"
          value={seo.pageTitle || ''}
          onChange={(e) => handleSeoFieldChange('pageTitle', e.target.value)}
          placeholder="Custom page title (optional)"
          className="bg-gray-800 border-gray-700 text-white"
        />
      </div>

      <div>
        <Label htmlFor="metaDescription" className="text-white">Meta Description</Label>
        <Textarea
          id="metaDescription"
          value={seo.metaDescription || ''}
          onChange={(e) => handleSeoFieldChange('metaDescription', e.target.value)}
          placeholder="Brief description for search engines (optional)"
          className="bg-gray-800 border-gray-700 text-white resize-none"
          rows={3}
        />
      </div>

      <div>
        <Label htmlFor="featuredImageAlt" className="text-white">Featured Image Alt Text</Label>
        <Input
          id="featuredImageAlt"
          value={seo.featuredImageAlt || ''}
          onChange={(e) => handleSeoFieldChange('featuredImageAlt', e.target.value)}
          placeholder="Alt text for featured image (optional)"
          className="bg-gray-800 border-gray-700 text-white"
        />
      </div>

      <div>
        <Label htmlFor="heroImageAlt" className="text-white">Hero Image Alt Text</Label>
        <Input
          id="heroImageAlt"
          value={seo.heroImageAlt || ''}
          onChange={(e) => handleSeoFieldChange('heroImageAlt', e.target.value)}
          placeholder="Alt text for hero image (optional)"
          className="bg-gray-800 border-gray-700 text-white"
        />
      </div>

      {galleryCount > 0 && (
        <div>
          <Label className="text-white">Gallery Images Alt Text</Label>
          <div className="space-y-2 mt-2">
            {Array.from({ length: galleryCount }).map((_, index) => (
              <Input
                key={index}
                value={seo.galleryImageAlts?.[index] || ''}
                onChange={(e) => handleGalleryAltChange(index, e.target.value)}
                placeholder={`Alt text for gallery image ${index + 1} (optional)`}
                className="bg-gray-800 border-gray-700 text-white"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
