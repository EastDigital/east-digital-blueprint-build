
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Phone, ArrowUp } from 'lucide-react';

const Footer = () => {
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigation = (path) => {
    console.log('Footer navigation to:', path);
    navigate(path);
  };

  return (
    <footer className="bg-black text-white py-16 lg:py-20">
      <div className="container mx-auto px-4">
        {/* Main CTA Section */}
        <div className="text-center mb-16">
          <p className="text-gray-400 text-lg mb-4">Let's Talk</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 max-w-4xl mx-auto leading-tight">
            Your Digital Presence<br />
            Is About To Take Off
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Schedule a free consultation with our team<br />
            or generate costing by yourself.
          </p>
          <button 
            onClick={() => handleNavigation('/connect')}
            className="bg-eastdigital-orange hover:bg-eastdigital-orange/90 text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 hover:scale-105 cursor-pointer"
          >
            Get Started
          </button>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 pb-8 border-b border-gray-800">
          <div className="flex items-center mb-4 md:mb-0">
            <MapPin className="h-5 w-5 text-eastdigital-orange mr-2" />
            <span className="text-gray-400 text-sm">
              2nd Floor, JSV Hyundai Building, Near Engineering College, Lucknow, Uttar Pradesh, INDIA - 226021
            </span>
          </div>
          <div className="flex items-center">
            <Phone className="h-5 w-5 text-eastdigital-orange mr-2" />
            <span className="text-eastdigital-orange font-semibold">+91-99105 68689</span>
            <span className="text-gray-400 text-sm ml-4">GST No. 07ABCDE1234F2Z5</span>
          </div>
        </div>

        {/* Services Sections */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 mb-12">
          {/* 3D Rendering Section */}
          <div>
            <h3 className="text-eastdigital-orange font-bold text-lg mb-4">3D RENDERING & VISUALIZATION</h3>
            <p className="text-gray-400 text-sm mb-6">
              Bring Your Architectural Visions to Life<br />
              with Photo-Realistic Precision.
            </p>
            <ul className="space-y-3">
              <li className="text-white font-medium">Architectural 3d Rendering</li>
              <li className="text-white font-medium">Architectural Walkthrough Videos</li>
              <li className="text-white font-medium">VR-Ready Property Tours</li>
            </ul>
            <p className="text-gray-400 text-sm mt-6">
              Ideal for: Developers, Architects, & Engineers<br />
              to visualize and present projects.
            </p>
          </div>

          {/* Digital Campaigns Section */}
          <div>
            <h3 className="text-eastdigital-orange font-bold text-lg mb-4">REAL ESTATE DIGITAL CAMPAIGNS</h3>
            <p className="text-gray-400 text-sm mb-6">
              Drive Leads & Sales with Strategic<br />
              Digital Campaigns.
            </p>
            <ul className="space-y-3">
              <li className="text-white font-medium">Targeted Facebook & Google Ads</li>
              <li className="text-white font-medium">Drone Videography</li>
              <li className="text-white font-medium">Broker & Investor Outreach</li>
            </ul>
            <p className="text-gray-400 text-sm mt-6">
              Ideal for: Developers & Brokers to generate leads<br />
              and drive property sales.
            </p>
          </div>

          {/* Corporate Solutions Section */}
          <div>
            <h3 className="text-eastdigital-orange font-bold text-lg mb-4">CORPORATE SOLUTIONS</h3>
            <p className="text-gray-400 text-sm mb-6">
              Elevate Your Brand and Connect<br />
              with Your Audience.
            </p>
            <ul className="space-y-3">
              <li className="text-white font-medium">Brand Identity Design</li>
              <li className="text-white font-medium">UI/UX Design</li>
              <li className="text-white font-medium">Web & Apps</li>
            </ul>
            <p className="text-gray-400 text-sm mt-6">
              Ideal for: Companies building strong<br />
              brands & digital platforms.
            </p>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-800">
          {/* Logo and Navigation */}
          <div className="flex items-center space-x-8 mb-6 md:mb-0">
            <button onClick={() => handleNavigation('/')} className="flex items-center cursor-pointer">
              <div className="w-8 h-8 rounded-full border-2 border-eastdigital-orange mr-3">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-eastdigital-orange to-orange-600"></div>
              </div>
              <span className="text-xl font-bold">EAST DIGITAL</span>
            </button>
            
            <nav className="hidden md:flex space-x-6">
              <button onClick={() => handleNavigation('/')} className="text-gray-400 hover:text-white transition-colors cursor-pointer">Home</button>
              <button onClick={() => handleNavigation('/3d-rendering-visualization')} className="text-gray-400 hover:text-white transition-colors cursor-pointer">Expertise</button>
              <button onClick={() => handleNavigation('/impact')} className="text-gray-400 hover:text-white transition-colors cursor-pointer">Impact</button>
              <button onClick={() => handleNavigation('/approach')} className="text-gray-400 hover:text-white transition-colors cursor-pointer">Approach</button>
              <button onClick={() => handleNavigation('/connect')} className="text-gray-400 hover:text-white transition-colors cursor-pointer">Connect</button>
            </nav>
          </div>

          {/* Social Icons and Scroll Top */}
          <div className="flex items-center space-x-4">
            <div className="flex space-x-3">
              <a href="#" className="w-8 h-8 bg-gray-800 rounded hover:bg-eastdigital-orange transition-colors flex items-center justify-center">
                <span className="text-white text-sm">▶</span>
              </a>
              <a href="#" className="w-8 h-8 bg-gray-800 rounded hover:bg-eastdigital-orange transition-colors flex items-center justify-center">
                <span className="text-white text-sm">in</span>
              </a>
              <a href="#" className="w-8 h-8 bg-gray-800 rounded hover:bg-eastdigital-orange transition-colors flex items-center justify-center">
                <span className="text-white text-sm">X</span>
              </a>
              <a href="#" className="w-8 h-8 bg-gray-800 rounded hover:bg-eastdigital-orange transition-colors flex items-center justify-center">
                <span className="text-white text-sm">📷</span>
              </a>
            </div>
            
            <button
              onClick={scrollToTop}
              className="w-10 h-10 bg-eastdigital-orange rounded-full hover:bg-eastdigital-orange/80 transition-colors flex items-center justify-center ml-4 cursor-pointer"
            >
              <ArrowUp className="h-5 w-5 text-white" />
            </button>
          </div>
        </div>

        {/* Copyright and Links */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-8 pt-6 border-t border-gray-800 text-sm text-gray-400">
          <div>© 2025 East Digital.</div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <button onClick={() => handleNavigation('/terms')} className="hover:text-white transition-colors cursor-pointer">Terms Of Use</button>
            <button onClick={() => handleNavigation('/privacy')} className="hover:text-white transition-colors cursor-pointer">Privacy Policy</button>
            <button onClick={() => handleNavigation('/sitemap')} className="hover:text-white transition-colors cursor-pointer">Sitemap</button>
            <button onClick={() => handleNavigation('/admin')} className="hover:text-eastdigital-orange transition-colors font-medium cursor-pointer">Login/Admin</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
