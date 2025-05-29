import React, { useState } from 'react';
import { FileText, Plus, Edit, Trash2, Search, Eye, Copy } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getProjects, Project } from '@/data/projects';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { ImageManager } from '@/components/Admin/ImageManager';
import { SeoFields } from '@/components/Admin/SeoFields';

export const ProjectManagement = () => {
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-900 text-green-300';
      case 'in-progress':
        return 'bg-amber-900 text-amber-300';
      case 'upcoming':
        return 'bg-blue-900 text-blue-300';
      default:
        return 'bg-gray-900 text-gray-300';
    }
  };

  const ProjectForm = ({ project, onProjectChange, onSubmit, submitLabel }: {
    project: any;
    onProjectChange: (project: any) => void;
    onSubmit: () => void;
    submitLabel: string;
  }) => (
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <FileText className="h-6 w-6 text-eastdigital-orange" />
          <h2 className="text-2xl font-bold text-white">Project Management</h2>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-eastdigital-orange hover:bg-eastdigital-orange/90">
              <Plus className="h-4 w-4 mr-2" />
              Add Project
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Project</DialogTitle>
            </DialogHeader>
            <ProjectForm
              project={newProject}
              onProjectChange={setNewProject}
              onSubmit={handleAddProject}
              submitLabel="Add Project"
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Edit Project Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
          </DialogHeader>
          {editingProject && (
            <ProjectForm
              project={editingProject}
              onProjectChange={setEditingProject}
              onSubmit={handleEditProject}
              submitLabel="Update Project"
            />
          )}
        </DialogContent>
      </Dialog>

      <div className="flex items-center space-x-2">
        <Search className="h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-gray-800 border-gray-700 text-white"
        />
      </div>

      <div className="bg-gray-900 rounded-lg border border-gray-800">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-gray-300">Title</TableHead>
              <TableHead className="text-gray-300">Category</TableHead>
              <TableHead className="text-gray-300">Status</TableHead>
              <TableHead className="text-gray-300">Client</TableHead>
              <TableHead className="text-gray-300">Location</TableHead>
              <TableHead className="text-gray-300">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProjects.map((project) => (
              <TableRow key={project.id}>
                <TableCell className="text-white font-medium">{project.title}</TableCell>
                <TableCell className="text-gray-300">{project.category}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(project.status)}`}>
                    {project.status.replace('-', ' ')}
                  </span>
                </TableCell>
                <TableCell className="text-gray-300">{project.client}</TableCell>
                <TableCell className="text-gray-300">{project.location}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleViewProject(project.id)}
                      className="border-gray-700 text-gray-300"
                    >
                      <Eye className="h-3 w-3" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => openEditDialog(project)}
                      className="border-gray-700 text-gray-300"
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleDuplicateProject(project)}
                      className="border-blue-700 text-blue-400 hover:bg-blue-900"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="border-red-700 text-red-400 hover:bg-red-900"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="bg-gray-900 border-gray-800 text-white">
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription className="text-gray-300">
                            This action cannot be undone. This will permanently delete the project "{project.title}" from the system.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700">
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction 
                            onClick={() => handleDeleteProject(project.id)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
