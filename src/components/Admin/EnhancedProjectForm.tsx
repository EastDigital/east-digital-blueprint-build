import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, Check, Globe, Star, Save, X, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface ProjectFormData {
  name: string;
  subtitle: string;
  description: string;
  image_url: string;
  category: string;
  is_featured: boolean;
  featured_image: string;
  featured_image_alt: string;
  hero_image: string;
  hero_image_alt: string;
  gallery_images: string[];
  gallery_image_alts: string[];
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

interface EnhancedProjectFormProps {
  data: ProjectFormData;
  onChange: (data: ProjectFormData) => void;
  onSave: () => void;
  onCancel: () => void;
  isLoading?: boolean;
  mode: 'create' | 'edit';
  projectId?: string;
}

export const EnhancedProjectForm = ({
  data,
  onChange,
  onSave,
  onCancel,
  isLoading = false,
  mode,
  projectId
}: EnhancedProjectFormProps) => {
  const [slugCheckState, setSlugCheckState] = useState<'idle' | 'checking' | 'available' | 'taken'>('idle');
  const [slugError, setSlugError] = useState<string>('');
  const { toast } = useToast();

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

  // Check slug availability
  useEffect(() => {
    const checkSlugAvailability = async () => {
      if (!data.slug || data.slug.length < 3) {
        setSlugCheckState('idle');
        setSlugError('');
        return;
      }

      setSlugCheckState('checking');
      
      try {
        const { data: existingProject, error } = await supabase
          .from('projects')
          .select('id')
          .eq('slug', data.slug)
          .maybeSingle();

        if (error) {
          console.error('Error checking slug:', error);
          setSlugCheckState('idle');
          setSlugError('Error checking slug availability');
          return;
        }

        // If we found a project with this slug
        if (existingProject) {
          // If we're editing and it's the same project, it's okay
          if (mode === 'edit' && projectId && existingProject.id === projectId) {
            setSlugCheckState('available');
            setSlugError('');
          } else {
            setSlugCheckState('taken');
            setSlugError('This URL slug is already taken');
          }
        } else {
          setSlugCheckState('available');
          setSlugError('');
        }
      } catch (error) {
        console.error('Error checking slug:', error);
        setSlugCheckState('idle');
        setSlugError('Error checking slug availability');
      }
    };

    const timeoutId = setTimeout(checkSlugAvailability, 500);
    return () => clearTimeout(timeoutId);
  }, [data.slug, projectId, mode]);

  const handleInputChange = (field: keyof ProjectFormData, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const handleTagsChange = (tagsString: string) => {
    const tags = tagsString.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
    handleInputChange('tags', tags);
  };

  const handleGalleryImagesChange = (imagesString: string) => {
    const images = imagesString.split('\n').map(img => img.trim()).filter(img => img.length > 0);
    handleInputChange('gallery_images', images);
  };

  const handleGalleryImageAltsChange = (altsString: string) => {
    const alts = altsString.split('\n').map(alt => alt.trim()).filter(alt => alt.length > 0);
    handleInputChange('gallery_image_alts', alts);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (slugCheckState === 'taken') {
      toast({
        title: "Cannot Save Project",
        description: "Please choose a different URL slug as this one is already taken.",
        variant: "destructive",
      });
      return;
    }

    if (!data.name.trim()) {
      toast({
        title: "Validation Error",
        description: "Project name is required.",
        variant: "destructive",
      });
      return;
    }

    onSave();
  };

  const generateNewSlug = () => {
    if (data.name) {
      const newSlug = generateSlug(data.name) + '-' + Math.floor(Math.random() * 1000);
      onChange({ ...data, slug: newSlug });
    }
  };

  const getSlugIcon = () => {
    switch (slugCheckState) {
      case 'checking':
        return <RefreshCw className="h-4 w-4 animate-spin text-gray-400" />;
      case 'available':
        return <Check className="h-4 w-4 text-green-500" />;
      case 'taken':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const CustomToggle = ({ 
    checked, 
    onCheckedChange, 
    label, 
    icon: Icon, 
    description 
  }: { 
    checked: boolean; 
    onCheckedChange: (checked: boolean) => void; 
    label: string; 
    icon: any; 
    description: string;
  }) => {
    return (
      <div 
        className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
          checked 
            ? 'border-eastdigital-orange bg-eastdigital-orange/10' 
            : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
        }`}
        onClick={() => onCheckedChange(!checked)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-full ${checked ? 'bg-eastdigital-orange text-white' : 'bg-gray-700 text-gray-400'}`}>
              <Icon className="h-4 w-4" />
            </div>
            <div>
              <h4 className="text-white font-medium">{label}</h4>
              <p className="text-gray-400 text-sm">{description}</p>
            </div>
          </div>
          <div className={`w-12 h-6 rounded-full transition-all duration-300 ${
            checked ? 'bg-eastdigital-orange' : 'bg-gray-600'
          }`}>
            <div className={`w-5 h-5 rounded-full bg-white transition-transform duration-300 mt-0.5 ${
              checked ? 'translate-x-6 ml-1' : 'translate-x-0 ml-0.5'
            }`} />
          </div>
        </div>
        {checked && (
          <div className="absolute top-2 right-2">
            <Check className="h-4 w-4 text-eastdigital-orange" />
          </div>
        )}
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-gray-800">
          <TabsTrigger value="basic" className="text-white data-[state=active]:bg-eastdigital-orange">Basic Info</TabsTrigger>
          <TabsTrigger value="details" className="text-white data-[state=active]:bg-eastdigital-orange">Project Details</TabsTrigger>
          <TabsTrigger value="media" className="text-white data-[state=active]:bg-eastdigital-orange">Media & Images</TabsTrigger>
          <TabsTrigger value="seo" className="text-white data-[state=active]:bg-eastdigital-orange">SEO & Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="text-white">Project Name *</Label>
              <Input
                id="name"
                value={data.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="Enter project name"
                required
              />
            </div>
            <div>
              <Label htmlFor="slug" className="text-white flex items-center gap-2">
                URL Slug *
                {getSlugIcon()}
              </Label>
              <div className="flex gap-2">
                <Input
                  id="slug"
                  value={data.slug || ''}
                  onChange={(e) => handleInputChange('slug', e.target.value)}
                  className={`bg-gray-800 border-gray-700 text-white ${
                    slugCheckState === 'taken' ? 'border-red-500' : 
                    slugCheckState === 'available' ? 'border-green-500' : ''
                  }`}
                  placeholder="project-url-slug"
                />
                <Button
                  type="button"
                  onClick={generateNewSlug}
                  variant="outline"
                  size="sm"
                  className="border-gray-700 text-gray-300 hover:bg-gray-800"
                  disabled={!data.name}
                >
                  Generate
                </Button>
              </div>
              {slugError && (
                <p className="text-red-400 text-sm mt-1">{slugError}</p>
              )}
              {data.slug && slugCheckState === 'available' && (
                <p className="text-green-400 text-sm mt-1">✓ URL slug is available</p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="subtitle" className="text-white">Subtitle</Label>
            <Input
              id="subtitle"
              value={data.subtitle}
              onChange={(e) => handleInputChange('subtitle', e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
              placeholder="Brief project subtitle"
            />
          </div>

          <div>
            <Label htmlFor="description" className="text-white">Description</Label>
            <Textarea
              id="description"
              value={data.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
              placeholder="Project description"
              rows={4}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category" className="text-white">Category</Label>
              <select
                id="category"
                value={data.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
              >
                <option value="">Select Category</option>
                <option value="3d-rendering">3D Rendering & Visualization</option>
                <option value="digital-marketing">Digital Marketing Campaigns</option>
                <option value="corporate-solutions">Corporate Solutions</option>
              </select>
            </div>
            <div>
              <Label htmlFor="status" className="text-white">Status</Label>
              <select
                id="status"
                value={data.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
                className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
              >
                <option value="upcoming">Upcoming</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="on-hold">On Hold</option>
              </select>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="details" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="client" className="text-white">Client</Label>
              <Input
                id="client"
                value={data.client}
                onChange={(e) => handleInputChange('client', e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="Client name"
              />
            </div>
            <div>
              <Label htmlFor="location" className="text-white">Location</Label>
              <Input
                id="location"
                value={data.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="Project location"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="duration" className="text-white">Duration</Label>
              <Input
                id="duration"
                value={data.duration}
                onChange={(e) => handleInputChange('duration', e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="Project duration"
              />
            </div>
            <div>
              <Label htmlFor="team_size" className="text-white">Team Size</Label>
              <Input
                id="team_size"
                value={data.team_size}
                onChange={(e) => handleInputChange('team_size', e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="Team size"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="challenge" className="text-white">Challenge</Label>
            <Textarea
              id="challenge"
              value={data.challenge}
              onChange={(e) => handleInputChange('challenge', e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
              placeholder="Project challenge description"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="solution" className="text-white">Solution</Label>
            <Textarea
              id="solution"
              value={data.solution}
              onChange={(e) => handleInputChange('solution', e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
              placeholder="Solution description"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="engagement_result" className="text-white">Engagement Result</Label>
              <Input
                id="engagement_result"
                value={data.engagement_result}
                onChange={(e) => handleInputChange('engagement_result', e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="e.g., 150% increase"
              />
            </div>
            <div>
              <Label htmlFor="leads_result" className="text-white">Leads Result</Label>
              <Input
                id="leads_result"
                value={data.leads_result}
                onChange={(e) => handleInputChange('leads_result', e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="e.g., 300+ new leads"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="conversion_result" className="text-white">Conversion Result</Label>
              <Input
                id="conversion_result"
                value={data.conversion_result}
                onChange={(e) => handleInputChange('conversion_result', e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="e.g., 25% conversion rate"
              />
            </div>
            <div>
              <Label htmlFor="timeline_result" className="text-white">Timeline Result</Label>
              <Input
                id="timeline_result"
                value={data.timeline_result}
                onChange={(e) => handleInputChange('timeline_result', e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="e.g., Delivered 2 weeks early"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="tags" className="text-white">Tags (comma-separated)</Label>
            <Input
              id="tags"
              value={data.tags?.join(', ') || ''}
              onChange={(e) => handleTagsChange(e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
              placeholder="3D, marketing, luxury, residential"
            />
            {data.tags && data.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {data.tags.map((tag, idx) => (
                  <Badge key={idx} variant="secondary" className="bg-eastdigital-orange/20 text-eastdigital-orange">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="media" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="featured_image" className="text-white">Featured Image URL</Label>
              <Input
                id="featured_image"
                value={data.featured_image}
                onChange={(e) => handleInputChange('featured_image', e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="https://example.com/featured-image.jpg"
              />
              {data.featured_image && (
                <img src={data.featured_image} alt="Featured preview" className="mt-2 w-32 h-24 object-cover rounded border border-gray-700" />
              )}
            </div>
            <div>
              <Label htmlFor="featured_image_alt" className="text-white">Featured Image Alt Text</Label>
              <Input
                id="featured_image_alt"
                value={data.featured_image_alt || ''}
                onChange={(e) => handleInputChange('featured_image_alt', e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="Descriptive alt text for featured image"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="hero_image" className="text-white">Hero Image URL</Label>
              <Input
                id="hero_image"
                value={data.hero_image}
                onChange={(e) => handleInputChange('hero_image', e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="https://example.com/hero-image.jpg"
              />
              {data.hero_image && (
                <img src={data.hero_image} alt="Hero preview" className="mt-2 w-32 h-24 object-cover rounded border border-gray-700" />
              )}
            </div>
            <div>
              <Label htmlFor="hero_image_alt" className="text-white">Hero Image Alt Text</Label>
              <Input
                id="hero_image_alt"
                value={data.hero_image_alt || ''}
                onChange={(e) => handleInputChange('hero_image_alt', e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="Descriptive alt text for hero image"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="image_url" className="text-white">Legacy Image URL</Label>
            <Input
              id="image_url"
              value={data.image_url}
              onChange={(e) => handleInputChange('image_url', e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
              placeholder="https://example.com/legacy-image.jpg"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="gallery_images" className="text-white">Gallery Images (one URL per line)</Label>
              <Textarea
                id="gallery_images"
                value={data.gallery_images?.join('\n') || ''}
                onChange={(e) => handleGalleryImagesChange(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="https://example.com/gallery1.jpg&#10;https://example.com/gallery2.jpg"
                rows={5}
              />
              {data.gallery_images && data.gallery_images.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {data.gallery_images.slice(0, 6).map((img, idx) => (
                    <img key={idx} src={img} alt={`Gallery ${idx + 1}`} className="w-16 h-12 object-cover rounded border border-gray-700" />
                  ))}
                  {data.gallery_images.length > 6 && (
                    <div className="w-16 h-12 bg-gray-700 rounded flex items-center justify-center text-xs text-gray-300">
                      +{data.gallery_images.length - 6}
                    </div>
                  )}
                </div>
              )}
            </div>
            <div>
              <Label htmlFor="gallery_image_alts" className="text-white">Gallery Image Alt Texts (one per line)</Label>
              <Textarea
                id="gallery_image_alts"
                value={data.gallery_image_alts?.join('\n') || ''}
                onChange={(e) => handleGalleryImageAltsChange(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="Alt text for gallery image 1&#10;Alt text for gallery image 2"
                rows={5}
              />
              <p className="text-xs text-gray-400 mt-1">
                Each line corresponds to the same-numbered gallery image above
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="seo" className="space-y-4">
          <div>
            <Label htmlFor="seo_title" className="text-white">SEO Title</Label>
            <Input
              id="seo_title"
              value={data.seo_title}
              onChange={(e) => handleInputChange('seo_title', e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
              placeholder="SEO-friendly title for search engines"
            />
          </div>

          <div>
            <Label htmlFor="seo_description" className="text-white">SEO Description</Label>
            <Textarea
              id="seo_description"
              value={data.seo_description}
              onChange={(e) => handleInputChange('seo_description', e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
              placeholder="SEO meta description (150-160 characters recommended)"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="seo_keywords" className="text-white">SEO Keywords</Label>
            <Input
              id="seo_keywords"
              value={data.seo_keywords}
              onChange={(e) => handleInputChange('seo_keywords', e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
              placeholder="keyword1, keyword2, keyword3"
            />
          </div>

          <div className="space-y-4">
            <Label className="text-white text-lg">Project Settings</Label>
            
            <CustomToggle
              checked={data.is_featured}
              onCheckedChange={(checked) => handleInputChange('is_featured', checked)}
              label="Featured Project"
              icon={Star}
              description="Display this project prominently on the homepage"
            />

            <CustomToggle
              checked={data.show_in_carousel}
              onCheckedChange={(checked) => handleInputChange('show_in_carousel', checked)}
              label="Homepage Carousel"
              icon={Globe}
              description="Include this project in the main homepage carousel"
            />
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex gap-3 pt-4 border-t border-gray-700">
        <Button 
          type="submit"
          className="bg-eastdigital-orange hover:bg-eastdigital-orange/90 flex-1"
          disabled={isLoading || slugCheckState === 'taken'}
        >
          <Save className="h-4 w-4 mr-2" />
          {mode === 'create' ? 'Create Project' : 'Save Changes'}
        </Button>
        <Button 
          type="button"
          onClick={onCancel}
          variant="outline"
          className="border-gray-700 text-gray-300 hover:bg-gray-800"
          disabled={isLoading}
        >
          <X className="h-4 w-4 mr-2" />
          Cancel
        </Button>
      </div>
    </form>
  );
};
