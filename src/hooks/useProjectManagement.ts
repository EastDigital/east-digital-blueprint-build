
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { getProjects, Project } from '@/data/projects';

export const useProjectManagement = () => {
  const [projects, setProjects] = useState<Project[]>(getProjects());
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [newProject, setNewProject] = useState({
    title: '',
    category: '3D Rendering & Visualization',
    status: 'upcoming' as const,
    client: '',
    location: '',
    featuredImage: '',
    heroImage: '',
    gallery: [] as string[],
    seo: {
      pageTitle: '',
      metaDescription: '',
      featuredImageAlt: '',
      heroImageAlt: '',
      galleryImageAlts: [] as string[]
    }
  });
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const filteredProjects = projects.filter(project => 
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.client.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProject = () => {
    const project: Project = {
      id: Date.now().toString(),
      title: newProject.title,
      subtitle: '',
      featuredImage: newProject.featuredImage || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
      heroImage: newProject.heroImage || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&h=800&fit=crop',
      category: newProject.category,
      status: newProject.status,
      client: newProject.client,
      location: newProject.location,
      duration: 'TBD',
      team: 'TBD',
      description: 'Project description to be added.',
      challenge: 'Challenge to be defined.',
      solution: 'Solution to be implemented.',
      results: {
        engagement: 'N/A',
        leads: 'N/A',
        conversion: 'N/A',
        timeline: 'N/A'
      },
      gallery: newProject.gallery,
      tags: [],
      seo: newProject.seo
    };
    setProjects([...projects, project]);
    setNewProject({
      title: '',
      category: '3D Rendering & Visualization',
      status: 'upcoming',
      client: '',
      location: '',
      featuredImage: '',
      heroImage: '',
      gallery: [],
      seo: {
        pageTitle: '',
        metaDescription: '',
        featuredImageAlt: '',
        heroImageAlt: '',
        galleryImageAlts: []
      }
    });
    setIsAddDialogOpen(false);
    toast({
      title: "Project Added",
      description: "New project has been added successfully.",
    });
  };

  const handleEditProject = () => {
    if (!editingProject) return;
    
    setProjects(projects.map(project => 
      project.id === editingProject.id ? editingProject : project
    ));
    setIsEditDialogOpen(false);
    setEditingProject(null);
    toast({
      title: "Project Updated",
      description: "Project has been updated successfully.",
    });
  };

  const handleDuplicateProject = (project: Project) => {
    const duplicatedProject: Project = {
      ...project,
      id: Date.now().toString(),
      title: `${project.title} (Copy)`,
      status: 'upcoming'
    };
    setProjects([...projects, duplicatedProject]);
    toast({
      title: "Project Duplicated",
      description: "Project has been duplicated successfully.",
    });
  };

  const handleDeleteProject = (id: string) => {
    setProjects(projects.filter(project => project.id !== id));
    toast({
      title: "Project Deleted",
      description: "Project has been deleted successfully.",
    });
  };

  const handleViewProject = (id: string) => {
    navigate(`/project/${id}`);
  };

  const openEditDialog = (project: Project) => {
    setEditingProject({ ...project });
    setIsEditDialogOpen(true);
  };

  return {
    projects,
    searchTerm,
    setSearchTerm,
    isAddDialogOpen,
    setIsAddDialogOpen,
    isEditDialogOpen,
    setIsEditDialogOpen,
    editingProject,
    setEditingProject,
    newProject,
    setNewProject,
    filteredProjects,
    handleAddProject,
    handleEditProject,
    handleDuplicateProject,
    handleDeleteProject,
    handleViewProject,
    openEditDialog
  };
};
