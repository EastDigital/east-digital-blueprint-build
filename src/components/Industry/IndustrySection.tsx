
import React, { useState } from 'react';
import { Building2, HardHat, Ruler, Briefcase, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const industries = [
  {
    id: 'real-estate',
    title: 'Real Estate',
    subtitle: 'Luxury Developments & Commercial Properties',
    icon: Building2,
    description: 'Transform property marketing with immersive 3D visualizations, virtual tours, and targeted digital campaigns that drive pre-sales and accelerate closings.',
    projects: '45+ Projects',
    highlight: 'Average 285% increase in engagement',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop',
    gradient: 'from-blue-600/20 to-cyan-600/20',
    borderColor: 'border-blue-500/30',
    iconColor: 'text-blue-400'
  },
  {
    id: 'engineering',
    title: 'Engineering',
    subtitle: 'Infrastructure & Industrial Projects',
    icon: HardHat,
    description: 'Showcase complex engineering solutions with detailed technical visualizations, progress tracking systems, and stakeholder communication platforms.',
    projects: '32+ Projects',
    highlight: 'Reduced project delays by 40%',
    image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600&h=400&fit=crop',
    gradient: 'from-orange-600/20 to-red-600/20',
    borderColor: 'border-orange-500/30',
    iconColor: 'text-orange-400'
  },
  {
    id: 'architecture',
    title: 'Architecture',
    subtitle: 'Residential & Commercial Design',
    icon: Ruler,
    description: 'Bring architectural visions to life with photorealistic renderings, interactive design presentations, and client collaboration tools.',
    projects: '58+ Projects',
    highlight: 'Client approval rate of 96%',
    image: 'https://images.unsplash.com/photo-1496307653780-42ee777d4833?w=600&h=400&fit=crop',
    gradient: 'from-purple-600/20 to-pink-600/20',
    borderColor: 'border-purple-500/30',
    iconColor: 'text-purple-400'
  },
  {
    id: 'corporates',
    title: 'Corporates',
    subtitle: 'Enterprise Solutions & Brand Development',
    icon: Briefcase,
    description: 'Elevate corporate presence with comprehensive digital strategies, brand development, and enterprise-level marketing solutions.',
    projects: '73+ Projects',
    highlight: 'Average ROI increase of 320%',
    image: 'https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?w=600&h=400&fit=crop',
    gradient: 'from-emerald-600/20 to-teal-600/20',
    borderColor: 'border-emerald-500/30',
    iconColor: 'text-emerald-400'
  }
];

export const IndustrySection = () => {
  const [activeIndustry, setActiveIndustry] = useState(0);

  return (
    <section className="relative py-20 lg:py-32 bg-gradient-to-br from-gray-900 via-eastdigital-dark to-gray-900 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-eastdigital-orange/30 to-purple-600/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-tr from-blue-600/30 to-eastdigital-orange/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-eastdigital-orange/10 border border-eastdigital-orange/20 rounded-full mb-6">
            <span className="text-eastdigital-orange text-sm font-medium tracking-wider uppercase">Industry Expertise</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Transforming Industries,<br />
            <span className="bg-gradient-to-r from-eastdigital-orange to-eastdigital-hover bg-clip-text text-transparent">
              One Project at a Time
            </span>
          </h2>
          <p className="text-xl lg:text-2xl text-eastdigital-lightgray max-w-4xl mx-auto leading-relaxed">
            From luxury real estate to cutting-edge engineering, we deliver tailored solutions that drive results across diverse industries.
          </p>
        </div>

        {/* Industry Showcase */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
          {/* Left Side - Industry Cards */}
          <div className="space-y-6">
            {industries.map((industry, index) => {
              const Icon = industry.icon;
              const isActive = activeIndustry === index;
              
              return (
                <div
                  key={industry.id}
                  className={`group cursor-pointer transition-all duration-500 ${
                    isActive 
                      ? 'scale-105' 
                      : 'hover:scale-102'
                  }`}
                  onClick={() => setActiveIndustry(index)}
                >
                  <div className={`relative bg-gradient-to-br ${industry.gradient} backdrop-blur-sm border ${industry.borderColor} rounded-2xl p-6 lg:p-8 transition-all duration-500 ${
                    isActive 
                      ? 'shadow-2xl shadow-eastdigital-orange/20' 
                      : 'hover:shadow-xl hover:shadow-eastdigital-orange/10'
                  }`}>
                    {/* Active Indicator */}
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-r from-eastdigital-orange/5 to-transparent rounded-2xl"></div>
                    )}
                    
                    <div className="relative flex items-start gap-4">
                      {/* Icon */}
                      <div className={`w-16 h-16 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                        isActive ? 'scale-110' : 'group-hover:scale-105'
                      }`}>
                        <Icon className={`h-8 w-8 ${industry.iconColor}`} />
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className={`text-xl lg:text-2xl font-bold transition-colors duration-300 ${
                            isActive ? 'text-eastdigital-orange' : 'text-white group-hover:text-eastdigital-orange'
                          }`}>
                            {industry.title}
                          </h3>
                          <ChevronRight className={`h-5 w-5 transition-all duration-300 ${
                            isActive 
                              ? 'text-eastdigital-orange rotate-90' 
                              : 'text-gray-400 group-hover:text-eastdigital-orange group-hover:translate-x-1'
                          }`} />
                        </div>
                        <p className="text-eastdigital-lightgray text-sm lg:text-base mb-3">
                          {industry.subtitle}
                        </p>
                        <p className={`text-gray-300 leading-relaxed transition-all duration-300 ${
                          isActive ? 'opacity-100' : 'opacity-70'
                        }`}>
                          {industry.description}
                        </p>
                        
                        {/* Stats */}
                        <div className="flex items-center gap-6 mt-4 pt-4 border-t border-gray-700/50">
                          <div>
                            <div className="text-eastdigital-orange font-semibold text-sm">{industry.projects}</div>
                          </div>
                          <div className="flex-1">
                            <div className="text-gray-300 text-sm">{industry.highlight}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Side - Featured Image */}
          <div className="relative">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden">
              <img 
                src={industries[activeIndustry].image}
                alt={industries[activeIndustry].title}
                className="w-full h-full object-cover transition-all duration-700"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              
              {/* Content Overlay */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <h4 className="text-white text-xl font-bold mb-2">
                    {industries[activeIndustry].title} Excellence
                  </h4>
                  <p className="text-gray-200 text-sm mb-4">
                    Delivering exceptional results through innovative solutions and strategic execution.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-eastdigital-orange font-semibold">
                      {industries[activeIndustry].projects}
                    </span>
                    <Button 
                      size="sm" 
                      className="bg-eastdigital-orange/20 hover:bg-eastdigital-orange/30 text-eastdigital-orange border border-eastdigital-orange/30 rounded-full px-4"
                    >
                      View Projects
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-eastdigital-orange/20 to-purple-600/20 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-blue-600/20 to-eastdigital-orange/20 rounded-full blur-2xl"></div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-eastdigital-orange/10 to-purple-600/10 border border-eastdigital-orange/20 rounded-3xl p-8 lg:p-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
              Ready to Transform Your Industry?
            </h3>
            <p className="text-eastdigital-lightgray mb-8 max-w-2xl mx-auto">
              Join industry leaders who trust East Digital™ to deliver exceptional results. Let's discuss how we can elevate your next project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-eastdigital-orange hover:bg-eastdigital-orange/90 text-white px-8 py-3 text-lg rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-eastdigital-orange/30">
                Explore Our Work
              </Button>
              <Button variant="outline" className="border-eastdigital-orange text-eastdigital-orange hover:bg-eastdigital-orange hover:text-white px-8 py-3 text-lg rounded-full transition-all duration-300">
                Schedule Consultation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustrySection;
