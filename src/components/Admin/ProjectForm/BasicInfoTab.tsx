
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Check, AlertCircle, RefreshCw } from 'lucide-react';

interface ProjectFormData {
  name: string;
  subtitle: string;
  description: string;
  category: string;
  status: string;
  slug?: string;
}

interface BasicInfoTabProps {
  data: ProjectFormData;
  onInputChange: (field: keyof ProjectFormData, value: any) => void;
  slugCheckState: 'idle' | 'checking' | 'available' | 'taken';
  slugError: string;
  onGenerateSlug: () => void;
  mode: 'create' | 'edit';
}

export const BasicInfoTab = ({
  data,
  onInputChange,
  slugCheckState,
  slugError,
  onGenerateSlug,
  mode
}: BasicInfoTabProps) => {
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

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name" className="text-white">Project Name *</Label>
          <Input
            id="name"
            value={data.name}
            onChange={(e) => onInputChange('name', e.target.value)}
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
              onChange={(e) => onInputChange('slug', e.target.value)}
              className={`bg-gray-800 border-gray-700 text-white ${
                slugCheckState === 'taken' ? 'border-red-500' : 
                slugCheckState === 'available' ? 'border-green-500' : ''
              }`}
              placeholder="project-url-slug"
            />
            <Button
              type="button"
              onClick={onGenerateSlug}
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
          onChange={(e) => onInputChange('subtitle', e.target.value)}
          className="bg-gray-800 border-gray-700 text-white"
          placeholder="Brief project subtitle"
        />
      </div>

      <div>
        <Label htmlFor="description" className="text-white">Description</Label>
        <Textarea
          id="description"
          value={data.description}
          onChange={(e) => onInputChange('description', e.target.value)}
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
            onChange={(e) => onInputChange('category', e.target.value)}
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
            onChange={(e) => onInputChange('status', e.target.value)}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
          >
            <option value="upcoming">Upcoming</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="on-hold">On Hold</option>
          </select>
        </div>
      </div>
    </div>
  );
};
