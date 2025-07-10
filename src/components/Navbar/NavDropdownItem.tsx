import React from 'react';
import { Link } from 'react-router-dom'; // <-- ADDED THIS IMPORT
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
  isMobile?: boolean;
  onItemClick?: () => void;
}

export const NavDropdownItem = ({ 
  title, 
  link, 
  shortText, 
  subItems, 
  bottomText,
  isMobile = false,
  onItemClick
}: NavDropdownItemProps) => {
  const handleClick = () => {
    if (onItemClick) {
      onItemClick();
    }
  };

  return (
    <div className={cn(
      "flex-1",
      isMobile ? "px-6 py-4" : "px-8 py-6"
    )}>
      {/* CHANGED <a> to <Link> and href to to */}
      <Link 
        to={link} 
        className={cn(
          "block font-poppins font-semibold bg-gradient-to-b from-[#FF6900] to-[#FBA971] bg-clip-text text-transparent hover:from-[#FF6900] hover:to-[#FF6900] transition-all duration-300 mb-3",
          isMobile ? "text-lg" : "text-base whitespace-nowrap"
        )}
        onClick={handleClick}
      >
        {title}
      </Link>
      
      <p className={cn(
        "font-poppins font-normal text-[#999999] mb-4 leading-relaxed",
        isMobile ? "text-sm" : "text-xs"
      )}>
        {shortText}
      </p>
      
      <ul className={cn(
        "mb-4",
        isMobile ? "space-y-3" : "space-y-3"
      )}>
        {subItems.map((item, index) => (
          <li key={index}>
            {/* CHANGED <a> to <Link> and href to to */}
            <Link 
              to={item.anchor} 
              className={cn(
                "block font-poppins font-medium text-white hover:text-[#FFE0CA] transition-colors duration-200",
                isMobile ? "text-base" : "text-base"
              )}
              onClick={handleClick}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
      
      <p className={cn(
        "font-poppins font-normal text-[#999999] leading-relaxed",
        isMobile ? "text-sm" : "text-xs"
      )}>
        {bottomText}
      </p>
    </div>
  );
};

export default NavDropdownItem;
