
import React from 'react';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import { Button } from '@/components/ui/button';
import { Play, Video, Camera, CheckCircle } from 'lucide-react';

const ArchitecturalWalkthrough = () => {
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
              backgroundImage: "url('https://images.unsplash.com/photo-1433832597046-4f10e10ac764?w=1920&h=1080&fit=crop&crop=center')",
              backgroundPosition: 'center 40%'
            }}
          ></div>
          
          {/* Overlay for readability */}
          <div className="absolute inset-0 bg-black/70"></div>
          
          <div className="relative z-10 container mx-auto px-4 text-center py-8 sm:py-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-white font-poppins tracking-tight">
              ARCHITECTURAL WALKTHROUGH VIDEOS
            </h1>
            <p className="text-base sm:text-xl lg:text-2xl text-white/90 max-w-4xl mx-auto mb-6 sm:mb-8 px-2 sm:px-4 leading-relaxed">
              Create immersive video tours that allow clients to experience spaces before they're built
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
                Cinematic Architectural Tours
              </h2>
              <p className="text-eastdigital-lightgray mb-6 leading-relaxed text-lg">
                Our architectural walkthrough videos provide immersive experiences that let your clients explore and understand spaces in ways static images cannot. With smooth camera movements and cinematic quality, we create compelling visual stories.
              </p>
              <ul className="space-y-3 text-eastdigital-lightgray">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-eastdigital-orange mt-1 mr-3 flex-shrink-0" />
                  <span>Cinematic quality 4K video production</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-eastdigital-orange mt-1 mr-3 flex-shrink-0" />
                  <span>Smooth professional camera movements</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-eastdigital-orange mt-1 mr-3 flex-shrink-0" />
                  <span>Ambient sound design and music</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-eastdigital-orange mt-1 mr-3 flex-shrink-0" />
                  <span>Multiple viewing perspectives</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8">
              <Play className="h-12 w-12 text-eastdigital-orange mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">Video Features</h3>
              <ul className="space-y-3 text-eastdigital-lightgray">
                <li>• 4K Ultra HD resolution</li>
                <li>• Professional color grading</li>
                <li>• Custom soundtrack options</li>
                <li>• Multiple export formats</li>
                <li>• Branded intro/outro sequences</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="container mx-auto px-4 py-16" style={{ backgroundColor: '#222222' }}>
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Why Choose Video Walkthroughs?
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8 text-center">
              <Video className="h-12 w-12 text-eastdigital-orange mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-4">Enhanced Engagement</h3>
              <p className="text-eastdigital-lightgray">
                Video content increases viewer engagement by 300% compared to static images, keeping potential clients interested longer.
              </p>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8 text-center">
              <Camera className="h-12 w-12 text-eastdigital-orange mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-4">Better Understanding</h3>
              <p className="text-eastdigital-lightgray">
                Moving through spaces helps clients understand scale, flow, and spatial relationships in ways photos cannot convey.
              </p>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8 text-center">
              <Play className="h-12 w-12 text-eastdigital-orange mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-4">Marketing Power</h3>
              <p className="text-eastdigital-lightgray">
                Professional videos significantly boost marketing effectiveness and can be shared across multiple platforms easily.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-16" style={{ backgroundColor: '#141414' }}>
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to Create Immersive Experiences?
            </h2>
            <p className="text-xl text-eastdigital-lightgray mb-8 max-w-2xl mx-auto">
              Let's produce captivating walkthrough videos that tell your architectural story and engage your audience like never before.
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

export default ArchitecturalWalkthrough;
