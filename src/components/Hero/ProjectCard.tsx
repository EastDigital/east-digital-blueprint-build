
import React from 'react';
import { Link } from 'react-router-dom';

interface ProjectCardProps {
  name: string;
  image: string;
  projectId: string;
}

export const ProjectCard = ({ name, image, projectId }: ProjectCardProps) => {
  return (
    <Link to={`/project/${projectId}`} className="block">
      <div className="flex-shrink-0 w-[175px] h-[225px] sm:w-[285px] sm:h-[370px] bg-gradient-to-br from-eastdigital-gray/80 to-eastdigital-dark/90 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden hover:border-eastdigital-orange/50 transition-all duration-300 cursor-pointer group relative">
        <img src={image} alt={name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
        
        <div className="absolute top-0 left-0 right-0 h-[30%] bg-gradient-to-b from-black to-transparent z-10 mt-0"></div>
        
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 md:top-4 md:left-4 z-20">
          <h3 className="text-white font-poppins font-semibold text-xs sm:text-sm md:text-base lg:text-lg group-hover:text-eastdigital-hover transition-colors duration-300">
            {name}
          </h3>
        </div>
      </div>
    </Link>
  );
};
