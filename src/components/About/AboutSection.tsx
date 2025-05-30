import React from 'react';
import { Button } from '@/components/ui/button';
import { Target, Lightbulb, Rocket, Users, Zap, Shield } from 'lucide-react';
export const AboutSection = () => {
  const approaches = [{
    icon: Target,
    title: "Strategic Precision",
    description: "We don't just create—we strategize. Every project begins with deep market research and competitive analysis to ensure your vision aligns with market opportunities."
  }, {
    icon: Lightbulb,
    title: "Innovation-First Mindset",
    description: "Leveraging cutting-edge technologies and creative solutions, we transform complex challenges into breakthrough digital experiences that set you apart."
  }, {
    icon: Rocket,
    title: "Accelerated Delivery",
    description: "Our streamlined processes and agile methodology ensure rapid deployment without compromising quality, getting you to market faster than traditional approaches."
  }, {
    icon: Users,
    title: "Collaborative Partnership",
    description: "We believe in transparent communication and collaborative decision-making, ensuring you're involved in every critical milestone of your project journey."
  }, {
    icon: Zap,
    title: "Performance Optimization",
    description: "Every solution is built for scale and performance, utilizing modern architectures and best practices to ensure your digital assets perform flawlessly."
  }, {
    icon: Shield,
    title: "Future-Proof Solutions",
    description: "We design with tomorrow in mind, creating scalable solutions that adapt to evolving market demands and technological advancements."
  }];
  return <section className="relative bg-eastdigital-dark overflow-hidden py-0 lg:py-[100px]">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-10 right-10 w-40 h-40 bg-gradient-to-br from-eastdigital-orange/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-32 h-32 bg-gradient-to-tr from-eastdigital-orange/15 to-transparent rounded-full blur-2xl animate-pulse" style={{
        animationDelay: '3s'
      }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-eastdigital-orange/10 border border-eastdigital-orange/20 rounded-full mb-6">
            <span className="text-eastdigital-orange text-sm font-medium tracking-wider uppercase">Our Methodology</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight lg:text-4xl">
            Our Approach
          </h2>
          <p className="text-xl text-eastdigital-lightgray max-w-4xl mx-auto leading-relaxed lg:text-lg font-light">We combine industry-specific insights with creative expertise to deliver specialized 3D visualizations, targeted digital marketing, and impactful branding solutions. Our approach ensures your projects not only meet today's goals but are also primed for tomorrow's opportunities.</p>
        </div>

        {/* Approach Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mb-16">
          {approaches.map((approach, index) => <div key={index} className="group relative bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-8 hover:border-eastdigital-orange/30 transition-all duration-300 hover:transform hover:scale-105">
              {/* Icon */}
              <div className="w-16 h-16 bg-gradient-to-br from-eastdigital-orange to-eastdigital-orange/80 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <approach.icon className="h-8 w-8 text-white" />
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-bold text-white mb-4 group-hover:text-eastdigital-orange transition-colors duration-300">
                {approach.title}
              </h3>
              <p className="text-eastdigital-lightgray leading-relaxed">
                {approach.description}
              </p>

              {/* Hover Effect Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-eastdigital-orange/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none"></div>
            </div>)}
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-eastdigital-orange/10 to-eastdigital-orange/5 border border-eastdigital-orange/20 rounded-3xl p-8 lg:p-12 mb-16">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl lg:text-5xl font-bold text-eastdigital-orange mb-2">150+</div>
              <div className="text-white font-medium">Projects Delivered</div>
              <div className="text-eastdigital-lightgray text-sm mt-1">Across multiple industries</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold text-eastdigital-orange mb-2">98%</div>
              <div className="text-white font-medium">Client Satisfaction</div>
              <div className="text-eastdigital-lightgray text-sm mt-1">Long-term partnerships</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold text-eastdigital-orange mb-2">45%</div>
              <div className="text-white font-medium">Faster Delivery</div>
              <div className="text-eastdigital-lightgray text-sm mt-1">Than industry average</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
            Ready to Experience Our Approach?
          </h3>
          <p className="text-eastdigital-lightgray mb-8 max-w-2xl mx-auto">
            Let's discuss how our proven methodology can accelerate your digital transformation and deliver exceptional results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-eastdigital-orange hover:bg-eastdigital-orange/90 text-white px-8 py-3 text-lg rounded-[60px] transition-all duration-300 hover:shadow-lg hover:shadow-eastdigital-orange/30">
              Get Your Blueprint
            </Button>
            <Button variant="outline" className="border-eastdigital-orange text-eastdigital-orange hover:bg-eastdigital-orange hover:text-white px-8 py-3 text-lg rounded-[60px] transition-all duration-300">
              View Our Process
            </Button>
          </div>
        </div>
      </div>
    </section>;
};
export default AboutSection;