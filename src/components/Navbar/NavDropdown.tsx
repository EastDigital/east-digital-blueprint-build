
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

  if (isMobile) {
    return (
      <div 
        ref={dropdownRef}
        className="bg-[#1A1A1A]/80 backdrop-blur-md rounded-[15px] border border-gray-800/30 shadow-2xl overflow-hidden animate-fade-in"
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
                <div className="md:w-px md:bg-gray-700/50 h-px md:h-auto bg-gray-700/50 mx-6 md:mx-0"></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={dropdownRef}
      className="w-full"
    >
      {/* Seamless connection area - no gap */}
      <div className="h-0"></div>
      
      {/* Dropdown content with glassmorphism that continues from button */}
      <div className="mx-[10%]">
        <div className="bg-[#1A1A1A]/80 backdrop-blur-md rounded-b-[15px] border border-gray-800/30 shadow-2xl overflow-hidden">
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
  );
};

export default NavDropdown;
