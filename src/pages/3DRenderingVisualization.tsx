
import React from 'react';
import Navbar from '@/components/Navbar/Navbar';
import { Button } from '@/components/ui/button';
import { Play, Eye, Headphones } from 'lucide-react';

const ThreeDRenderingVisualization = () => {
  return (
    <div className="min-h-screen flex flex-col bg-eastdigital-dark">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 lg:py-24">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
              3D RENDERING & VISUALIZATION
            </h1>
            <p className="text-xl lg:text-2xl text-eastdigital-lightgray max-w-4xl mx-auto mb-8">
              Bring Your Architectural Visions to Life with Photo-Realistic Precision
            </p>
            <Button className="bg-eastdigital-orange hover:bg-eastdigital-orange/90 text-white px-8 py-3 text-lg rounded-[60px]">
              Start Your Project
            </Button>
          </div>
        </section>

        {/* Services Grid */}
        <section className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Architectural 3D Rendering */}
            <div id="architectural-3d-rendering" className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <Eye className="h-8 w-8 text-eastdigital-orange mr-3" />
                <h3 className="text-2xl font-bold text-white">Architectural 3D Rendering</h3>
              </div>
              <p className="text-eastdigital-lightgray mb-6 leading-relaxed">
                Transform blueprints into stunning photorealistic images that showcase every detail of your architectural design with precision and artistic flair.
              </p>
              <ul className="space-y-3 text-eastdigital-lightgray">
                <li>• Exterior & Interior Renderings</li>
                <li>• Day & Night Scene Variations</li>
                <li>• High-Resolution Output</li>
                <li>• Multiple Angle Views</li>
              </ul>
            </div>

            {/* Architectural Walkthrough Videos */}
            <div id="architectural-walkthrough-videos" className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <Play className="h-8 w-8 text-eastdigital-orange mr-3" />
                <h3 className="text-2xl font-bold text-white">Architectural Walkthrough Videos</h3>
              </div>
              <p className="text-eastdigital-lightgray mb-6 leading-relaxed">
                Create immersive video tours that allow clients to experience spaces before they're built, enhancing understanding and engagement.
              </p>
              <ul className="space-y-3 text-eastdigital-lightgray">
                <li>• Cinematic Quality Videos</li>
                <li>• Smooth Camera Movements</li>
                <li>• Ambient Sound Design</li>
                <li>• 4K Resolution Output</li>
              </ul>
            </div>

            {/* VR-Ready Property Tours */}
            <div id="vr-ready-property-tours" className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <Headphones className="h-8 w-8 text-eastdigital-orange mr-3" />
                <h3 className="text-2xl font-bold text-white">VR-Ready Property Tours</h3>
              </div>
              <p className="text-eastdigital-lightgray mb-6 leading-relaxed">
                Develop cutting-edge virtual reality experiences that allow complete immersion in unbuilt spaces using the latest VR technology.
              </p>
              <ul className="space-y-3 text-eastdigital-lightgray">
                <li>• Interactive VR Experiences</li>
                <li>• Cross-Platform Compatibility</li>
                <li>• Real-time Navigation</li>
                <li>• Customizable Elements</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Target Audience */}
        <section className="container mx-auto px-4 py-16">
          <div className="bg-gradient-to-r from-eastdigital-orange/10 to-eastdigital-orange/5 border border-eastdigital-orange/20 rounded-2xl p-8 lg:p-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 text-center">
              Perfect For
            </h2>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <h3 className="text-xl font-semibold text-eastdigital-orange mb-3">Developers</h3>
                <p className="text-eastdigital-lightgray">Showcase projects to investors and buyers before construction begins</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-eastdigital-orange mb-3">Architects</h3>
                <p className="text-eastdigital-lightgray">Present designs with photorealistic clarity and detail</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-eastdigital-orange mb-3">Engineers</h3>
                <p className="text-eastdigital-lightgray">Visualize complex structures and technical specifications</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to Visualize Your Vision?
            </h2>
            <p className="text-xl text-eastdigital-lightgray mb-8 max-w-2xl mx-auto">
              Let's transform your architectural concepts into stunning visual experiences that captivate and convince.
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

export default ThreeDRenderingVisualization;
