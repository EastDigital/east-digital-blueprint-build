
import React from 'react';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ProjectTableRow } from './ProjectTableRow';
import { Project } from '@/data/projects';

interface ProjectTableProps {
  projects: Project[];
  onView: (id: string) => void;
  onEdit: (project: Project) => void;
  onDuplicate: (project: Project) => void;
  onDelete: (id: string) => void;
}

export const ProjectTable = ({ projects, onView, onEdit, onDuplicate, onDelete }: ProjectTableProps) => {
  return (
    <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-gray-700 hover:bg-gray-800/50">
            <TableHead className="text-gray-300 font-medium py-4">Title</TableHead>
            <TableHead className="text-gray-300 font-medium py-4">Category</TableHead>
            <TableHead className="text-gray-300 font-medium py-4">Status</TableHead>
            <TableHead className="text-gray-300 font-medium py-4">Client</TableHead>
            <TableHead className="text-gray-300 font-medium py-4">Location</TableHead>
            <TableHead className="text-gray-300 font-medium py-4 text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <ProjectTableRow
              key={project.id}
              project={project}
              onView={onView}
              onEdit={onEdit}
              onDuplicate={onDuplicate}
              onDelete={onDelete}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
