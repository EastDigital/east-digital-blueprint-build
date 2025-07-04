
import React from 'react';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import { Button } from '@/components/ui/button';
import { Palette, Pen, Award, CheckCircle } from 'lucide-react';

const BrandIdentityDesign = () => {
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
              backgroundImage: "url('https://images.unsplash.com/photo-1473091534298-04dcbce3278c?w=1920&h=1080&fit=crop&crop=center')",
              backgroundPosition: 'center 40%'
            }}
          ></div>
          
          {/* Overlay for readability */}
          <div className="absolute inset-0 bg-black/70"></div>
          
          <div className="relative z-10 container mx-auto px-4 text-center py-8 sm:py-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-white font-poppins tracking-tight">
              BRAND IDENTITY DESIGN
            </h1>
            <p className="text-base sm:text-xl lg:text-2xl text-white/90 max-w-4xl mx-auto mb-6 sm:mb-8 px-2 sm:px-4 leading-relaxed">
              Create compelling brand identities that resonate with your audience and differentiate from competitors
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
                Distinctive Brand Identity Creation
              </h2>
              <p className="text-eastdigital-lightgray mb-6 leading-relaxed text-lg">
                We create powerful brand identities that capture the essence of your business and communicate your values effectively. Our comprehensive approach ensures your brand stands out in the marketplace and builds lasting connections with your audience.
              </p>
              <ul className="space-y-3 text-eastdigital-lightgray">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-eastdigital-orange mt-1 mr-3 flex-shrink-0" />
                  <span>Custom logo design and brand mark creation</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-eastdigital-orange mt-1 mr-3 flex-shrink-0" />
                  <span>Comprehensive brand guidelines and style guides</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-eastdigital-orange mt-1 mr-3 flex-shrink-0" />
                  <span>Color palette and typography selection</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-eastdigital-orange mt-1 mr-3 flex-shrink-0" />
                  <span>Brand voice and messaging development</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8">
              <Palette className="h-12 w-12 text-eastdigital-orange mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">Brand Deliverables</h3>
              <ul className="space-y-3 text-eastdigital-lightgray">
                <li>• Logo variations and file formats</li>
                <li>• Business card and stationery design</li>
                <li>• Marketing collateral templates</li>
                <li>• Social media brand kits</li>
                <li>• Brand implementation guidelines</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Design Process */}
        <section className="container mx-auto px-4 py-16" style={{ backgroundColor: '#222222' }}>
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Our Brand Design Process
            </h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-eastdigital-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <Pen className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Discovery</h3>
              <p className="text-eastdigital-lightgray">Understanding your business, values, and target audience to inform the creative direction</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-eastdigital-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <Palette className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Concept Development</h3>
              <p className="text-eastdigital-lightgray">Creating initial concepts and exploring different creative directions for your brand</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-eastdigital-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Refinement</h3>
              <p className="text-eastdigital-lightgray">Refining chosen concepts based on feedback and ensuring perfect execution</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-eastdigital-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Implementation</h3>
              <p className="text-eastdigital-lightgray">Delivering final assets and guidelines for consistent brand application</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-16" style={{ backgroundColor: '#141414' }}>
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to Build Your Brand?
            </h2>
            <p className="text-xl text-eastdigital-lightgray mb-8 max-w-2xl mx-auto">
              Let's create a powerful brand identity that tells your story, connects with your audience, and sets you apart from the competition.
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

export default BrandIdentityDesign;
