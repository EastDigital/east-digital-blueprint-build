
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Save, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { BasicInfoTab } from './ProjectForm/BasicInfoTab';
import { ProjectDetailsTab } from './ProjectForm/ProjectDetailsTab';
import { MediaImagesTab } from './ProjectForm/MediaImagesTab';
import { SeoSettingsTab } from './ProjectForm/SeoSettingsTab';
import { useSlugValidation } from './ProjectForm/useSlugValidation';
import { useProjectFormLogic } from './ProjectForm/useProjectFormLogic';

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
  const { toast } = useToast();
  const { slugCheckState, slugError } = useSlugValidation(data.slug || '', projectId, mode);
  const {
    handleTagsChange,
    handleGalleryImagesChange,
    handleGalleryImageAltsChange,
    generateNewSlug
  } = useProjectFormLogic(data, onChange, mode);

  const handleInputChange = (field: keyof ProjectFormData, value: any) => {
    onChange({ ...data, [field]: value });
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

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-gray-800">
          <TabsTrigger value="basic" className="text-white data-[state=active]:bg-eastdigital-orange">Basic Info</TabsTrigger>
          <TabsTrigger value="details" className="text-white data-[state=active]:bg-eastdigital-orange">Project Details</TabsTrigger>
          <TabsTrigger value="media" className="text-white data-[state=active]:bg-eastdigital-orange">Media & Images</TabsTrigger>
          <TabsTrigger value="seo" className="text-white data-[state=active]:bg-eastdigital-orange">SEO & Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="basic">
          <BasicInfoTab
            data={data}
            onInputChange={handleInputChange}
            slugCheckState={slugCheckState}
            slugError={slugError}
            onGenerateSlug={generateNewSlug}
            mode={mode}
          />
        </TabsContent>

        <TabsContent value="details">
          <ProjectDetailsTab
            data={data}
            onInputChange={handleInputChange}
            onTagsChange={handleTagsChange}
          />
        </TabsContent>

        <TabsContent value="media">
          <MediaImagesTab
            data={data}
            onInputChange={handleInputChange}
            onGalleryImagesChange={handleGalleryImagesChange}
            onGalleryImageAltsChange={handleGalleryImageAltsChange}
          />
        </TabsContent>

        <TabsContent value="seo">
          <SeoSettingsTab
            data={data}
            onInputChange={handleInputChange}
          />
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
