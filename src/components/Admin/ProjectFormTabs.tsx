
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ImageManager } from '@/components/Admin/ImageManager';
import { SeoFields } from '@/components/Admin/SeoFields';

interface ProjectFormTabsProps {
  project: any;
  onProjectChange: (project: any) => void;
  onSubmit: () => void;
  submitLabel: string;
}

export const ProjectFormTabs = ({ project, onProjectChange, onSubmit, submitLabel }: ProjectFormTabsProps) => (
  <Tabs defaultValue="basic" className="w-full">
    <TabsList className="grid w-full grid-cols-3">
      <TabsTrigger value="basic">Basic Info</TabsTrigger>
      <TabsTrigger value="images">Images</TabsTrigger>
      <TabsTrigger value="seo">SEO</TabsTrigger>
    </TabsList>
    
    <TabsContent value="basic" className="space-y-4">
      <div>
        <Label htmlFor="title">Project Title</Label>
        <Input
          id="title"
          value={project.title}
          onChange={(e) => onProjectChange({ ...project, title: e.target.value })}
          className="bg-gray-800 border-gray-700 text-white"
        />
      </div>
      <div>
        <Label htmlFor="category">Category</Label>
        <select
          id="category"
          value={project.category}
          onChange={(e) => onProjectChange({ ...project, category: e.target.value })}
          className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
        >
          <option value="3D Rendering & Visualization">3D Rendering & Visualization</option>
          <option value="Digital Marketing Campaigns">Digital Marketing Campaigns</option>
          <option value="Corporate Solutions">Corporate Solutions</option>
        </select>
      </div>
      <div>
        <Label htmlFor="status">Status</Label>
        <select
          id="status"
          value={project.status}
          onChange={(e) => onProjectChange({ ...project, status: e.target.value as any })}
          className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
        >
          <option value="upcoming">Upcoming</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <div>
        <Label htmlFor="client">Client</Label>
        <Input
          id="client"
          value={project.client}
          onChange={(e) => onProjectChange({ ...project, client: e.target.value })}
          className="bg-gray-800 border-gray-700 text-white"
        />
      </div>
      <div>
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          value={project.location}
          onChange={(e) => onProjectChange({ ...project, location: e.target.value })}
          className="bg-gray-800 border-gray-700 text-white"
        />
      </div>
    </TabsContent>
    
    <TabsContent value="images" className="space-y-4">
      <ImageManager
        images={project.featuredImage ? [project.featuredImage] : []}
        onImagesChange={(images) => onProjectChange({ ...project, featuredImage: images[0] || '' })}
        label="Featured Image"
        allowMultiple={false}
      />
      <ImageManager
        images={project.heroImage ? [project.heroImage] : []}
        onImagesChange={(images) => onProjectChange({ ...project, heroImage: images[0] || '' })}
        label="Hero Image"
        allowMultiple={false}
      />
      <ImageManager
        images={project.gallery || []}
        onImagesChange={(images) => onProjectChange({ ...project, gallery: images })}
        label="Gallery Images"
        allowMultiple={true}
      />
    </TabsContent>
    
    <TabsContent value="seo" className="space-y-4">
      <SeoFields
        seo={project.seo || {}}
        onSeoChange={(seo) => onProjectChange({ ...project, seo })}
        galleryCount={project.gallery?.length || 0}
      />
    </TabsContent>
    
    <Button onClick={onSubmit} className="w-full bg-eastdigital-orange hover:bg-eastdigital-orange/90 mt-4">
      {submitLabel}
    </Button>
  </Tabs>
);
