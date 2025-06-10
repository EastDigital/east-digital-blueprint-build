
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

  return (
    <section className="relative bg-eastdigital-dark overflow-hidden py-0 lg:py-[100px]">
      {/* Liquid Glass Background Animation */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 right-10 w-96 h-96 bg-gradient-to-br from-eastdigital-orange/15 via-transparent to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-tl from-blue-500/12 via-eastdigital-orange/8 to-transparent rounded-full blur-3xl animate-pulse" style={{
          animationDelay: '3s'
        }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-eastdigital-orange/10 border border-eastdigital-orange/20 rounded-full mb-6 backdrop-blur-xl">
            <span className="text-eastdigital-orange text-sm font-medium tracking-wider uppercase">Our Methodology</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight lg:text-4xl">
            Our Approach
          </h2>
          <p className="text-xl text-eastdigital-lightgray max-w-4xl mx-auto leading-relaxed lg:text-lg font-light">
            We combine industry-specific insights with creative expertise to deliver specialized 3D visualizations, targeted digital marketing, and impactful branding solutions. Our approach ensures your projects not only meet today's goals but are also primed for tomorrow's opportunities.
          </p>
        </div>

        {/* Approach Grid with Liquid Glass Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mb-16">
          {approaches.map((approach, index) => (
            <LiquidGlassCard
              key={index}
              variant="default"
              className="p-8 group"
              interactive={true}
            >
              {/* Icon with Liquid Glass Effect */}
              <div className="w-16 h-16 bg-gradient-to-br from-eastdigital-orange/20 to-eastdigital-orange/10 rounded-2xl border border-eastdigital-orange/30 flex items-center justify-center mb-6 backdrop-blur-xl group-hover:from-eastdigital-orange/30 group-hover:to-eastdigital-orange/20 group-hover:scale-110 transition-all duration-300">
                <approach.icon className="h-8 w-8 text-eastdigital-orange" />
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-bold text-white mb-4 group-hover:text-eastdigital-orange transition-colors duration-300">
                {approach.title}
              </h3>
              <p className="text-eastdigital-lightgray leading-relaxed">
                {approach.description}
              </p>

              {/* Enhanced bottom glow */}
              <div className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-eastdigital-orange/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </LiquidGlassCard>
          ))}
        </div>

        {/* CTA with Liquid Glass Buttons */}
        <div className="text-center">
          <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
            Ready to Experience Our Approach?
          </h3>
          <p className="text-eastdigital-lightgray mb-8 max-w-2xl mx-auto">
            Let's discuss how our proven methodology can accelerate your digital transformation and deliver exceptional results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <LiquidGlassButton 
              variant="primary" 
              size="lg"
              className="px-8 py-3 text-lg font-medium"
            >
              Get Your Blueprint
            </LiquidGlassButton>
            <LiquidGlassButton 
              variant="secondary" 
              size="lg"
              className="px-8 py-3 text-lg font-medium"
            >
              View Our Process
            </LiquidGlassButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
