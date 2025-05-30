
import React from 'react';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import { Button } from '@/components/ui/button';
import { Globe, Smartphone, Code, CheckCircle } from 'lucide-react';

const WebApps = () => {
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
              backgroundImage: "url('https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1920&h=1080&fit=crop&crop=center')",
              backgroundPosition: 'center 40%'
            }}
          ></div>
          
          {/* Overlay for readability */}
          <div className="absolute inset-0 bg-black/70"></div>
          
          <div className="relative z-10 container mx-auto px-4 text-center py-8 sm:py-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-white font-poppins tracking-tight">
              WEB & APPS
            </h1>
            <p className="text-base sm:text-xl lg:text-2xl text-white/90 max-w-4xl mx-auto mb-6 sm:mb-8 px-2 sm:px-4 leading-relaxed">
              Develop robust web applications and mobile apps that drive business growth
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
                Custom Web & Mobile Development
              </h2>
              <p className="text-eastdigital-lightgray mb-6 leading-relaxed text-lg">
                We build powerful, scalable web applications and mobile apps that provide exceptional user experiences while meeting your specific business requirements. Our development process focuses on performance, security, and maintainability.
              </p>
              <ul className="space-y-3 text-eastdigital-lightgray">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-eastdigital-orange mt-1 mr-3 flex-shrink-0" />
                  <span>Responsive web application development</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-eastdigital-orange mt-1 mr-3 flex-shrink-0" />
                  <span>Native and cross-platform mobile apps</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-eastdigital-orange mt-1 mr-3 flex-shrink-0" />
                  <span>E-commerce and marketplace solutions</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-eastdigital-orange mt-1 mr-3 flex-shrink-0" />
                  <span>Custom platform and CMS development</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8">
              <Globe className="h-12 w-12 text-eastdigital-orange mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">Technology Stack</h3>
              <ul className="space-y-3 text-eastdigital-lightgray">
                <li>• React, Vue.js, Angular for frontend</li>
                <li>• Node.js, Python, PHP for backend</li>
                <li>• React Native, Flutter for mobile</li>
                <li>• Cloud hosting and deployment</li>
                <li>• API integration and development</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Development Process */}
        <section className="container mx-auto px-4 py-16" style={{ backgroundColor: '#222222' }}>
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Our Development Process
            </h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-eastdigital-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Planning & Analysis</h3>
              <p className="text-eastdigital-lightgray">Understanding requirements and creating detailed project roadmaps</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-eastdigital-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Design & Prototyping</h3>
              <p className="text-eastdigital-lightgray">Creating user-centered designs and interactive prototypes</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-eastdigital-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Development & Testing</h3>
              <p className="text-eastdigital-lightgray">Building robust applications with comprehensive testing</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-eastdigital-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">4</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Launch & Support</h3>
              <p className="text-eastdigital-lightgray">Deploying applications and providing ongoing maintenance</p>
            </div>
          </div>
        </section>

        {/* Technologies */}
        <section className="container mx-auto px-4 py-16" style={{ backgroundColor: '#141414' }}>
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Technologies We Use
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8 text-center">
              <Globe className="h-12 w-12 text-eastdigital-orange mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-4">Web Development</h3>
              <p className="text-eastdigital-lightgray">
                Modern frameworks and technologies for fast, scalable web applications with excellent user experiences.
              </p>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8 text-center">
              <Smartphone className="h-12 w-12 text-eastdigital-orange mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-4">Mobile Development</h3>
              <p className="text-eastdigital-lightgray">
                Native and cross-platform mobile app development for iOS and Android with native performance.
              </p>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8 text-center">
              <Code className="h-12 w-12 text-eastdigital-orange mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-4">Backend Systems</h3>
              <p className="text-eastdigital-lightgray">
                Robust backend architectures with APIs, databases, and cloud infrastructure for reliable performance.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-16" style={{ backgroundColor: '#222222' }}>
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to Build Your Digital Solution?
            </h2>
            <p className="text-xl text-eastdigital-lightgray mb-8 max-w-2xl mx-auto">
              Let's create powerful web applications and mobile apps that drive your business forward and provide exceptional user experiences.
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

export default WebApps;
