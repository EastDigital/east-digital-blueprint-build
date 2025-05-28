
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
    <div className="flex-1 px-8 py-6">
      <a 
        href={link} 
        className="block font-poppins text-base font-semibold bg-gradient-to-b from-[#FF6900] to-[#FBA971] bg-clip-text text-transparent hover:from-[#FF6900] hover:to-[#FF6900] transition-all duration-300 mb-2"
      >
        {title}
      </a>
      
      <p className="font-poppins text-xs font-normal text-[#999999] mb-4 leading-relaxed">
        {shortText}
      </p>
      
      <ul className="space-y-3 mb-4">
        {subItems.map((item, index) => (
          <li key={index}>
            <a 
              href={item.anchor} 
              className="block font-poppins text-base font-medium text-white hover:text-[#FFE0CA] transition-colors duration-200"
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
      
      <p className="font-poppins text-xs font-normal text-[#999999] leading-relaxed">
        {bottomText}
      </p>
    </div>
  );
};

export default NavDropdownItem;
