
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Save, X, Plus, Trash2, Info, Image, Globe, Star } from 'lucide-react';

interface EnhancedProjectFormData {
  name: string;
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
}

interface EnhancedProjectFormProps {
  data: EnhancedProjectFormData;
  onChange: (data: EnhancedProjectFormData) => void;
  onSave: () => void;
  onCancel: () => void;
  isLoading?: boolean;
  mode: 'create' | 'edit';
}

export const EnhancedProjectForm = ({ 
  data, 
  onChange, 
  onSave, 
  onCancel, 
  isLoading = false, 
  mode 
}: EnhancedProjectFormProps) => {
  const handleInputChange = (field: keyof EnhancedProjectFormData, value: string | boolean | string[]) => {
    onChange({ ...data, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave();
  };

  const addGalleryImage = () => {
    handleInputChange('gallery_images', [...data.gallery_images, '']);
  };

  const updateGalleryImage = (index: number, value: string) => {
    const newImages = [...data.gallery_images];
    newImages[index] = value;
    handleInputChange('gallery_images', newImages);
  };

  const removeGalleryImage = (index: number) => {
    const newImages = data.gallery_images.filter((_, i) => i !== index);
    handleInputChange('gallery_images', newImages);
  };

  return (
    <TooltipProvider>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center gap-2 mb-4">
            <Info className="h-5 w-5 text-eastdigital-orange" />
            <h3 className="text-lg font-semibold text-white">Basic Information</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="project-name" className="text-white">Project Name *</Label>
              <Input
                id="project-name"
                value={data.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="bg-gray-900 border-gray-600 text-white"
                placeholder="Enter project name"
                required
              />
            </div>
            <div>
              <Label htmlFor="project-category" className="text-white">Category</Label>
              <select
                id="project-category"
                value={data.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="w-full p-2 bg-gray-900 border border-gray-600 rounded text-white"
              >
                <option value="3D Rendering & Visualization">3D Rendering & Visualization</option>
                <option value="Digital Marketing Campaigns">Digital Marketing Campaigns</option>
                <option value="Corporate Solutions">Corporate Solutions</option>
              </select>
            </div>
          </div>
          
          <div className="mt-4">
            <Label htmlFor="project-description" className="text-white">Description</Label>
            <Textarea
              id="project-description"
              value={data.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="bg-gray-900 border-gray-600 text-white"
              placeholder="Enter project description"
              rows={3}
            />
          </div>

          <div className="flex items-center space-x-6 mt-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="project-featured"
                checked={data.is_featured}
                onChange={(e) => handleInputChange('is_featured', e.target.checked)}
                className="rounded"
              />
              <Label htmlFor="project-featured" className="text-white flex items-center gap-2">
                <Star className="h-4 w-4" />
                Featured Project
              </Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="project-carousel"
                checked={data.show_in_carousel}
                onChange={(e) => handleInputChange('show_in_carousel', e.target.checked)}
                className="rounded"
              />
              <Tooltip>
                <TooltipTrigger asChild>
                  <Label htmlFor="project-carousel" className="text-white flex items-center gap-2 cursor-help">
                    <Globe className="h-4 w-4" />
                    Show in Homepage Carousel
                  </Label>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Display this project in the main carousel on the homepage</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>

        {/* Images Section */}
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center gap-2 mb-4">
            <Image className="h-5 w-5 text-eastdigital-orange" />
            <h3 className="text-lg font-semibold text-white">Images</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Label htmlFor="featured-image" className="text-white cursor-help">Featured Image</Label>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Main image displayed in project listings</p>
                </TooltipContent>
              </Tooltip>
              <Input
                id="featured-image"
                value={data.featured_image}
                onChange={(e) => handleInputChange('featured_image', e.target.value)}
                className="bg-gray-900 border-gray-600 text-white"
                placeholder="Enter featured image URL"
              />
            </div>
            
            <div>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Label htmlFor="hero-image" className="text-white cursor-help">Hero Image</Label>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Large banner image for project detail page</p>
                </TooltipContent>
              </Tooltip>
              <Input
                id="hero-image"
                value={data.hero_image}
                onChange={(e) => handleInputChange('hero_image', e.target.value)}
                className="bg-gray-900 border-gray-600 text-white"
                placeholder="Enter hero image URL"
              />
            </div>
          </div>

          <div className="mt-4">
            <Label htmlFor="main-image" className="text-white">Main Image URL (Legacy)</Label>
            <Input
              id="main-image"
              value={data.image_url}
              onChange={(e) => handleInputChange('image_url', e.target.value)}
              className="bg-gray-900 border-gray-600 text-white"
              placeholder="Enter main image URL"
            />
          </div>

          {/* Gallery Images */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <Label className="text-white">Gallery Images</Label>
              <Button
                type="button"
                onClick={addGalleryImage}
                variant="outline"
                size="sm"
                className="border-eastdigital-orange text-eastdigital-orange hover:bg-eastdigital-orange hover:text-white"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Image
              </Button>
            </div>
            <div className="space-y-2">
              {data.gallery_images.map((image, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={image}
                    onChange={(e) => updateGalleryImage(index, e.target.value)}
                    className="bg-gray-900 border-gray-600 text-white"
                    placeholder={`Gallery image ${index + 1} URL`}
                  />
                  <Button
                    type="button"
                    onClick={() => removeGalleryImage(index)}
                    variant="outline"
                    size="sm"
                    className="border-red-600 text-red-400 hover:bg-red-900"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SEO Section */}
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center gap-2 mb-4">
            <Globe className="h-5 w-5 text-eastdigital-orange" />
            <h3 className="text-lg font-semibold text-white">SEO Settings</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Label htmlFor="seo-title" className="text-white cursor-help">SEO Title</Label>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Title that appears in search engine results (50-60 characters recommended)</p>
                </TooltipContent>
              </Tooltip>
              <Input
                id="seo-title"
                value={data.seo_title}
                onChange={(e) => handleInputChange('seo_title', e.target.value)}
                className="bg-gray-900 border-gray-600 text-white"
                placeholder="Enter SEO title"
                maxLength={60}
              />
            </div>
            
            <div>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Label htmlFor="seo-description" className="text-white cursor-help">SEO Description</Label>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Description that appears in search results (150-160 characters recommended)</p>
                </TooltipContent>
              </Tooltip>
              <Textarea
                id="seo-description"
                value={data.seo_description}
                onChange={(e) => handleInputChange('seo_description', e.target.value)}
                className="bg-gray-900 border-gray-600 text-white"
                placeholder="Enter SEO description"
                rows={2}
                maxLength={160}
              />
            </div>
            
            <div>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Label htmlFor="seo-keywords" className="text-white cursor-help">SEO Keywords</Label>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Comma-separated keywords related to this project</p>
                </TooltipContent>
              </Tooltip>
              <Input
                id="seo-keywords"
                value={data.seo_keywords}
                onChange={(e) => handleInputChange('seo_keywords', e.target.value)}
                className="bg-gray-900 border-gray-600 text-white"
                placeholder="Enter keywords separated by commas"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <Button 
            type="submit"
            className="bg-eastdigital-orange hover:bg-eastdigital-orange/90 flex-1"
            disabled={isLoading}
          >
            <Save className="h-4 w-4 mr-2" />
            {mode === 'create' ? 'Create Project' : 'Save Changes'}
          </Button>
          <Button 
            type="button"
            onClick={onCancel}
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-700"
            disabled={isLoading}
          >
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
        </div>
      </form>
    </TooltipProvider>
  );
};
