import React from 'react';
import { LiquidGlassCard } from '@/components/LiquidGlass/LiquidGlassCard';
import { LiquidGlassButton } from '@/components/LiquidGlass/LiquidGlassButton';
import { SubtleBackground } from '@/components/common/SubtleBackground';
import { Eye, Target, Star } from 'lucide-react';
export const MissionSection = () => {
  return <section className="relative overflow-hidden bg-zinc-950 lg:py-[40px] py-[30px]">
      {/* Subtle background details */}
      <SubtleBackground variant="gradient" />
      
      <div className="relative z-10 container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-6 py-2 bg-eastdigital-orange/[0.05] border border-eastdigital-orange/[0.08] rounded-full mb-8 backdrop-blur-xl">
            <span className="text-eastdigital-orange text-sm font-medium tracking-widest uppercase">Our Mission</span>
          </div>
          <h2 className="font-bold text-white mb-6 leading-tight lg:text-4xl text-2xl text-center">Turning Real Estate Vision into Digital Reality</h2>
          <p className="max-w-4xl mx-auto leading-relaxed text-eastdigital-lightgray font-light text-base text-center">At East Digital, we bring real estate concepts to life through immersive visuals, performance-driven marketing, and smart digital solutions. Our services—ranging from 3D architectural rendering and VR walkthroughs to targeted ad campaigns and corporate branding—are tailored to help developers, architects, brokers, and brands stand out in a competitive market.</p>
        </div>

        {/* Mission Cards Grid - Modern Layout */}
        

        {/* Call to Action */}
        
      </div>
    </section>;
};