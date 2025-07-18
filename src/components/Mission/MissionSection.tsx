import React from 'react';
import { LiquidGlassCard } from '@/components/LiquidGlass/LiquidGlassCard';
import { LiquidGlassButton } from '@/components/LiquidGlass/LiquidGlassButton';
import { SubtleBackground } from '@/components/common/SubtleBackground';
import { Eye, Target, Star } from 'lucide-react';
export const MissionSection = () => {
  return <section className="relative py-24 lg:py-32 bg-black overflow-hidden">
      {/* Subtle background details */}
      <SubtleBackground variant="gradient" />
      
      <div className="relative z-10 container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-6 py-2 bg-eastdigital-orange/[0.05] border border-eastdigital-orange/[0.08] rounded-full mb-8 backdrop-blur-xl">
            <span className="text-eastdigital-orange text-sm font-medium tracking-widest uppercase">Our Mission</span>
          </div>
          <h2 className="font-bold text-white mb-6 leading-tight lg:text-4xl text-2xl">Turning Real Estate Vision into Digital Reality</h2>
          <p className="max-w-4xl mx-auto leading-relaxed text-lg text-eastdigital-lightgray font-light">At East Digital, we bring real estate concepts to life through immersive visuals, performance-driven marketing, and smart digital solutions. Our services—ranging from 3D architectural rendering and VR walkthroughs to targeted ad campaigns and corporate branding—are tailored to help developers, architects, brokers, and brands stand out in a competitive market.</p>
        </div>

        {/* Mission Cards Grid - Modern Layout */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {/* Vision Card */}
          <LiquidGlassCard variant="default" className="group relative overflow-hidden" interactive={true}>
            <div className="p-8 lg:p-10 text-center relative z-10">
              {/* Subtle Icon Container */}
              <div className="w-16 h-16 mx-auto mb-6 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-eastdigital-orange/[0.1] to-eastdigital-orange/[0.05] rounded-2xl backdrop-blur-xl border border-eastdigital-orange/[0.08] group-hover:border-eastdigital-orange/[0.15] transition-all duration-500"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Eye className="h-7 w-7 text-eastdigital-orange/70 group-hover:text-eastdigital-orange transition-colors duration-500" strokeWidth={1.5} />
                </div>
              </div>
              
              <h3 className="text-xl lg:text-2xl font-bold text-white mb-4 group-hover:text-eastdigital-orange transition-colors duration-300">
                Our Vision
              </h3>
              <p className="leading-relaxed text-base text-eastdigital-lightgray/90 group-hover:text-eastdigital-lightgray transition-colors duration-300">
                To be the leading digital partner for businesses worldwide, delivering innovative solutions that bridge the gap between imagination and reality through cutting-edge technology and creative excellence.
              </p>
            </div>
            
            {/* Subtle Hover Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-eastdigital-orange/[0.02] via-transparent to-purple-500/[0.01] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </LiquidGlassCard>

          {/* Mission Card */}
          <LiquidGlassCard variant="default" className="group relative overflow-hidden" interactive={true}>
            <div className="p-8 lg:p-10 text-center relative z-10">
              {/* Subtle Icon Container */}
              <div className="w-16 h-16 mx-auto mb-6 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-eastdigital-orange/[0.1] to-eastdigital-orange/[0.05] rounded-2xl backdrop-blur-xl border border-eastdigital-orange/[0.08] group-hover:border-eastdigital-orange/[0.15] transition-all duration-500"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Target className="h-7 w-7 text-eastdigital-orange/70 group-hover:text-eastdigital-orange transition-colors duration-500" strokeWidth={1.5} />
                </div>
              </div>
              
              <h3 className="text-xl lg:text-2xl font-bold text-white mb-4 group-hover:text-eastdigital-orange transition-colors duration-300">
                Our Mission
              </h3>
              <p className="leading-relaxed text-base text-eastdigital-lightgray/90 group-hover:text-eastdigital-lightgray transition-colors duration-300">
                We empower businesses to achieve their digital aspirations through exceptional 3D visualizations, targeted marketing campaigns, and strategic branding solutions that create lasting impact and drive measurable growth.
              </p>
            </div>
            
            {/* Subtle Hover Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-eastdigital-orange/[0.02] via-transparent to-cyan-500/[0.01] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </LiquidGlassCard>

          {/* Values Card */}
          <LiquidGlassCard variant="default" className="group relative overflow-hidden" interactive={true}>
            <div className="p-8 lg:p-10 text-center relative z-10">
              {/* Subtle Icon Container */}
              <div className="w-16 h-16 mx-auto mb-6 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-eastdigital-orange/[0.1] to-eastdigital-orange/[0.05] rounded-2xl backdrop-blur-xl border border-eastdigital-orange/[0.08] group-hover:border-eastdigital-orange/[0.15] transition-all duration-500"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Star className="h-7 w-7 text-eastdigital-orange/70 group-hover:text-eastdigital-orange transition-colors duration-500" strokeWidth={1.5} />
                </div>
              </div>
              
              <h3 className="text-xl lg:text-2xl font-bold text-white mb-4 group-hover:text-eastdigital-orange transition-colors duration-300">
                Our Values
              </h3>
              <p className="leading-relaxed text-base text-eastdigital-lightgray/90 group-hover:text-eastdigital-lightgray transition-colors duration-300">
                Innovation, quality, and client success drive everything we do. We believe in transparent communication, continuous learning, and delivering solutions that exceed expectations while building long-term partnerships.
              </p>
            </div>
            
            {/* Subtle Hover Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-eastdigital-orange/[0.02] via-transparent to-emerald-500/[0.01] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </LiquidGlassCard>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <LiquidGlassButton variant="primary" size="lg" className="px-8 py-4 font-semibold">
            Partner With Us
          </LiquidGlassButton>
        </div>
      </div>
    </section>;
};