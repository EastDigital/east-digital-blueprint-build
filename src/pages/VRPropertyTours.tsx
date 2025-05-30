
import React from 'react';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import { Button } from '@/components/ui/button';
import { Headphones, Smartphone, Monitor, CheckCircle } from 'lucide-react';

const VRPropertyTours = () => {
  return (
    <div className="min-h-screen flex flex-col bg-eastdigital-dark">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-[70vh] sm:min-h-[60vh] lg:min-h-[80vh] flex items-center justify-center overflow-hidden">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1460574283810-2aab119d8511?w=1920&h=1080&fit=crop&crop=center')",
              backgroundPosition: 'center 40%'
            }}
          ></div>
          
          {/* Overlay for readability */}
          <div className="absolute inset-0 bg-black/70"></div>
          
          <div className="relative z-10 container mx-auto px-4 text-center py-8 sm:py-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-white font-poppins tracking-tight">
              VR-READY PROPERTY TOURS
            </h1>
            <p className="text-base sm:text-xl lg:text-2xl text-white/90 max-w-4xl mx-auto mb-6 sm:mb-8 px-2 sm:px-4 leading-relaxed">
              Develop cutting-edge virtual reality experiences for complete immersion in unbuilt spaces
            </p>
            <Button className="bg-eastdigital-orange hover:bg-eastdigital-orange/90 text-white px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg rounded-[60px]">
              Start Your Project
            </Button>
          </div>
        </section>

        {/* Service Details */}
        <section className="container mx-auto px-4 py-16" style={{ backgroundColor: '#141414' }}>
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                Next-Generation VR Experiences
              </h2>
              <p className="text-eastdigital-lightgray mb-6 leading-relaxed text-lg">
                Step into the future with our VR-ready property tours that provide complete immersion in architectural spaces. Using cutting-edge VR technology, we create interactive experiences that allow users to walk through and explore properties as if they were physically there.
              </p>
              <ul className="space-y-3 text-eastdigital-lightgray">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-eastdigital-orange mt-1 mr-3 flex-shrink-0" />
                  <span>Interactive VR experiences with real-time navigation</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-eastdigital-orange mt-1 mr-3 flex-shrink-0" />
                  <span>Cross-platform compatibility (PC, Mobile, VR headsets)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-eastdigital-orange mt-1 mr-3 flex-shrink-0" />
                  <span>Customizable elements and interactive hotspots</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-eastdigital-orange mt-1 mr-3 flex-shrink-0" />
                  <span>High-quality spatial audio integration</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8">
              <Headphones className="h-12 w-12 text-eastdigital-orange mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">VR Features</h3>
              <ul className="space-y-3 text-eastdigital-lightgray">
                <li>• Oculus, Vive, and mobile VR support</li>
                <li>• 360-degree immersive environments</li>
                <li>• Interactive object manipulation</li>
                <li>• Multi-user virtual meetings</li>
                <li>• Analytics and user behavior tracking</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Technology Stack */}
        <section className="container mx-auto px-4 py-16" style={{ backgroundColor: '#222222' }}>
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Cutting-Edge VR Technology
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8 text-center">
              <Headphones className="h-12 w-12 text-eastdigital-orange mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-4">VR Headset Compatible</h3>
              <p className="text-eastdigital-lightgray">
                Full compatibility with Oculus Quest, HTC Vive, PlayStation VR, and other major VR platforms.
              </p>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8 text-center">
              <Smartphone className="h-12 w-12 text-eastdigital-orange mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-4">Mobile VR Ready</h3>
              <p className="text-eastdigital-lightgray">
                Experience tours on smartphones with Google Cardboard, Samsung Gear VR, and other mobile VR solutions.
              </p>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8 text-center">
              <Monitor className="h-12 w-12 text-eastdigital-orange mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-4">Web-Based Access</h3>
              <p className="text-eastdigital-lightgray">
                Access tours directly through web browsers without requiring special software installation.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-16" style={{ backgroundColor: '#141414' }}>
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to Enter the Future of Property Tours?
            </h2>
            <p className="text-xl text-eastdigital-lightgray mb-8 max-w-2xl mx-auto">
              Let's create revolutionary VR experiences that transport your clients into their future spaces and transform how properties are showcased.
            </p>
            <Button className="bg-eastdigital-orange hover:bg-eastdigital-orange/90 text-white px-8 py-3 text-lg rounded-[60px]">
              Get Your Blueprint
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default VRPropertyTours;
