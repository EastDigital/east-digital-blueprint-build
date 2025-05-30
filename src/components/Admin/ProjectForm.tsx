
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Save, X } from 'lucide-react';

interface ProjectFormData {
  name: string;
  description: string;
  image_url: string;
  category: string;
  is_featured: boolean;
}

interface ProjectFormProps {
  data: ProjectFormData;
  onChange: (data: ProjectFormData) => void;
  onSave: () => void;
  onCancel: () => void;
  isLoading?: boolean;
  mode: 'create' | 'edit';
}

export const ProjectForm = ({ 
  data, 
  onChange, 
  onSave, 
  onCancel, 
  isLoading = false, 
  mode 
}: ProjectFormProps) => {
  const handleInputChange = (field: keyof ProjectFormData, value: string | boolean) => {
    onChange({ ...data, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="project-name" className="text-white">Project Name</Label>
          <Input
            id="project-name"
            value={data.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className="bg-gray-800 border-gray-700 text-white"
            placeholder="Enter project name"
            required
          />
        </div>
        <div>
          <Label htmlFor="project-category" className="text-white">Category</Label>
          <Input
            id="project-category"
            value={data.category}
            onChange={(e) => handleInputChange('category', e.target.value)}
            className="bg-gray-800 border-gray-700 text-white"
            placeholder="Enter category"
          />
        </div>
      </div>
      <div>
        <Label htmlFor="project-description" className="text-white">Description</Label>
        <Textarea
          id="project-description"
          value={data.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          className="bg-gray-800 border-gray-700 text-white"
          placeholder="Enter project description"
          rows={3}
        />
      </div>
      <div>
        <Label htmlFor="project-image" className="text-white">Image URL</Label>
        <Input
          id="project-image"
          value={data.image_url}
          onChange={(e) => handleInputChange('image_url', e.target.value)}
          className="bg-gray-800 border-gray-700 text-white"
          placeholder="Enter image URL"
        />
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="project-featured"
          checked={data.is_featured}
          onChange={(e) => handleInputChange('is_featured', e.target.checked)}
          className="rounded"
        />
        <Label htmlFor="project-featured" className="text-white">Featured Project</Label>
      </div>
      <div className="flex gap-2">
        <Button 
          type="submit"
          className="bg-green-600 hover:bg-green-700"
          disabled={isLoading}
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
