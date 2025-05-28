
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
      className="fixed top-[84px] left-0 right-0 z-50 animate-fade-in"
    >
      {/* Bridge area to prevent gap hover issues */}
      <div className="h-[5px] w-full"></div>
      
      {/* Edge-to-edge glassmorphism background */}
      <div className="w-full bg-[#0E0E0E] bg-opacity-90 backdrop-blur-md">
        {/* Content container with full width */}
        <div className="w-full">
          <div className="bg-[#0E0E0E]/90 backdrop-blur-md rounded-[15px] mx-[10%] border border-gray-800/30 shadow-2xl overflow-hidden">
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
                    <div className="w-px bg-gray-700/50"></div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavDropdown;
