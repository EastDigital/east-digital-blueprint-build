
import React from 'react';
import { FileText, Plus, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ProjectFormTabs } from './ProjectFormTabs';
import { ProjectTable } from './ProjectTable';
import { useProjectManagement } from '@/hooks/useProjectManagement';

export const ProjectManagement = () => {
  const {
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
  } = useProjectManagement();

  return (
    <TooltipProvider>
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
            <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-4xl w-[90vw] max-h-[85vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Project</DialogTitle>
              </DialogHeader>
              <ProjectFormTabs
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
          <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-4xl w-[90vw] max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Project</DialogTitle>
            </DialogHeader>
            {editingProject && (
              <ProjectFormTabs
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

        <ProjectTable
          projects={filteredProjects}
          onView={handleViewProject}
          onEdit={openEditDialog}
          onDuplicate={handleDuplicateProject}
          onDelete={handleDeleteProject}
        />
      </div>
    </TooltipProvider>
  );
};
