import React from 'react';
import { LiquidGlassCard } from '@/components/LiquidGlass/LiquidGlassCard';
import { LiquidGlassButton } from '@/components/LiquidGlass/LiquidGlassButton';
export const MissionSection = () => {
  return <section className="relative py-24 lg:py-32 bg-black overflow-hidden">
      {/* Minimal background ambience */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-eastdigital-orange/[0.015] rounded-full blur-[150px]"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-6 py-2 bg-eastdigital-orange/[0.05] border border-eastdigital-orange/[0.08] rounded-full mb-8 backdrop-blur-xl">
            <span className="text-eastdigital-orange text-sm font-medium tracking-widest uppercase">Our Mission</span>
          </div>
          <h2 className="text-5xl font-bold text-white mb-6 leading-tight lg:text-4xl">Turning Real Estate Vision into Digital Reality</h2>
          <p className="max-w-4xl mx-auto leading-relaxed text-lg text-eastdigital-lightgray font-light">At East Digital, we bring real estate concepts to life through immersive visuals, performance-driven marketing, and smart digital solutions. Our services—ranging from 3D architectural rendering and VR walkthroughs to targeted ad campaigns and corporate branding—are tailored to help developers, architects, brokers, and brands stand out in a competitive market.</p>
        </div>

        {/* Mission Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Vision Card */}
          <LiquidGlassCard variant="default" className="p-8 group text-center" interactive={true}>
            <div className="w-16 h-16 bg-eastdigital-orange/[0.08] rounded-2xl border border-eastdigital-orange/[0.12] flex items-center justify-center mx-auto mb-6 backdrop-blur-xl group-hover:bg-eastdigital-orange/[0.12] transition-all duration-300">
              <span className="text-eastdigital-orange text-2xl">👁️</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-4 group-hover:text-eastdigital-orange transition-colors duration-300">
              Our Vision
            </h3>
            <p className="leading-relaxed text-base text-eastdigital-lightgray">
              To be the leading digital partner for businesses worldwide, delivering innovative solutions that bridge the gap between imagination and reality through cutting-edge technology and creative excellence.
            </p>
          </LiquidGlassCard>

          {/* Mission Card */}
          <LiquidGlassCard variant="default" className="p-8 group text-center" interactive={true}>
            <div className="w-16 h-16 bg-eastdigital-orange/[0.08] rounded-2xl border border-eastdigital-orange/[0.12] flex items-center justify-center mx-auto mb-6 backdrop-blur-xl group-hover:bg-eastdigital-orange/[0.12] transition-all duration-300">
              <span className="text-eastdigital-orange text-2xl">🎯</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-4 group-hover:text-eastdigital-orange transition-colors duration-300">
              Our Mission
            </h3>
            <p className="leading-relaxed text-base text-eastdigital-lightgray">
              We empower businesses to achieve their digital aspirations through exceptional 3D visualizations, targeted marketing campaigns, and strategic branding solutions that create lasting impact and drive measurable growth.
            </p>
          </LiquidGlassCard>

          {/* Values Card */}
          <LiquidGlassCard variant="default" className="p-8 group text-center md:col-span-2 lg:col-span-1" interactive={true}>
            <div className="w-16 h-16 bg-eastdigital-orange/[0.08] rounded-2xl border border-eastdigital-orange/[0.12] flex items-center justify-center mx-auto mb-6 backdrop-blur-xl group-hover:bg-eastdigital-orange/[0.12] transition-all duration-300">
              <span className="text-eastdigital-orange text-2xl">⭐</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-4 group-hover:text-eastdigital-orange transition-colors duration-300">
              Our Values
            </h3>
            <p className="leading-relaxed text-base text-eastdigital-lightgray">
              Innovation, quality, and client success drive everything we do. We believe in transparent communication, continuous learning, and delivering solutions that exceed expectations while building long-term partnerships.
            </p>
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