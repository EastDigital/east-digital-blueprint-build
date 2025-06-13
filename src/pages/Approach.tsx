
import React from 'react';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import { LiquidGlassContainer } from '@/components/LiquidGlass/LiquidGlassContainer';
import { InteractiveAurora } from '@/components/Aurora/InteractiveAurora';
import { LiquidGlassCard } from '@/components/LiquidGlass/LiquidGlassCard';
import { useNavbarLogic } from '@/components/Navbar/useNavbarLogic';
import { cn } from '@/lib/utils';
import { Target, Lightbulb, Cog, Rocket } from 'lucide-react';

const Approach = () => {
  const { isScrolled } = useNavbarLogic();
  // Match homepage aurora behavior - show when not scrolled, reduce opacity when scrolled
  const showAurora = !isScrolled;

  const approachSteps = [
    {
      icon: Target,
      title: "Discovery & Strategy",
      description: "We begin by understanding your vision, goals, and challenges to create a tailored strategy that aligns with your objectives.",
      features: ["Market Analysis", "Goal Setting", "Strategy Development", "Timeline Planning"]
    },
    {
      icon: Lightbulb,
      title: "Creative Conceptualization",
      description: "Our creative team develops innovative concepts and designs that bring your vision to life with stunning visual impact.",
      features: ["Concept Development", "Visual Design", "Brand Integration", "Creative Direction"]
    },
    {
      icon: Cog,
      title: "Technical Implementation",
      description: "We leverage cutting-edge technology and industry best practices to build robust, scalable solutions.",
      features: ["Technical Development", "Quality Assurance", "Performance Optimization", "Integration Testing"]
    },
    {
      icon: Rocket,
      title: "Launch & Optimization",
      description: "We ensure a successful launch and provide ongoing optimization to maximize your project's impact and ROI.",
      features: ["Launch Strategy", "Performance Monitoring", "Continuous Optimization", "Ongoing Support"]
    }
  ];

  return (
    <LiquidGlassContainer className="min-h-screen flex flex-col relative isolate" withParticles={true}>
      {/* Enhanced Aurora Background - exactly like homepage */}
      <div
        className={cn(
          'fixed inset-0 transition-opacity duration-500 z-0',
          showAurora ? 'opacity-100' : 'opacity-40'
        )}
      >
        <InteractiveAurora intensity="high" />
      </div>

      {/* Content structure matching homepage */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-1 pt-24 pb-16">
          <div className="container mx-auto px-4">
            {/* Hero Section */}
            <div className="text-center mb-20">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Our Approach
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                We follow a proven methodology that combines strategic thinking, creative excellence, 
                and technical precision to deliver exceptional results for every project.
              </p>
            </div>

            {/* Approach Steps */}
            <div className="grid md:grid-cols-2 gap-8 mb-20">
              {approachSteps.map((step, index) => (
                <LiquidGlassCard key={index} className="p-8">
                  <div className="flex items-start space-x-6">
                    <div className="w-16 h-16 bg-eastdigital-orange/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <step.icon className="w-8 h-8 text-eastdigital-orange" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                      <p className="text-gray-300 mb-6 leading-relaxed">{step.description}</p>
                      <ul className="space-y-2">
                        {step.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-gray-300">
                            <div className="w-2 h-2 bg-eastdigital-orange rounded-full mr-3 flex-shrink-0"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </LiquidGlassCard>
              ))}
            </div>

            {/* Why Choose Us Section */}
            <LiquidGlassCard className="p-12 text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-6">
                Why Choose Our Approach?
              </h2>
              <div className="grid md:grid-cols-3 gap-8 mt-12">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Proven Results</h3>
                  <p className="text-gray-300">
                    Our methodology has delivered success across hundreds of projects, 
                    consistently exceeding client expectations and industry standards.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Collaborative Process</h3>
                  <p className="text-gray-300">
                    We work closely with our clients throughout every phase, ensuring 
                    transparency, alignment, and shared ownership of the final outcome.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Continuous Innovation</h3>
                  <p className="text-gray-300">
                    We stay at the forefront of technology and design trends, 
                    continuously evolving our approach to deliver cutting-edge solutions.
                  </p>
                </div>
              </div>
            </LiquidGlassCard>

            {/* CTA Section */}
            <LiquidGlassCard className="p-8 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Start Your Journey?
              </h2>
              <p className="text-gray-300 text-lg mb-6">
                Let's discuss how our proven approach can help bring your vision to life.
              </p>
              <a 
                href="/connect" 
                className="inline-block bg-eastdigital-orange text-white px-8 py-3 rounded-full font-semibold hover:bg-eastdigital-orange/90 transition-colors"
              >
                Get Started Today
              </a>
            </LiquidGlassCard>
          </div>
        </main>

        <Footer />
      </div>
    </LiquidGlassContainer>
  );
};

export default Approach;
