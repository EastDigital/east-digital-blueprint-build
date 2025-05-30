
import React from 'react';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import { Button } from '@/components/ui/button';
import { Eye, Camera, Palette, CheckCircle } from 'lucide-react';

const ArchitecturalRendering = () => {
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
              backgroundImage: "url('https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1920&h=1080&fit=crop&crop=center')",
              backgroundPosition: 'center 40%'
            }}
          ></div>
          
          {/* Overlay for readability */}
          <div className="absolute inset-0 bg-black/70"></div>
          
          <div className="relative z-10 container mx-auto px-4 text-center py-8 sm:py-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-white font-poppins tracking-tight">
              ARCHITECTURAL 3D RENDERING
            </h1>
            <p className="text-base sm:text-xl lg:text-2xl text-white/90 max-w-4xl mx-auto mb-6 sm:mb-8 px-2 sm:px-4 leading-relaxed">
              Transform blueprints into stunning photorealistic images that showcase every detail with precision
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
                Photorealistic Architectural Visualization
              </h2>
              <p className="text-eastdigital-lightgray mb-6 leading-relaxed text-lg">
                Our architectural 3D rendering service transforms your blueprints and design concepts into stunning, photorealistic images that bring your vision to life. We use cutting-edge rendering technology to create images that are indistinguishable from real photographs.
              </p>
              <ul className="space-y-3 text-eastdigital-lightgray">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-eastdigital-orange mt-1 mr-3 flex-shrink-0" />
                  <span>High-resolution exterior and interior renderings</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-eastdigital-orange mt-1 mr-3 flex-shrink-0" />
                  <span>Day and night scene variations</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-eastdigital-orange mt-1 mr-3 flex-shrink-0" />
                  <span>Multiple angle views and perspectives</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-eastdigital-orange mt-1 mr-3 flex-shrink-0" />
                  <span>Realistic lighting and material textures</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8">
              <Eye className="h-12 w-12 text-eastdigital-orange mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">What You Get</h3>
              <ul className="space-y-3 text-eastdigital-lightgray">
                <li>• Ultra-high resolution images (up to 8K)</li>
                <li>• Multiple revisions included</li>
                <li>• Various formats (JPEG, PNG, TIFF)</li>
                <li>• Fast turnaround time</li>
                <li>• Professional quality assurance</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="container mx-auto px-4 py-16" style={{ backgroundColor: '#222222' }}>
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Our Rendering Process
            </h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-eastdigital-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Brief & Planning</h3>
              <p className="text-eastdigital-lightgray">We analyze your blueprints and understand your vision</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-eastdigital-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">3D Modeling</h3>
              <p className="text-eastdigital-lightgray">Creating accurate 3D models from your designs</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-eastdigital-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Rendering</h3>
              <p className="text-eastdigital-lightgray">Applying realistic materials, lighting, and textures</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-eastdigital-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">4</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Final Delivery</h3>
              <p className="text-eastdigital-lightgray">Post-processing and delivering final images</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-16" style={{ backgroundColor: '#141414' }}>
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to See Your Design Come to Life?
            </h2>
            <p className="text-xl text-eastdigital-lightgray mb-8 max-w-2xl mx-auto">
              Let's create stunning photorealistic renderings that showcase your architectural vision with incredible detail and precision.
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

export default ArchitecturalRendering;
