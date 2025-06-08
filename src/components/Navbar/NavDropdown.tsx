import React, { useRef } from 'react';
import NavDropdownItem from './NavDropdownItem';

interface NavDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  isMobile?: boolean;
  onItemClick?: () => void;
}

export const NavDropdown = ({ isOpen, onClose, isMobile = false, onItemClick }: NavDropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const expertiseData = [
    {
      title: "3D RENDERING & VISUALIZATION",
      link: "/3d-rendering-visualization",
      shortText: "Bring Your Architectural Visions to Life with Photo-Realistic Precision.",
      subItems: [
        { title: "Architectural 3D Rendering", anchor: "/architectural-rendering" },
        { title: "Architectural Walkthrough Videos", anchor: "/architectural-walkthrough" },
        { title: "VR-Ready Property Tours", anchor: "/vr-property-tours" }
      ],
      bottomText: "Ideal for: Developers, Architects, & Engineers to visualize and present projects."
    },
    {
      title: "REAL ESTATE DIGITAL CAMPAIGNS",
      link: "/real-estate-digital-campaigns",
      shortText: "Drive Leads & Sales with Strategic Digital Campaigns.",
      subItems: [
        { title: "Targeted Facebook & Google Ads", anchor: "/targeted-ads" },
        { title: "Drone Videography", anchor: "/drone-videography" },
        { title: "Broker & Investor Outreach", anchor: "/broker-outreach" }
      ],
      bottomText: "Ideal for: Developers & Brokers to generate leads and drive property sales."
    },
    {
      title: "CORPORATE SOLUTIONS",
      link: "/corporate-solutions",
      shortText: "Elevate Your Brand and Connect with Your Audience.",
      subItems: [
        { title: "Brand Identity Design", anchor: "/brand-identity-design" },
        { title: "UI/UX Design", anchor: "/ui-ux-design" },
        { title: "Web & Apps", anchor: "/web-apps" }
      ],
      bottomText: "Ideal for: Companies building strong brands & digital platforms."
    }
  ];

  // Enhanced glassmorphism classes that match the navbar background
  const glassmorphismClasses = "bg-eastdigital-dark/95 backdrop-blur-md border border-white/10 shadow-2xl rounded-2xl overflow-hidden";

  if (isMobile) {
    return (
      <div 
        ref={dropdownRef}
        className={`${glassmorphismClasses} animate-fade-in`}
      >
        <div className="flex flex-col md:flex-row">
          {expertiseData.map((item, index) => (
            <React.Fragment key={index}>
              <NavDropdownItem
                title={item.title}
                link={item.link}
                shortText={item.shortText}
                subItems={item.subItems}
                bottomText={item.bottomText}
                isMobile={true}
                onItemClick={onItemClick}
              />
              {index < expertiseData.length - 1 && (
                <div className="md:w-px md:bg-white/10 h-px md:h-auto bg-white/10 mx-6 md:mx-0"></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div ref={dropdownRef} className="w-full">
      {/* Enhanced glassmorphism background that matches navbar styling */}
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
};

export default NavDropdown;
