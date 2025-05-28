
import React from 'react';
import Navbar from '@/components/Navbar/Navbar';
import { Button } from '@/components/ui/button';
import { Palette, Smartphone, Globe } from 'lucide-react';

const CorporateSolutions = () => {
  return (
    <div className="min-h-screen flex flex-col bg-eastdigital-dark">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 lg:py-24">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
              CORPORATE SOLUTIONS
            </h1>
            <p className="text-xl lg:text-2xl text-eastdigital-lightgray max-w-4xl mx-auto mb-8">
              Elevate Your Brand and Connect with Your Audience
            </p>
            <Button className="bg-eastdigital-orange hover:bg-eastdigital-orange/90 text-white px-8 py-3 text-lg rounded-[60px]">
              Transform Your Brand
            </Button>
          </div>
        </section>

        {/* Services Grid */}
        <section className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Brand Identity Design */}
            <div id="brand-identity-design" className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <Palette className="h-8 w-8 text-eastdigital-orange mr-3" />
                <h3 className="text-2xl font-bold text-white">Brand Identity Design</h3>
              </div>
              <p className="text-eastdigital-lightgray mb-6 leading-relaxed">
                Create compelling brand identities that resonate with your target audience and differentiate you from competitors in the market.
              </p>
              <ul className="space-y-3 text-eastdigital-lightgray">
                <li>• Logo Design & Brand Guidelines</li>
                <li>• Color Palette & Typography</li>
                <li>• Brand Voice & Messaging</li>
                <li>• Marketing Collateral Design</li>
              </ul>
            </div>

            {/* UI/UX Design */}
            <div id="ui-ux-design" className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <Smartphone className="h-8 w-8 text-eastdigital-orange mr-3" />
                <h3 className="text-2xl font-bold text-white">UI/UX Design</h3>
              </div>
              <p className="text-eastdigital-lightgray mb-6 leading-relaxed">
                Design intuitive user interfaces and experiences that engage users and drive conversions across all digital touchpoints.
              </p>
              <ul className="space-y-3 text-eastdigital-lightgray">
                <li>• User Research & Analysis</li>
                <li>• Wireframing & Prototyping</li>
                <li>• Interactive Design Systems</li>
                <li>• Usability Testing & Optimization</li>
              </ul>
            </div>

            {/* Web & Apps */}
            <div id="web-apps" className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <Globe className="h-8 w-8 text-eastdigital-orange mr-3" />
                <h3 className="text-2xl font-bold text-white">Web & Apps</h3>
              </div>
              <p className="text-eastdigital-lightgray mb-6 leading-relaxed">
                Develop robust web applications and mobile apps that provide exceptional user experiences and drive business growth.
              </p>
              <ul className="space-y-3 text-eastdigital-lightgray">
                <li>• Responsive Web Development</li>
                <li>• Mobile App Development</li>
                <li>• E-commerce Solutions</li>
                <li>• Custom Platform Development</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Our Process
            </h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-eastdigital-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Discovery</h3>
              <p className="text-eastdigital-lightgray">Understanding your business goals and target audience</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-eastdigital-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Strategy</h3>
              <p className="text-eastdigital-lightgray">Developing a comprehensive plan for your brand transformation</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-eastdigital-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Design</h3>
              <p className="text-eastdigital-lightgray">Creating stunning visuals and user experiences</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-eastdigital-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">4</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Launch</h3>
              <p className="text-eastdigital-lightgray">Implementing and optimizing your digital presence</p>
            </div>
          </div>
        </section>

        {/* Target Audience */}
        <section className="container mx-auto px-4 py-16">
          <div className="bg-gradient-to-r from-eastdigital-orange/10 to-eastdigital-orange/5 border border-eastdigital-orange/20 rounded-2xl p-8 lg:p-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 text-center">
              Perfect For
            </h2>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-eastdigital-orange mb-3">Companies of All Sizes</h3>
              <p className="text-eastdigital-lightgray max-w-3xl mx-auto">
                From startups looking to establish their brand presence to established enterprises seeking digital transformation, we help companies build strong brands and digital platforms that drive growth and customer engagement.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to Elevate Your Brand?
            </h2>
            <p className="text-xl text-eastdigital-lightgray mb-8 max-w-2xl mx-auto">
              Let's create a powerful brand identity and digital presence that sets you apart from the competition.
            </p>
            <Button className="bg-eastdigital-orange hover:bg-eastdigital-orange/90 text-white px-8 py-3 text-lg rounded-[60px]">
              Get Your Blueprint
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CorporateSolutions;
