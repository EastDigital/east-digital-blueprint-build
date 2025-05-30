
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ProjectList } from './ProjectManagement/ProjectList';
import { CreateProjectForm } from './ProjectManagement/CreateProjectForm';
import { useProjectManagement } from './ProjectManagement/hooks/useProjectManagement';

export const DatabaseProjectManagement = () => {
  const {
    projects,
    editingProject,
    newProjectData,
    editingProjectData,
    isLoading,
    isSubmitting,
    showCreateForm,
    setShowCreateForm,
    setNewProjectData,
    setEditingProjectData,
    handleCreateProject,
    handleUpdateProject,
    handleDuplicateProject,
    handleDeleteProject,
    handleEditProject,
    handleCancelEdit,
    handleCancelCreate
  } = useProjectManagement();

  if (isLoading) {
    return <div className="text-white">Loading projects...</div>;
  }

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Enhanced Project Management</h1>
          {!showCreateForm && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => setShowCreateForm(true)}
                  className="bg-eastdigital-orange hover:bg-eastdigital-orange/90"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Project
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Create a new project with enhanced features</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>

        {/* Create Project Form */}
        {showCreateForm && (
          <CreateProjectForm
            newProjectData={newProjectData}
            isSubmitting={isSubmitting}
            onCreateProject={handleCreateProject}
            onCancel={handleCancelCreate}
            onNewProjectDataChange={setNewProjectData}
          />
        )}

        {/* Project List */}
        <ProjectList
          projects={projects}
          editingProject={editingProject}
          editingProjectData={editingProjectData}
          isSubmitting={isSubmitting}
          onEditProject={handleEditProject}
          onDeleteProject={handleDeleteProject}
          onDuplicateProject={handleDuplicateProject}
          onUpdateProject={handleUpdateProject}
          onCancelEdit={handleCancelEdit}
          onEditingProjectDataChange={setEditingProjectData}
        />
      </div>
    </TooltipProvider>
  );
};
