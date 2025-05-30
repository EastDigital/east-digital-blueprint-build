
import React from 'react';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import { Button } from '@/components/ui/button';
import { Camera, MapPin, Video, CheckCircle } from 'lucide-react';

const DroneVideography = () => {
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
              backgroundImage: "url('https://images.unsplash.com/photo-1487887235947-a955ef187fcc?w=1920&h=1080&fit=crop&crop=center')",
              backgroundPosition: 'center 40%'
            }}
          ></div>
          
          {/* Overlay for readability */}
          <div className="absolute inset-0 bg-black/70"></div>
          
          <div className="relative z-10 container mx-auto px-4 text-center py-8 sm:py-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-white font-poppins tracking-tight">
              DRONE VIDEOGRAPHY
            </h1>
            <p className="text-base sm:text-xl lg:text-2xl text-white/90 max-w-4xl mx-auto mb-6 sm:mb-8 px-2 sm:px-4 leading-relaxed">
              Capture stunning aerial footage that showcases properties from unique perspectives
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
                Professional Aerial Cinematography
              </h2>
              <p className="text-eastdigital-lightgray mb-6 leading-relaxed text-lg">
                Our professional drone videography services capture breathtaking aerial footage that showcases properties, developments, and locations from stunning perspectives that traditional photography simply cannot achieve. We highlight location advantages and property scale like never before.
              </p>
              <ul className="space-y-3 text-eastdigital-lightgray">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-eastdigital-orange mt-1 mr-3 flex-shrink-0" />
                  <span>4K Ultra HD aerial photography and videography</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-eastdigital-orange mt-1 mr-3 flex-shrink-0" />
                  <span>Cinematic video production with professional editing</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-eastdigital-orange mt-1 mr-3 flex-shrink-0" />
                  <span>Location context shots and neighborhood overviews</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-eastdigital-orange mt-1 mr-3 flex-shrink-0" />
                  <span>Licensed and insured drone operations</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8">
              <Camera className="h-12 w-12 text-eastdigital-orange mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">What You Get</h3>
              <ul className="space-y-3 text-eastdigital-lightgray">
                <li>• High-resolution aerial photos and videos</li>
                <li>• Multiple flight patterns and angles</li>
                <li>• Professional color grading and editing</li>
                <li>• Raw footage + edited final versions</li>
                <li>• Quick turnaround and delivery</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Equipment & Capabilities */}
        <section className="container mx-auto px-4 py-16" style={{ backgroundColor: '#222222' }}>
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Professional Equipment & Capabilities
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8 text-center">
              <Camera className="h-12 w-12 text-eastdigital-orange mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-4">4K Camera Systems</h3>
              <p className="text-eastdigital-lightgray">
                Professional-grade drones equipped with 4K cameras, gimbal stabilization, and high-quality lenses for crystal-clear footage.
              </p>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8 text-center">
              <MapPin className="h-12 w-12 text-eastdigital-orange mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-4">Licensed Operations</h3>
              <p className="text-eastdigital-lightgray">
                Fully licensed Part 107 certified pilots with comprehensive insurance coverage for safe and legal operations.
              </p>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8 text-center">
              <Video className="h-12 w-12 text-eastdigital-orange mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-4">Cinematic Production</h3>
              <p className="text-eastdigital-lightgray">
                Professional post-production with color grading, audio enhancement, and cinematic editing for polished final videos.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-16" style={{ backgroundColor: '#141414' }}>
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to Showcase from Above?
            </h2>
            <p className="text-xl text-eastdigital-lightgray mb-8 max-w-2xl mx-auto">
              Let's capture stunning aerial footage that highlights your property's best features and creates compelling visual content for your marketing campaigns.
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

export default DroneVideography;
