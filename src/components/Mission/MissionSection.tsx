
import React from 'react';
import { LiquidGlassCard } from '@/components/LiquidGlass/LiquidGlassCard';
import { LiquidGlassButton } from '@/components/LiquidGlass/LiquidGlassButton';

export const MissionSection = () => {
  return (
    <section className="relative py-24 lg:py-32 bg-gradient-to-b from-black via-zinc-950/80 to-black overflow-hidden">
      {/* Enhanced Liquid Glass Background with Realistic Reflections */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-eastdigital-orange/12 via-white/4 to-purple-500/6 rounded-full blur-4xl animate-pulse">
          {/* Multiple reflection layers for realism */}
          <div className="absolute inset-8 bg-gradient-to-tl from-white/8 via-transparent to-eastdigital-orange/4 rounded-full blur-2xl"></div>
          <div className="absolute top-12 right-16 w-16 h-16 bg-white/15 rounded-full blur-xl"></div>
        </div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-tl from-blue-500/8 via-eastdigital-orange/6 to-white/3 rounded-full blur-4xl animate-pulse" style={{ animationDelay: '2s' }}>
          <div className="absolute inset-6 bg-gradient-to-br from-eastdigital-orange/6 via-transparent to-white/4 rounded-full blur-xl"></div>
          <div className="absolute bottom-8 left-12 w-12 h-12 bg-eastdigital-orange/20 rounded-full blur-lg"></div>
        </div>
        
        {/* Additional atmospheric effects */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-radial from-white/[0.02] via-transparent to-transparent pointer-events-none"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Header Section with Enhanced Glass Effect */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-6 py-2 bg-gradient-to-r from-eastdigital-orange/8 via-eastdigital-orange/12 to-eastdigital-orange/8 border border-eastdigital-orange/15 rounded-full mb-8 backdrop-blur-2xl shadow-lg shadow-eastdigital-orange/10">
            <span className="text-eastdigital-orange text-sm font-medium tracking-widest uppercase">Our Mission</span>
          </div>
          <h2 className="text-5xl font-bold text-white mb-6 leading-tight lg:text-4xl drop-shadow-2xl">Turning Real Estate Vision into Digital Reality</h2>
          <p className="text-eastdigital-lightgray max-w-4xl mx-auto leading-relaxed text-lg opacity-90">At East Digital, we bring real estate concepts to life through immersive visuals, performance-driven marketing, and smart digital solutions. Our services—ranging from 3D architectural rendering and VR walkthroughs to targeted ad campaigns and corporate branding—are tailored to help developers, architects, brokers, and brands stand out in a competitive market.</p>
        </div>

        {/* Mission Cards Grid with Enhanced Glass Effects */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Vision Card */}
          <LiquidGlassCard variant="default" className="p-8 group text-center" interactive={true}>
            <div className="w-16 h-16 bg-gradient-to-br from-eastdigital-orange/15 via-eastdigital-orange/8 to-white/5 rounded-2xl border border-eastdigital-orange/20 flex items-center justify-center mx-auto mb-6 backdrop-blur-2xl group-hover:from-eastdigital-orange/25 group-hover:to-eastdigital-orange/15 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-eastdigital-orange/20 transition-all duration-300">
              <span className="text-eastdigital-orange text-2xl">👁️</span>
              {/* Icon reflection */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent rounded-2xl pointer-events-none"></div>
            </div>
            <h3 className="text-xl font-bold text-white mb-4 group-hover:text-eastdigital-orange transition-colors duration-300">
              Our Vision
            </h3>
            <p className="text-gray-300 leading-relaxed text-base">
              To be the leading digital partner for businesses worldwide, delivering innovative solutions that bridge the gap between imagination and reality through cutting-edge technology and creative excellence.
            </p>
          </LiquidGlassCard>

          {/* Mission Card */}
          <LiquidGlassCard variant="default" className="p-8 group text-center" interactive={true}>
            <div className="w-16 h-16 bg-gradient-to-br from-eastdigital-orange/15 via-eastdigital-orange/8 to-white/5 rounded-2xl border border-eastdigital-orange/20 flex items-center justify-center mx-auto mb-6 backdrop-blur-2xl group-hover:from-eastdigital-orange/25 group-hover:to-eastdigital-orange/15 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-eastdigital-orange/20 transition-all duration-300">
              <span className="text-eastdigital-orange text-2xl">🎯</span>
              <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent rounded-2xl pointer-events-none"></div>
            </div>
            <h3 className="text-xl font-bold text-white mb-4 group-hover:text-eastdigital-orange transition-colors duration-300">
              Our Mission
            </h3>
            <p className="text-gray-300 leading-relaxed text-base">
              We empower businesses to achieve their digital aspirations through exceptional 3D visualizations, targeted marketing campaigns, and strategic branding solutions that create lasting impact and drive measurable growth.
            </p>
          </LiquidGlassCard>

          {/* Values Card */}
          <LiquidGlassCard variant="default" className="p-8 group text-center md:col-span-2 lg:col-span-1" interactive={true}>
            <div className="w-16 h-16 bg-gradient-to-br from-eastdigital-orange/15 via-eastdigital-orange/8 to-white/5 rounded-2xl border border-eastdigital-orange/20 flex items-center justify-center mx-auto mb-6 backdrop-blur-2xl group-hover:from-eastdigital-orange/25 group-hover:to-eastdigital-orange/15 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-eastdigital-orange/20 transition-all duration-300">
              <span className="text-eastdigital-orange text-2xl">⭐</span>
              <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent rounded-2xl pointer-events-none"></div>
            </div>
            <h3 className="text-xl font-bold text-white mb-4 group-hover:text-eastdigital-orange transition-colors duration-300">
              Our Values
            </h3>
            <p className="text-gray-300 leading-relaxed text-base">
              Innovation, quality, and client success drive everything we do. We believe in transparent communication, continuous learning, and delivering solutions that exceed expectations while building long-term partnerships.
            </p>
          </LiquidGlassCard>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <LiquidGlassButton variant="primary" size="lg" className="px-8 py-4 font-semibold shadow-lg hover:shadow-xl hover:shadow-eastdigital-orange/20 transition-shadow duration-300">
            Partner With Us
          </LiquidGlassButton>
        </div>
      </div>
    </section>
  );
};
