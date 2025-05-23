
import React from 'react';
import { cn } from '@/lib/utils';

interface SubItem {
  title: string;
  anchor: string;
}

interface NavDropdownItemProps {
  title: string;
  link: string;
  shortText: string;
  subItems: SubItem[];
  bottomText: string;
}

export const NavDropdownItem = ({ 
  title, 
  link, 
  shortText, 
  subItems, 
  bottomText 
}: NavDropdownItemProps) => {
  return (
    <div className="px-6 py-5">
      <a 
        href={link} 
        className="block font-semibold text-base tracking-wide bg-gradient-to-r from-eastdigital-orange to-white bg-clip-text text-transparent hover:from-eastdigital-hover hover:to-white transition-all duration-300"
      >
        {title}
      </a>
      <p className="text-xs text-eastdigital-lightgray mt-1 mb-3">{shortText}</p>
      
      <ul className="space-y-2">
        {subItems.map((item, index) => (
          <li key={index}>
            <a 
              href={item.anchor} 
              className="block text-white text-base font-medium hover:text-eastdigital-hover transition-colors duration-200"
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
      
      <p className="text-xs text-eastdigital-lightgray mt-4">{bottomText}</p>
    </div>
  );
};

export default NavDropdownItem;
