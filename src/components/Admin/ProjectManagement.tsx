
import React, { useState } from 'react';
import { FileText, Plus, Edit, Trash2, Search, Eye } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { getProjects, Project } from '@/data/projects';
import { useNavigate } from 'react-router-dom';

export const ProjectManagement = () => {
  const [projects, setProjects] = useState<Project[]>(getProjects());
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    category: '3D Rendering & Visualization',
    status: 'upcoming' as const,
    client: '',
    location: ''
  });
  const navigate = useNavigate();

  const filteredProjects = projects.filter(project => 
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.client.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProject = () => {
    const project: Project = {
      id: Date.now().toString(),
      ...newProject,
      subtitle: '',
      featuredImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
      heroImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&h=800&fit=crop',
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
      gallery: [],
      tags: []
    };
    setProjects([...projects, project]);
    setNewProject({
      title: '',
      category: '3D Rendering & Visualization',
      status: 'upcoming',
      client: '',
      location: ''
    });
    setIsAddDialogOpen(false);
  };

  const handleDeleteProject = (id: string) => {
    setProjects(projects.filter(project => project.id !== id));
  };

  const handleViewProject = (id: string) => {
    navigate(`/project/${id}`);
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
          <DialogContent className="bg-gray-900 border-gray-800 text-white">
            <DialogHeader>
              <DialogTitle>Add New Project</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Project Title</Label>
                <Input
                  id="title"
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  value={newProject.category}
                  onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
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
                  value={newProject.status}
                  onChange={(e) => setNewProject({ ...newProject, status: e.target.value as any })}
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
                  value={newProject.client}
                  onChange={(e) => setNewProject({ ...newProject, client: e.target.value })}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={newProject.location}
                  onChange={(e) => setNewProject({ ...newProject, location: e.target.value })}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <Button onClick={handleAddProject} className="w-full bg-eastdigital-orange hover:bg-eastdigital-orange/90">
                Add Project
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

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
                    <Button variant="outline" size="sm" className="border-gray-700 text-gray-300">
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleDeleteProject(project.id)}
                      className="border-red-700 text-red-400 hover:bg-red-900"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
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
