
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

  // Enhanced glassmorphism with better readability
  const glassmorphismClasses = "bg-eastdigital-dark/90 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl overflow-hidden";

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
                <div className="md:w-px md:bg-white/20 h-px md:h-auto bg-white/20 mx-6 md:mx-0"></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div ref={dropdownRef} className="w-full">
      {/* Enhanced glassmorphism background with better contrast */}
      <div className={`mx-[10%] ${glassmorphismClasses}`}>
        {/* Enhanced content background for better readability */}
        <div className="bg-gradient-to-br from-eastdigital-dark/95 via-eastdigital-dark/90 to-eastdigital-dark/95 backdrop-blur-xl">
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
                  <div className="w-px bg-white/20"></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
        
        {/* Enhanced liquid glass reflection */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-eastdigital-orange/40 to-transparent"></div>
      </div>
    </div>
  );
};

export default NavDropdown;
