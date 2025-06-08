// src/components/Navbar/NavDropdown.tsx

import React, { useState, useLayoutEffect, RefObject } from 'react';
import { createPortal } from 'react-dom';
import NavDropdownItem from './NavDropdownItem';

// Define the structure for expertise data
interface SubItem {
  title: string;
  anchor: string;
}
interface ExpertiseItem {
  title: string;
  link: string;
  shortText: string;
  subItems: SubItem[];
  bottomText: string;
}

// Update props to accept the anchorRef
interface NavDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  isMobile?: boolean;
  onItemClick?: () => void;
  anchorRef: RefObject<HTMLDivElement>; // This ref points to the "Expertise" link container
}

export const NavDropdown = ({ isOpen, anchorRef, isMobile = false, onItemClick }: NavDropdownProps) => {
  const [style, setStyle] = useState<React.CSSProperties>({ opacity: 0 });
  
  // Your expertiseData array goes here, I'm using a placeholder for brevity
  const expertiseData: ExpertiseItem[] = [
      // ... your full data array
  ];

  // This effect calculates the dropdown's position when it opens
  useLayoutEffect(() => {
    if (isOpen && anchorRef.current) {
      const rect = anchorRef.current.getBoundingClientRect();
      setStyle({
        opacity: 1,
        position: 'fixed',
        top: `${rect.bottom + 10}px`, // Position it 10px below the anchor
        left: '0px',
        width: '100vw',
      });
    } else {
      setStyle({ opacity: 0, pointerEvents: 'none' }); // Hide it when closed
    }
  }, [isOpen, anchorRef]);

  if (!isOpen) {
    return null;
  }

  const glassmorphismClasses = "bg-black/70 backdrop-blur-lg rounded-2xl border border-white/10 shadow-2xl overflow-hidden";

  // The actual JSX content of the dropdown
  const dropdownContent = (
    <div style={style} className="z-50 transition-opacity duration-300">
      <div className={`mx-[10%] ${glassmorphismClasses}`}>
        <div className="flex">
          {expertiseData.map((item, index) => (
            <React.Fragment key={index}>
              <NavDropdownItem
                title={item.title}
                link={item.link}
                shortText={item.shortText}
                subItems={item.subItems}
                bottomText={item.bottomText}
              />
              {index < expertiseData.length - 1 && (
                <div className="w-px bg-white/10"></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );

  // The Portal logic remains the same
  const portalContainer = typeof document !== 'undefined' 
    ? document.getElementById('dropdown-portal') 
    : null;

  if (portalContainer) {
    // We only render the desktop version in the portal
    return createPortal(isMobile ? null : dropdownContent, portalContainer);
  }

  return null;
};

export default NavDropdown;