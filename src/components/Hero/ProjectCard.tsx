
import React from 'react';
import { LucideIcon, ArrowUpRight } from 'lucide-react';

interface ProjectCardProps {
  name: string;
  icon: LucideIcon;
}

export const ProjectCard = ({ name, icon: Icon }: ProjectCardProps) => {
  return (
    <div className="flex-shrink-0 w-72 h-48 bg-gradient-to-br from-eastdigital-gray/80 to-eastdigital-dark/90 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-eastdigital-orange/50 transition-all duration-300 cursor-pointer group">
      <div className="flex flex-col h-full justify-between">
        {/* Icon and Arrow */}
        <div className="flex justify-between items-start">
          <div className="p-3 bg-eastdigital-orange/10 rounded-xl group-hover:bg-eastdigital-orange/20 transition-colors duration-300">
            <Icon className="w-6 h-6 text-eastdigital-orange" />
          </div>
          <ArrowUpRight className="w-5 h-5 text-eastdigital-lightgray group-hover:text-eastdigital-orange transition-colors duration-300" />
        </div>
        
        {/* Project Name */}
        <div>
          <h3 className="text-white font-poppins font-semibold text-lg group-hover:text-eastdigital-hover transition-colors duration-300">
            {name}
          </h3>
        </div>
      </div>
    </div>
  );
};
