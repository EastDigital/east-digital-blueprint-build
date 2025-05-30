
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Star, Globe, Check } from 'lucide-react';

interface ProjectFormData {
  seo_title: string;
  seo_description: string;
  seo_keywords: string;
  is_featured: boolean;
  show_in_carousel: boolean;
}

interface SeoSettingsTabProps {
  data: ProjectFormData;
  onInputChange: (field: keyof ProjectFormData, value: any) => void;
}

export const SeoSettingsTab = ({
  data,
  onInputChange
}: SeoSettingsTabProps) => {
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
    <div className="space-y-4">
      <div>
        <Label htmlFor="seo_title" className="text-white">SEO Title</Label>
        <Input
          id="seo_title"
          value={data.seo_title}
          onChange={(e) => onInputChange('seo_title', e.target.value)}
          className="bg-gray-800 border-gray-700 text-white"
          placeholder="SEO-friendly title for search engines"
        />
      </div>

      <div>
        <Label htmlFor="seo_description" className="text-white">SEO Description</Label>
        <Textarea
          id="seo_description"
          value={data.seo_description}
          onChange={(e) => onInputChange('seo_description', e.target.value)}
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
          onChange={(e) => onInputChange('seo_keywords', e.target.value)}
          className="bg-gray-800 border-gray-700 text-white"
          placeholder="keyword1, keyword2, keyword3"
        />
      </div>

      <div className="space-y-4">
        <Label className="text-white text-lg">Project Settings</Label>
        
        <CustomToggle
          checked={data.is_featured}
          onCheckedChange={(checked) => onInputChange('is_featured', checked)}
          label="Featured Project"
          icon={Star}
          description="Display this project prominently on the homepage"
        />

        <CustomToggle
          checked={data.show_in_carousel}
          onCheckedChange={(checked) => onInputChange('show_in_carousel', checked)}
          label="Homepage Carousel"
          icon={Globe}
          description="Include this project in the main homepage carousel"
        />
      </div>
    </div>
  );
};
