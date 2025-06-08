import React, { useRef } from 'react';
import { createPortal } from 'react-dom';
import NavDropdownItem from './NavDropdownItem';

interface NavDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  isMobile?: boolean;
  onItemClick?: () => void;
}

export const NavDropdown = ({ isOpen, onClose, isMobile = false, onItemClick }: NavDropdownProps) => {
  if (!isOpen) {
    return null;
  }

  // This is the actual content of your dropdown.
  // It will be "teleported" into the portal div.
  const dropdownContent = (
    <div className="w-full absolute top-full left-0 right-0">
      <div className={`mx-[10%] bg-black/70 backdrop-blur-lg rounded-2xl border border-white/10 shadow-2xl overflow-hidden`}>
        {/* Your original mapping logic for expertiseData goes here */}
        {/* I'm putting a placeholder here to keep the example clean */}
        <div className="flex p-4">
          <p className="text-white">Desktop Dropdown Content</p>
        </div>
      </div>
    </div>
  );

  const mobileDropdownContent = (
    <div className={`bg-black/70 backdrop-blur-lg rounded-2xl border border-white/10 shadow-2xl overflow-hidden animate-fade-in`}>
      {/* Your original mapping logic for expertiseData goes here for mobile */}
       <div className="flex p-4">
          <p className="text-white">Mobile Dropdown Content</p>
        </div>
    </div>
  );

  // Find the portal container in the document
  const portalContainer = typeof document !== 'undefined' 
    ? document.getElementById('dropdown-portal') 
    : null;

  // Only attempt to create a portal if the container exists
  if (portalContainer) {
    return createPortal(
      isMobile ? mobileDropdownContent : dropdownContent,
      portalContainer
    );
  }

  // Fallback if the portal container is not found for some reason
  return null;
};

export default NavDropdown;