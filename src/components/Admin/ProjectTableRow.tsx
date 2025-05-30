
import React from 'react';
import { TableCell, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Edit, Trash2, Eye, Copy } from 'lucide-react';
import { Project } from '@/data/projects';

interface ProjectTableRowProps {
  project: Project;
  onView: (id: string) => void;
  onEdit: (project: Project) => void;
  onDuplicate: (project: Project) => void;
  onDelete: (id: string) => void;
}

export const ProjectTableRow = ({ project, onView, onEdit, onDuplicate, onDelete }: ProjectTableRowProps) => {
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
    <TableRow className="border-gray-700 hover:bg-gray-800/30 transition-colors duration-200">
      <TableCell className="text-white font-medium py-6">{project.title}</TableCell>
      <TableCell className="text-gray-300 py-6">{project.category}</TableCell>
      <TableCell className="py-6">
        <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
          {project.status.replace('-', ' ')}
        </span>
      </TableCell>
      <TableCell className="text-gray-300 py-6">{project.client}</TableCell>
      <TableCell className="text-gray-300 py-6">{project.location}</TableCell>
      <TableCell className="py-6">
        <div className="flex justify-center space-x-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => onView(project.id)}
                className="h-9 w-9 p-0 border-gray-600 text-gray-300 hover:text-white hover:bg-gray-700 hover:border-gray-500 transition-all duration-200"
              >
                <Eye className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>View Project</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => onEdit(project)}
                className="h-9 w-9 p-0 border-gray-600 text-gray-300 hover:text-white hover:bg-gray-700 hover:border-gray-500 transition-all duration-200"
              >
                <Edit className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Edit Project</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => onDuplicate(project)}
                className="h-9 w-9 p-0 border-blue-600 text-blue-400 hover:text-blue-300 hover:bg-blue-900/50 hover:border-blue-500 transition-all duration-200"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Duplicate Project</p>
            </TooltipContent>
          </Tooltip>
          
          <AlertDialog>
            <Tooltip>
              <TooltipTrigger asChild>
                <AlertDialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-9 w-9 p-0 border-red-600 text-red-400 hover:text-red-300 hover:bg-red-900/50 hover:border-red-500 transition-all duration-200"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
              </TooltipTrigger>
              <TooltipContent>
                <p>Delete Project</p>
              </TooltipContent>
            </Tooltip>
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
                  onClick={() => onDelete(project.id)}
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
  );
};
