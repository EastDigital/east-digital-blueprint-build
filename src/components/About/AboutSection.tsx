import React from 'react';
import { LiquidGlassCard } from '@/components/LiquidGlass/LiquidGlassCard';
import { LiquidGlassButton } from '@/components/LiquidGlass/LiquidGlassButton';
import { Target, Lightbulb, Rocket, Users, Zap, Shield } from 'lucide-react';
export const AboutSection = () => {
  const approaches = [{
    icon: Target,
    title: "Strategic Precision",
    description: "Research aligns your 3D visuals, marketing, or branding with market opportunities and audience needs."
  }, {
    icon: Lightbulb,
    title: "Innovation-First Mindset",
    description: "Cutting-edge tech and creative ideas deliver standout 3D, marketing, and branding solutions for you."
  }, {
    icon: Rocket,
    title: "Accelerated Delivery",
    description: "Efficient processes mean timely delivery of quality 3D renderings, campaigns, or branding, meeting deadlines."
  }, {
    icon: Users,
    title: "Collaborative Partnership",
    description: "Close teamwork ensures your vision guides every 3D, marketing, or branding project we undertake together."
  }, {
    icon: Zap,
    title: "Performance Optimization",
    description: "Your 3D visuals, marketing, and branding are all optimized for maximum engagement and impactful results."
  }, {
    icon: Shield,
    title: "Future-Proof Solutions",
    description: "We create adaptable 3D, marketing, and branding solutions, designed to scale for future industry demands."
  }];
  return <section className="relative bg-gradient-to-b from-black via-zinc-950 to-black overflow-hidden py-0 lg:py-[100px]">
      {/* Enhanced Liquid Glass Background with Realistic Reflections */}
      <div className="absolute inset-0 opacity-35">
        <div className="absolute top-10 right-10 w-96 h-96 bg-gradient-to-br from-eastdigital-orange/10 via-white/3 to-purple-500/6 rounded-full blur-4xl animate-pulse">
          <div className="absolute inset-12 bg-gradient-to-tl from-white/6 via-transparent to-eastdigital-orange/4 rounded-full blur-2xl"></div>
          <div className="absolute top-16 right-20 w-20 h-20 bg-white/12 rounded-full blur-xl"></div>
        </div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-tl from-blue-500/8 via-eastdigital-orange/5 to-white/3 rounded-full blur-4xl animate-pulse" style={{
        animationDelay: '3s'
      }}>
          <div className="absolute inset-8 bg-gradient-to-br from-eastdigital-orange/5 via-transparent to-white/4 rounded-full blur-xl"></div>
          <div className="absolute bottom-12 left-16 w-16 h-16 bg-eastdigital-orange/15 rounded-full blur-lg"></div>
        </div>
        
        {/* Additional depth layers */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-radial from-white/[0.015] via-transparent to-transparent pointer-events-none"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Header with Enhanced Glass Styling */}
        <div className="text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-eastdigital-orange/8 via-eastdigital-orange/12 to-eastdigital-orange/8 border border-eastdigital-orange/15 rounded-full mb-6 backdrop-blur-2xl shadow-lg shadow-eastdigital-orange/10">
            <span className="text-eastdigital-orange text-sm font-medium tracking-wider uppercase text-center">Our Methodology</span>
          </div>
          <h2 className="md:text-5xl font-bold text-white mb-6 leading-tight lg:text-4xl drop-shadow-2xl text-2xl text-left">
            Our Approach
          </h2>
          <p className="text-xl text-eastdigital-lightgray max-w-4xl mx-auto leading-relaxed lg:text-lg font-light opacity-90 text-left">
            We combine industry-specific insights with creative expertise to deliver specialized 3D visualizations, targeted digital marketing, and impactful branding solutions. Our approach ensures your projects not only meet today's goals but are also primed for tomorrow's opportunities.
          </p>
        </div>

        {/* Approach Grid with Enhanced Liquid Glass Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mb-16">
          {approaches.map((approach, index) => <LiquidGlassCard key={index} variant="default" className="p-8 group" interactive={true}>
              {/* Enhanced Icon with Multiple Reflection Layers */}
              <div className="w-16 h-16 bg-gradient-to-br from-eastdigital-orange/15 via-eastdigital-orange/8 to-white/5 rounded-2xl border border-eastdigital-orange/20 flex items-center justify-center mb-6 backdrop-blur-2xl group-hover:from-eastdigital-orange/25 group-hover:to-eastdigital-orange/15 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-eastdigital-orange/20 transition-all duration-300 relative">
                <approach.icon className="h-8 w-8 text-eastdigital-orange relative z-10" />
                {/* Icon glass reflection */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/12 via-transparent to-transparent rounded-2xl pointer-events-none"></div>
                <div className="absolute top-1 right-1 w-3 h-3 bg-white/20 rounded-full blur-sm pointer-events-none"></div>
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-bold text-white mb-4 group-hover:text-eastdigital-orange transition-colors duration-300">
                {approach.title}
              </h3>
              <p className="text-eastdigital-lightgray leading-relaxed">
                {approach.description}
              </p>

              {/* Enhanced bottom glow with reflection */}
              <div className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-eastdigital-orange/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-lg shadow-eastdigital-orange/20"></div>
            </LiquidGlassCard>)}
        </div>

        {/* CTA with Enhanced Liquid Glass Buttons */}
        <div className="text-center">
          <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4 drop-shadow-xl text-left">
            Ready to Experience Our Approach?
          </h3>
          <p className="text-eastdigital-lightgray mb-8 max-w-2xl mx-auto opacity-90 text-lg text-left">
            Let's discuss how our proven methodology can accelerate your digital transformation and deliver exceptional results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <LiquidGlassButton variant="primary" size="lg" className="px-8 py-3 text-lg font-medium shadow-lg hover:shadow-xl hover:shadow-eastdigital-orange/20 transition-shadow duration-300">
              Get Your Blueprint
            </LiquidGlassButton>
            <LiquidGlassButton variant="secondary" size="lg" className="px-8 py-3 text-lg font-medium shadow-lg hover:shadow-xl hover:shadow-white/10 transition-shadow duration-300">
              View Our Process
            </LiquidGlassButton>
          </div>
        </div>
      </div>
    </section>;
};
export default AboutSection;