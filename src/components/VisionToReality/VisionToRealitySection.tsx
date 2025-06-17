
import React from 'react';
import { LiquidGlassCard } from '@/components/LiquidGlass/LiquidGlassCard';
import { LiquidGlassButton } from '@/components/LiquidGlass/LiquidGlassButton';
import { SubtleBackground } from '@/components/common/SubtleBackground';

export const VisionToRealitySection = () => {
  const approaches = [
    {
      step: "01",
      title: "Discovery & Strategy",
      description: "We dive deep into understanding your vision, goals, and target audience to create a strategic foundation.",
      features: ["Market Research", "Competitor Analysis", "Goal Definition"]
    },
    {
      step: "02", 
      title: "Creative Conceptualization",
      description: "Our team transforms your ideas into compelling visual concepts and comprehensive design strategies.",
      features: ["Design Concepts", "Wireframing", "Brand Guidelines"]
    },
    {
      step: "03",
      title: "Development & Production",
      description: "We bring concepts to life using cutting-edge technology and meticulous attention to detail.",
      features: ["3D Rendering", "Video Production", "Web Development"]
    },
    {
      step: "04",
      title: "Launch & Optimization",
      description: "We ensure seamless delivery and provide ongoing optimization for maximum impact and results.",
      features: ["Quality Assurance", "Performance Testing", "Continuous Improvement"]
    }
  ];

  return (
    <section className="relative py-24 lg:py-32 bg-black overflow-hidden">
      {/* Subtle background details */}
      <SubtleBackground variant="gradient" />

      <div className="relative z-10 container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-6 py-2 bg-eastdigital-orange/10 border border-eastdigital-orange/20 rounded-full mb-8 backdrop-blur-xl">
            <span className="text-eastdigital-orange text-sm font-medium tracking-widest uppercase">Our Approach</span>
          </div>
          <h2 className="text-5xl font-bold text-white mb-6 leading-tight lg:text-4xl">
            From Vision to Reality
          </h2>
          <p className="text-eastdigital-lightgray max-w-3xl mx-auto leading-relaxed text-lg">
            Our proven methodology transforms your ideas into powerful digital experiences that captivate audiences and drive results.
          </p>
        </div>

        {/* Approach Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {approaches.map((approach, index) => (
            <div
              key={approach.step}
              className="group"
              style={{
                animationDelay: `${index * 200}ms`,
              }}
            >
              <LiquidGlassCard 
                variant="default" 
                className="h-full p-8 group-hover:scale-105 transition-all duration-500"
                interactive={true}
              >
                {/* Step Number with Liquid Glass Effect */}
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-eastdigital-orange/20 to-eastdigital-orange/10 rounded-2xl border border-eastdigital-orange/30 flex items-center justify-center backdrop-blur-xl group-hover:from-eastdigital-orange/30 group-hover:to-eastdigital-orange/20 transition-all duration-300">
                    <span className="text-eastdigital-orange font-bold text-lg">{approach.step}</span>
                  </div>
                  {/* Connecting Line */}
                  {index < approaches.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-20 w-32 h-px bg-gradient-to-r from-eastdigital-orange/30 to-transparent"></div>
                  )}
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white group-hover:text-eastdigital-orange transition-colors duration-300">
                    {approach.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {approach.description}
                  </p>
                  
                  {/* Features List */}
                  <ul className="space-y-2 mt-4">
                    {approach.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-xs text-gray-400">
                        <div className="w-1.5 h-1.5 bg-eastdigital-orange/60 rounded-full mr-3 group-hover:bg-eastdigital-orange transition-colors duration-300"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Glow Enhancement */}
                <div className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-eastdigital-orange/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </LiquidGlassCard>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <LiquidGlassButton 
            variant="primary" 
            size="lg"
            className="px-8 py-4 font-semibold"
          >
            Start Your Project
          </LiquidGlassButton>
        </div>
      </div>
    </section>
  );
};
