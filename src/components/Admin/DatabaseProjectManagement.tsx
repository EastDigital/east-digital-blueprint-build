import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { ProjectForm } from './ProjectForm';

interface Project {
  id: string;
  name: string;
  description: string;
  image_url: string;
  category: string;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

interface ProjectFormData {
  name: string;
  description: string;
  image_url: string;
  category: string;
  is_featured: boolean;
}

const initialFormData: ProjectFormData = {
  name: '',
  description: '',
  image_url: '',
  category: '',
  is_featured: false
};

export const DatabaseProjectManagement = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [newProjectData, setNewProjectData] = useState<ProjectFormData>(initialFormData);
  const [editingProjectData, setEditingProjectData] = useState<ProjectFormData>(initialFormData);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch projects: " + error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateProject = async () => {
    if (!newProjectData.name.trim()) {
      toast({
        title: "Error",
        description: "Project name is required",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const { data, error } = await supabase
        .from('projects')
        .insert([newProjectData])
        .select()
        .single();

      if (error) throw error;

      setProjects([data, ...projects]);
      setNewProjectData(initialFormData);

      toast({
        title: "Success",
        description: "Project created successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to create project: " + error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateProject = async () => {
    if (!editingProject) return;

    setIsSubmitting(true);
    try {
      const { data, error } = await supabase
        .from('projects')
        .update({
          ...editingProjectData,
          updated_at: new Date().toISOString()
        })
        .eq('id', editingProject.id)
        .select()
        .single();

      if (error) throw error;

      setProjects(projects.map(p => p.id === editingProject.id ? data : p));
      setEditingProject(null);

      toast({
        title: "Success",
        description: "Project updated successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to update project: " + error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setProjects(projects.filter(p => p.id !== id));

      toast({
        title: "Success",
        description: "Project deleted successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to delete project: " + error.message,
        variant: "destructive",
      });
    }
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setEditingProjectData({
      name: project.name,
      description: project.description,
      image_url: project.image_url,
      category: project.category,
      is_featured: project.is_featured
    });
  };

  const handleCancelEdit = () => {
    setEditingProject(null);
    setEditingProjectData(initialFormData);
  };

  if (isLoading) {
    return <div className="text-white">Loading projects...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Project Management</h1>
      </div>

      {/* Add New Project */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Add New Project
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ProjectForm
            data={newProjectData}
            onChange={setNewProjectData}
            onSave={handleCreateProject}
            onCancel={() => setNewProjectData(initialFormData)}
            isLoading={isSubmitting}
            mode="create"
          />
        </CardContent>
      </Card>

      {/* Existing Projects */}
      <div className="grid gap-4">
        {projects.map((project) => (
          <Card key={project.id} className="bg-gray-900 border-gray-800">
            <CardContent className="p-6">
              {editingProject?.id === project.id ? (
                <ProjectForm
                  data={editingProjectData}
                  onChange={setEditingProjectData}
                  onSave={handleUpdateProject}
                  onCancel={handleCancelEdit}
                  isLoading={isSubmitting}
                  mode="edit"
                />
              ) : (
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-semibold text-white">{project.name}</h3>
                      {project.is_featured && (
                        <span className="bg-eastdigital-orange text-white px-2 py-1 rounded text-xs">
                          Featured
                        </span>
                      )}
                    </div>
                    <p className="text-gray-400 mb-2">{project.category}</p>
                    <p className="text-gray-300 mb-2">{project.description}</p>
                    {project.image_url && (
                      <img 
                        src={project.image_url} 
                        alt={project.name}
                        className="w-24 h-24 object-cover rounded mt-2"
                      />
                    )}
                    <p className="text-gray-500 text-sm mt-2">
                      Created: {new Date(project.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleEditProject(project)}
                      variant="outline"
                      size="sm"
                      className="border-gray-700 text-gray-300 hover:bg-gray-800"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={() => handleDeleteProject(project.id)}
                      variant="outline"
                      size="sm"
                      className="border-red-700 text-red-400 hover:bg-red-900"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {projects.length === 0 && (
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6 text-center">
            <p className="text-gray-400">No projects found. Create your first project above.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
