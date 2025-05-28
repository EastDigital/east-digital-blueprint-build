
import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import NavDropdownItem from './NavDropdownItem';

interface NavDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NavDropdown = ({ isOpen, onClose }: NavDropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const expertiseData = [
    {
      title: "3D RENDERING & VISUALIZATION",
      link: "/3d-rendering-visualization",
      shortText: "Bring Your Architectural Visions to Life with Photo-Realistic Precision.",
      subItems: [
        { title: "Architectural 3D Rendering", anchor: "#architectural-3d-rendering" },
        { title: "Architectural Walkthrough Videos", anchor: "#architectural-walkthrough-videos" },
        { title: "VR-Ready Property Tours", anchor: "#vr-ready-property-tours" }
      ],
      bottomText: "Ideal for: Developers, Architects, & Engineers to visualize and present projects."
    },
    {
      title: "REAL ESTATE DIGITAL CAMPAIGNS",
      link: "/real-estate-digital-campaigns",
      shortText: "Drive Leads & Sales with Strategic Digital Campaigns.",
      subItems: [
        { title: "Targeted Facebook & Google Ads", anchor: "#targeted-ads" },
        { title: "Drone Videography", anchor: "#drone-videography" },
        { title: "Broker & Investor Outreach", anchor: "#broker-investor-outreach" }
      ],
      bottomText: "Ideal for: Developers & Brokers to generate leads and drive property sales."
    },
    {
      title: "CORPORATE SOLUTIONS",
      link: "/corporate-solutions",
      shortText: "Elevate Your Brand and Connect with Your Audience.",
      subItems: [
        { title: "Brand Identity Design", anchor: "#brand-identity-design" },
        { title: "UI/UX Design", anchor: "#ui-ux-design" },
        { title: "Web & Apps", anchor: "#web-apps" }
      ],
      bottomText: "Ideal for: Companies building strong brands & digital platforms."
    }
  ];

  return (
    <div 
      ref={dropdownRef}
      className="fixed top-full left-0 right-0 w-full z-50 animate-fade-in"
      style={{ left: '10%', right: '10%', width: '80%' }}
    >
      <div className="rounded-[15px] bg-[#0E0E0E] bg-opacity-95 backdrop-blur-md shadow-lg border border-gray-800/50">
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
                <div className="w-px bg-gray-800/50"></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavDropdown;
