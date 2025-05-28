
import React from 'react';

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
    <div className="flex-1 p-[10%]">
      <a 
        href={link} 
        className="block font-semibold text-base tracking-wide transition-all duration-300"
        style={{
          fontFamily: 'Poppins',
          fontSize: '16px',
          fontWeight: '600',
          background: 'linear-gradient(to bottom, #FF6900, #FBA971)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}
      >
        {title}
      </a>
      <p 
        className="mt-1 mb-3"
        style={{
          fontFamily: 'Poppins',
          fontSize: '12px',
          fontWeight: '400',
          color: '#999999'
        }}
      >
        {shortText}
      </p>
      
      <ul className="space-y-2">
        {subItems.map((item, index) => (
          <li key={index}>
            <a 
              href={item.anchor} 
              className="block transition-colors duration-200 hover:text-[#FFE0CA]"
              style={{
                fontFamily: 'Poppins',
                fontSize: '16px',
                fontWeight: '500',
                color: '#FFFFFF'
              }}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
      
      <p 
        className="mt-4"
        style={{
          fontFamily: 'Poppins',
          fontSize: '12px',
          fontWeight: '400',
          color: '#999999'
        }}
      >
        {bottomText}
      </p>
    </div>
  );
};

export default NavDropdownItem;
