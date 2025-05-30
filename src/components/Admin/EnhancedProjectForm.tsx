
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Save, X, Plus, Trash2, Info, Image, Globe, Star, MapPin, Clock, Users, Building } from 'lucide-react';

interface EnhancedProjectFormData {
  name: string;
  subtitle: string;
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

  const addTag = () => {
    handleInputChange('tags', [...data.tags, '']);
  };

  const updateTag = (index: number, value: string) => {
    const newTags = [...data.tags];
    newTags[index] = value;
    handleInputChange('tags', newTags);
  };

  const removeTag = (index: number) => {
    const newTags = data.tags.filter((_, i) => i !== index);
    handleInputChange('tags', newTags);
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
              <Label htmlFor="project-subtitle" className="text-white">Subtitle</Label>
              <Input
                id="project-subtitle"
                value={data.subtitle}
                onChange={(e) => handleInputChange('subtitle', e.target.value)}
                className="bg-gray-900 border-gray-600 text-white"
                placeholder="Enter project subtitle"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <Label htmlFor="project-category" className="text-white">Category</Label>
              <select
                id="project-category"
                value={data.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="w-full p-2 bg-gray-900 border border-gray-600 rounded text-white"
              >
                <option value="">Select category</option>
                <option value="3D Rendering & Visualization">3D Rendering & Visualization</option>
                <option value="Digital Marketing Campaigns">Digital Marketing Campaigns</option>
                <option value="Corporate Solutions">Corporate Solutions</option>
              </select>
            </div>
            <div>
              <Label htmlFor="project-status" className="text-white">Status</Label>
              <select
                id="project-status"
                value={data.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
                className="w-full p-2 bg-gray-900 border border-gray-600 rounded text-white"
              >
                <option value="upcoming">Upcoming</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="on-hold">On Hold</option>
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

        {/* Project Details */}
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center gap-2 mb-4">
            <Building className="h-5 w-5 text-eastdigital-orange" />
            <h3 className="text-lg font-semibold text-white">Project Details</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="project-duration" className="text-white flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Duration
              </Label>
              <Input
                id="project-duration"
                value={data.duration}
                onChange={(e) => handleInputChange('duration', e.target.value)}
                className="bg-gray-900 border-gray-600 text-white"
                placeholder="e.g., 3 months"
              />
            </div>
            <div>
              <Label htmlFor="project-location" className="text-white flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Location
              </Label>
              <Input
                id="project-location"
                value={data.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="bg-gray-900 border-gray-600 text-white"
                placeholder="e.g., New York, NY"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <Label htmlFor="project-team" className="text-white flex items-center gap-2">
                <Users className="h-4 w-4" />
                Team Size
              </Label>
              <Input
                id="project-team"
                value={data.team_size}
                onChange={(e) => handleInputChange('team_size', e.target.value)}
                className="bg-gray-900 border-gray-600 text-white"
                placeholder="e.g., 5 people"
              />
            </div>
            <div>
              <Label htmlFor="project-client" className="text-white">Client</Label>
              <Input
                id="project-client"
                value={data.client}
                onChange={(e) => handleInputChange('client', e.target.value)}
                className="bg-gray-900 border-gray-600 text-white"
                placeholder="Client name"
              />
            </div>
          </div>

          <div className="mt-4">
            <Label htmlFor="project-challenge" className="text-white">Challenge</Label>
            <Textarea
              id="project-challenge"
              value={data.challenge}
              onChange={(e) => handleInputChange('challenge', e.target.value)}
              className="bg-gray-900 border-gray-600 text-white"
              placeholder="Describe the project challenge"
              rows={3}
            />
          </div>

          <div className="mt-4">
            <Label htmlFor="project-solution" className="text-white">Solution</Label>
            <Textarea
              id="project-solution"
              value={data.solution}
              onChange={(e) => handleInputChange('solution', e.target.value)}
              className="bg-gray-900 border-gray-600 text-white"
              placeholder="Describe the solution provided"
              rows={3}
            />
          </div>
        </div>

        {/* Results Section */}
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center gap-2 mb-4">
            <Star className="h-5 w-5 text-eastdigital-orange" />
            <h3 className="text-lg font-semibold text-white">Project Results</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="engagement-result" className="text-white">Engagement Increase</Label>
              <Input
                id="engagement-result"
                value={data.engagement_result}
                onChange={(e) => handleInputChange('engagement_result', e.target.value)}
                className="bg-gray-900 border-gray-600 text-white"
                placeholder="e.g., +150%"
              />
            </div>
            <div>
              <Label htmlFor="leads-result" className="text-white">Qualified Leads</Label>
              <Input
                id="leads-result"
                value={data.leads_result}
                onChange={(e) => handleInputChange('leads_result', e.target.value)}
                className="bg-gray-900 border-gray-600 text-white"
                placeholder="e.g., 250+ leads"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <Label htmlFor="conversion-result" className="text-white">Conversion Rate</Label>
              <Input
                id="conversion-result"
                value={data.conversion_result}
                onChange={(e) => handleInputChange('conversion_result', e.target.value)}
                className="bg-gray-900 border-gray-600 text-white"
                placeholder="e.g., 35%"
              />
            </div>
            <div>
              <Label htmlFor="timeline-result" className="text-white">Timeline</Label>
              <Input
                id="timeline-result"
                value={data.timeline_result}
                onChange={(e) => handleInputChange('timeline_result', e.target.value)}
                className="bg-gray-900 border-gray-600 text-white"
                placeholder="e.g., Completed on time"
              />
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

        {/* Tags Section */}
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-eastdigital-orange" />
                <h3 className="text-lg font-semibold text-white">Project Tags</h3>
              </div>
              <Button
                type="button"
                onClick={addTag}
                variant="outline"
                size="sm"
                className="border-eastdigital-orange text-eastdigital-orange hover:bg-eastdigital-orange hover:text-white"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Tag
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            {data.tags.map((tag, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={tag}
                  onChange={(e) => updateTag(index, e.target.value)}
                  className="bg-gray-900 border-gray-600 text-white"
                  placeholder={`Tag ${index + 1}`}
                />
                <Button
                  type="button"
                  onClick={() => removeTag(index)}
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
