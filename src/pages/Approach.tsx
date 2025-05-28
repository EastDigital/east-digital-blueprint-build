
import React from 'react';
import Navbar from '@/components/Navbar/Navbar';
import { Button } from '@/components/ui/button';
import { Search, Lightbulb, Palette, Rocket, CheckCircle, Clock } from 'lucide-react';

const Approach = () => {
  return (
    <div className="min-h-screen flex flex-col bg-eastdigital-dark">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 lg:py-24">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
              Our Approach
            </h1>
            <p className="text-xl lg:text-2xl text-eastdigital-lightgray max-w-3xl mx-auto">
              Learn about our proven process and how we deliver exceptional results for our clients.
            </p>
          </div>
        </section>

        {/* Process Steps */}
        <section className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Our 5-Step Process
            </h2>
          </div>
          <div className="space-y-12">
            {/* Step 1 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-eastdigital-orange rounded-full flex items-center justify-center mr-6">
                    <Search className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">1. Discovery & Research</h3>
                    <p className="text-eastdigital-orange">Understanding Your Vision</p>
                  </div>
                </div>
                <p className="text-eastdigital-lightgray leading-relaxed">
                  We begin every project by deeply understanding your business goals, target audience, and competitive landscape. Our research phase includes stakeholder interviews, market analysis, and technical requirements gathering to ensure we're aligned with your vision from day one.
                </p>
              </div>
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8">
                <h4 className="text-xl font-semibold text-white mb-4">What We Deliver:</h4>
                <ul className="space-y-2 text-eastdigital-lightgray">
                  <li>• Comprehensive project brief</li>
                  <li>• Target audience analysis</li>
                  <li>• Competitive research report</li>
                  <li>• Technical requirements document</li>
                </ul>
              </div>
            </div>

            {/* Step 2 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8">
                  <h4 className="text-xl font-semibold text-white mb-4">What We Deliver:</h4>
                  <ul className="space-y-2 text-eastdigital-lightgray">
                    <li>• Strategic roadmap</li>
                    <li>• Project timeline</li>
                    <li>• Resource allocation plan</li>
                    <li>• Success metrics definition</li>
                  </ul>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-eastdigital-orange rounded-full flex items-center justify-center mr-6">
                    <Lightbulb className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">2. Strategy & Planning</h3>
                    <p className="text-eastdigital-orange">Crafting the Blueprint</p>
                  </div>
                </div>
                <p className="text-eastdigital-lightgray leading-relaxed">
                  Based on our research insights, we develop a comprehensive strategy that outlines the project approach, timeline, and success metrics. This phase ensures everyone is aligned on objectives and expectations before we begin execution.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-eastdigital-orange rounded-full flex items-center justify-center mr-6">
                    <Palette className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">3. Design & Development</h3>
                    <p className="text-eastdigital-orange">Bringing Ideas to Life</p>
                  </div>
                </div>
                <p className="text-eastdigital-lightgray leading-relaxed">
                  Our creative team transforms strategy into stunning visuals and functional solutions. We maintain constant communication with you throughout this phase, providing regular updates and incorporating your feedback to ensure the final output exceeds expectations.
                </p>
              </div>
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8">
                <h4 className="text-xl font-semibold text-white mb-4">What We Deliver:</h4>
                <ul className="space-y-2 text-eastdigital-lightgray">
                  <li>• Initial design concepts</li>
                  <li>• Iterative refinements</li>
                  <li>• Development milestones</li>
                  <li>• Quality assurance testing</li>
                </ul>
              </div>
            </div>

            {/* Step 4 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8">
                  <h4 className="text-xl font-semibold text-white mb-4">What We Deliver:</h4>
                  <ul className="space-y-2 text-eastdigital-lightgray">
                    <li>• Final deliverables</li>
                    <li>• Launch coordination</li>
                    <li>• Performance monitoring</li>
                    <li>• User training & documentation</li>
                  </ul>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-eastdigital-orange rounded-full flex items-center justify-center mr-6">
                    <Rocket className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">4. Launch & Implementation</h3>
                    <p className="text-eastdigital-orange">Going Live</p>
                  </div>
                </div>
                <p className="text-eastdigital-lightgray leading-relaxed">
                  We carefully orchestrate the launch to ensure everything goes smoothly. Our team monitors performance closely during the initial launch phase, making any necessary adjustments to optimize results and user experience.
                </p>
              </div>
            </div>

            {/* Step 5 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-eastdigital-orange rounded-full flex items-center justify-center mr-6">
                    <CheckCircle className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">5. Optimization & Support</h3>
                    <p className="text-eastdigital-orange">Continuous Improvement</p>
                  </div>
                </div>
                <p className="text-eastdigital-lightgray leading-relaxed">
                  Our relationship doesn't end at launch. We provide ongoing support, analyze performance data, and make continuous improvements to ensure your project continues to deliver value and meet evolving business needs.
                </p>
              </div>
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8">
                <h4 className="text-xl font-semibold text-white mb-4">What We Deliver:</h4>
                <ul className="space-y-2 text-eastdigital-lightgray">
                  <li>• Performance analytics</li>
                  <li>• Optimization recommendations</li>
                  <li>• Ongoing maintenance</li>
                  <li>• Future enhancement planning</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Why Our Approach Works
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8 text-center">
              <Clock className="h-12 w-12 text-eastdigital-orange mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-4">Timely Delivery</h3>
              <p className="text-eastdigital-lightgray">
                Our structured process ensures projects are delivered on time, every time, without compromising on quality.
              </p>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8 text-center">
              <CheckCircle className="h-12 w-12 text-eastdigital-orange mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-4">Quality Assurance</h3>
              <p className="text-eastdigital-lightgray">
                Multiple quality checkpoints throughout our process ensure the highest standards in every deliverable.
              </p>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8 text-center">
              <Search className="h-12 w-12 text-eastdigital-orange mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-4">Transparent Communication</h3>
              <p className="text-eastdigital-lightgray">
                Regular updates and open communication keep you informed and involved throughout the entire process.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="bg-gradient-to-r from-eastdigital-orange/10 to-eastdigital-orange/5 border border-eastdigital-orange/20 rounded-2xl p-8 lg:p-12 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to Experience Our Approach?
            </h2>
            <p className="text-xl text-eastdigital-lightgray mb-8 max-w-2xl mx-auto">
              Let's start with a discovery session to understand your needs and show you how our proven process can deliver exceptional results.
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

export default Approach;
