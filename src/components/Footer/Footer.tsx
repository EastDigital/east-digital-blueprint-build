import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Phone, ArrowUp } from 'lucide-react';
const Footer = () => {
  const navigate = useNavigate();
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  const handleNavigation = (path: string) => {
    navigate(path);
  };
  return <footer className="bg-black text-white py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-lg mb-4 text-orange-200">Let's Talk</p>
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 max-w-4xl mx-auto leading-tight text-gray-100 lg:text-4xl">
            Your Digital Presence<br />
            Is About To Take Off
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Schedule a free consultation with our team<br />
            or generate costing by yourself.
          </p>
          <button onClick={() => handleNavigation('/connect')} className="bg-eastdigital-orange hover:bg-eastdigital-orange/90 text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 hover:scale-105 cursor-pointer">
            Get Started
          </button>
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 pb-8 border-b border-gradient-to-r from-transparent via-gray-700 to-transparent relative">
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-eastdigital-orange/30 to-transparent"></div>
          
          <div className="flex items-start mb-6 lg:mb-0 group">
            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-eastdigital-orange/20 to-eastdigital-orange/10 rounded-xl flex items-center justify-center mr-4 group-hover:from-eastdigital-orange/30 group-hover:to-eastdigital-orange/20 transition-all duration-300">
              <MapPin className="h-6 w-6 text-eastdigital-orange group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div className="flex-1">
              <p className="text-gray-300 text-sm font-medium mb-1 tracking-wide">Our Location</p>
              <p className="text-gray-400 text-sm leading-relaxed max-w-md">
                2nd Floor, JSV Hyundai Building, Near Engineering College,<br />
                <span className="text-gray-300">Lucknow, Uttar Pradesh, INDIA - 226021</span>
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-8">
            <div className="flex items-center group cursor-pointer">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-500/20 to-green-600/10 rounded-xl flex items-center justify-center mr-3 group-hover:from-green-500/30 group-hover:to-green-600/20 transition-all duration-300">
                <Phone className="h-6 w-6 text-green-400 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div>
                <p className="text-gray-300 text-xs font-medium mb-1 tracking-wide">Contact Us</p>
                <a href="tel:+919910568689" className="text-green-400 font-semibold text-lg hover:text-green-300 transition-colors duration-300">
                  +91-99105 68689
                </a>
              </div>
            </div>
            
            <div className="hidden sm:block w-px h-12 bg-gradient-to-b from-transparent via-gray-600 to-transparent"></div>
            
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg px-4 py-2 border border-gray-700/50">
              <p className="text-gray-400 text-xs font-medium mb-1">GST Number</p>
              <p className="text-gray-300 text-sm font-mono tracking-wider">07ABCDE1234F2Z5</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 mb-12">
          <div>
            <h3 className="text-lg mb-4 font-normal text-orange-300">3D RENDERING & VISUALIZATION</h3>
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

          <div>
            <h3 className="text-lg mb-4 font-normal text-orange-300">REAL ESTATE DIGITAL CAMPAIGNS</h3>
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

          <div>
            <h3 className="text-lg mb-4 font-normal text-orange-300">CORPORATE SOLUTIONS</h3>
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

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-800">
          <div className="flex items-center space-x-8 mb-6 md:mb-0">
            
            
            <nav className="hidden md:flex space-x-6">
              <button onClick={() => handleNavigation('/')} className="text-gray-400 hover:text-white transition-colors cursor-pointer">Home</button>
              <button onClick={() => handleNavigation('/3d-rendering-visualization')} className="text-gray-400 hover:text-white transition-colors cursor-pointer">Expertise</button>
              <button onClick={() => handleNavigation('/impact')} className="text-gray-400 hover:text-white transition-colors cursor-pointer">Impact</button>
              <button onClick={() => handleNavigation('/approach')} className="text-gray-400 hover:text-white transition-colors cursor-pointer">Approach</button>
              <button onClick={() => handleNavigation('/connect')} className="text-gray-400 hover:text-white transition-colors cursor-pointer">Connect</button>
            </nav>
          </div>

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
            
            <button onClick={scrollToTop} className="w-10 h-10 bg-eastdigital-orange rounded-full hover:bg-eastdigital-orange/80 transition-colors flex items-center justify-center ml-4 cursor-pointer">
              <ArrowUp className="h-5 w-5 text-white" />
            </button>
          </div>
        </div>

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
    </footer>;
};
export default Footer;