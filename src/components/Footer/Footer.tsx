
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Phone, ArrowUp } from 'lucide-react';
import { LiquidGlassCard } from '@/components/LiquidGlass/LiquidGlassCard';
import { LiquidGlassButton } from '@/components/LiquidGlass/LiquidGlassButton';

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

  return (
    <footer className="relative bg-black text-white py-16 lg:py-20 overflow-hidden">
      {/* Liquid Glass Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-gradient-to-br from-eastdigital-orange/10 via-transparent to-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-tl from-blue-500/8 via-eastdigital-orange/5 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Call to Action Section with Liquid Glass */}
        <LiquidGlassCard variant="intense" className="text-center mb-16 p-12 border-2 border-eastdigital-orange/30">
          <div className="relative z-10">
            <p className="text-lg mb-4 text-orange-200">Let's Talk</p>
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 max-w-4xl mx-auto leading-tight text-gray-100 lg:text-4xl">
              Your Digital Presence<br />
              Is About To Take Off
            </h2>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
              Schedule a free consultation with our team<br />
              or generate costing by yourself.
            </p>
            <LiquidGlassButton 
              onClick={() => handleNavigation('/connect')} 
              variant="primary"
              size="lg"
              className="px-8 py-4 text-lg font-medium"
            >
              Get Started
            </LiquidGlassButton>
          </div>
          
          {/* Enhanced Reflection Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-eastdigital-orange/10 rounded-2xl pointer-events-none"></div>
        </LiquidGlassCard>

        {/* Contact Information with Liquid Glass Cards */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 pb-8 border-b border-gradient-to-r from-transparent via-gray-700 to-transparent relative gap-6">
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-eastdigital-orange/30 to-transparent"></div>
          
          {/* Location Card */}
          <LiquidGlassCard variant="subtle" className="flex-1 max-w-md group">
            <div className="flex items-start p-6">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-eastdigital-orange/20 to-eastdigital-orange/10 rounded-xl flex items-center justify-center mr-4 group-hover:from-eastdigital-orange/30 group-hover:to-eastdigital-orange/20 transition-all duration-300 border border-eastdigital-orange/20">
                <MapPin className="h-6 w-6 text-eastdigital-orange group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="flex-1">
                <p className="text-gray-300 text-sm font-medium mb-1 tracking-wide">Our Location</p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  2nd Floor, JSV Hyundai Building, Near Engineering College,<br />
                  <span className="text-gray-300">Lucknow, Uttar Pradesh, INDIA - 226021</span>
                </p>
              </div>
            </div>
          </LiquidGlassCard>

          {/* Contact Cards Container */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
            {/* Phone Card */}
            <LiquidGlassCard variant="subtle" className="group cursor-pointer">
              <div className="flex items-center p-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-500/20 to-green-600/10 rounded-xl flex items-center justify-center mr-3 group-hover:from-green-500/30 group-hover:to-green-600/20 transition-all duration-300 border border-green-500/20">
                  <Phone className="h-6 w-6 text-green-400 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div>
                  <p className="text-gray-300 text-xs font-medium mb-1 tracking-wide">Contact Us</p>
                  <a href="tel:+919910568689" className="text-green-400 font-semibold text-lg hover:text-green-300 transition-colors duration-300">
                    +91-99105 68689
                  </a>
                </div>
              </div>
            </LiquidGlassCard>
            
            <div className="hidden sm:block w-px h-12 bg-gradient-to-b from-transparent via-gray-600 to-transparent"></div>
            
            {/* GST Card */}
            <LiquidGlassCard variant="subtle" className="px-4 py-3">
              <p className="text-gray-400 text-xs font-medium mb-1">GST Number</p>
              <p className="text-gray-300 text-sm font-mono tracking-wider">07ABCDE1234F2Z5</p>
            </LiquidGlassCard>
          </div>
        </div>

        {/* Services Grid with Liquid Glass Cards */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 mb-12">
          {/* 3D Rendering Services */}
          <LiquidGlassCard variant="default" className="p-6 group">
            <div className="relative z-10">
              <h3 className="text-lg mb-4 font-normal text-orange-300 group-hover:text-eastdigital-orange transition-colors duration-300">
                3D RENDERING & VISUALIZATION
              </h3>
              <p className="text-gray-400 text-sm mb-6">
                Bring Your Architectural Visions to Life<br />
                with Photo-Realistic Precision.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="text-white font-medium flex items-center">
                  <div className="w-1.5 h-1.5 bg-eastdigital-orange rounded-full mr-3"></div>
                  Architectural 3d Rendering
                </li>
                <li className="text-white font-medium flex items-center">
                  <div className="w-1.5 h-1.5 bg-eastdigital-orange rounded-full mr-3"></div>
                  Architectural Walkthrough Videos
                </li>
                <li className="text-white font-medium flex items-center">
                  <div className="w-1.5 h-1.5 bg-eastdigital-orange rounded-full mr-3"></div>
                  VR-Ready Property Tours
                </li>
              </ul>
              <p className="text-gray-400 text-sm">
                Ideal for: Developers, Architects, & Engineers<br />
                to visualize and present projects.
              </p>
            </div>
          </LiquidGlassCard>

          {/* Digital Campaigns Services */}
          <LiquidGlassCard variant="default" className="p-6 group">
            <div className="relative z-10">
              <h3 className="text-lg mb-4 font-normal text-orange-300 group-hover:text-eastdigital-orange transition-colors duration-300">
                REAL ESTATE DIGITAL CAMPAIGNS
              </h3>
              <p className="text-gray-400 text-sm mb-6">
                Drive Leads & Sales with Strategic<br />
                Digital Campaigns.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="text-white font-medium flex items-center">
                  <div className="w-1.5 h-1.5 bg-eastdigital-orange rounded-full mr-3"></div>
                  Targeted Facebook & Google Ads
                </li>
                <li className="text-white font-medium flex items-center">
                  <div className="w-1.5 h-1.5 bg-eastdigital-orange rounded-full mr-3"></div>
                  Drone Videography
                </li>
                <li className="text-white font-medium flex items-center">
                  <div className="w-1.5 h-1.5 bg-eastdigital-orange rounded-full mr-3"></div>
                  Broker & Investor Outreach
                </li>
              </ul>
              <p className="text-gray-400 text-sm">
                Ideal for: Developers & Brokers to generate leads<br />
                and drive property sales.
              </p>
            </div>
          </LiquidGlassCard>

          {/* Corporate Solutions */}
          <LiquidGlassCard variant="default" className="p-6 group">
            <div className="relative z-10">
              <h3 className="text-lg mb-4 font-normal text-orange-300 group-hover:text-eastdigital-orange transition-colors duration-300">
                CORPORATE SOLUTIONS
              </h3>
              <p className="text-gray-400 text-sm mb-6">
                Elevate Your Brand and Connect<br />
                with Your Audience.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="text-white font-medium flex items-center">
                  <div className="w-1.5 h-1.5 bg-eastdigital-orange rounded-full mr-3"></div>
                  Brand Identity Design
                </li>
                <li className="text-white font-medium flex items-center">
                  <div className="w-1.5 h-1.5 bg-eastdigital-orange rounded-full mr-3"></div>
                  UI/UX Design
                </li>
                <li className="text-white font-medium flex items-center">
                  <div className="w-1.5 h-1.5 bg-eastdigital-orange rounded-full mr-3"></div>
                  Web & Apps
                </li>
              </ul>
              <p className="text-gray-400 text-sm">
                Ideal for: Companies building strong<br />
                brands & digital platforms.
              </p>
            </div>
          </LiquidGlassCard>
        </div>

        {/* Bottom Navigation and Social */}
        <LiquidGlassCard variant="subtle" className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
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
                <LiquidGlassButton variant="ghost" size="sm" className="w-8 h-8 p-0">
                  <span className="text-white text-sm">▶</span>
                </LiquidGlassButton>
                <LiquidGlassButton variant="ghost" size="sm" className="w-8 h-8 p-0">
                  <span className="text-white text-sm">in</span>
                </LiquidGlassButton>
                <LiquidGlassButton variant="ghost" size="sm" className="w-8 h-8 p-0">
                  <span className="text-white text-sm">X</span>
                </LiquidGlassButton>
                <LiquidGlassButton variant="ghost" size="sm" className="w-8 h-8 p-0">
                  <span className="text-white text-sm">📷</span>
                </LiquidGlassButton>
              </div>
              
              <LiquidGlassButton 
                onClick={scrollToTop} 
                variant="primary"
                size="sm"
                className="w-10 h-10 p-0 rounded-full ml-4"
              >
                <ArrowUp className="h-5 w-5 text-white" />
              </LiquidGlassButton>
            </div>
          </div>
        </LiquidGlassCard>

        {/* Copyright and Legal Links */}
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
