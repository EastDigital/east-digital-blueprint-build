import React, { useState } from 'react';
import { Building2, HardHat, Ruler, Briefcase, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

const industries = [
  {
    id: 'real-estate',
    title: 'Real Estate',
    subtitle: 'Luxury Developments & Commercial Properties',
    icon: Building2,
    description: 'Transform property marketing with immersive 3D visualizations, virtual tours, and targeted digital campaigns.',
    projects: '45+',
    metric: '285%',
    metricLabel: 'Engagement Increase',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1515263487990-61b07816b924?w=800&h=600&fit=crop'
    ],
    color: 'blue'
  },
  {
    id: 'engineering',
    title: 'Engineering & Product',
    subtitle: 'Infrastructure & Industrial Projects',
    icon: HardHat,
    description: 'Showcase complex engineering solutions with detailed technical visualizations and progress tracking systems.',
    projects: '32+',
    metric: '40%',
    metricLabel: 'Reduced Delays',
    images: [
      'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&h=600&fit=crop'
    ],
    color: 'orange'
  },
  {
    id: 'architecture',
    title: 'Architecture',
    subtitle: 'Residential & Commercial Design',
    icon: Ruler,
    description: 'Bring architectural visions to life with photorealistic renderings and interactive design presentations.',
    projects: '58+',
    metric: '96%',
    metricLabel: 'Client Approval Rate',
    images: [
      'https://images.unsplash.com/photo-1496307653780-42ee777d4833?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop'
    ],
    color: 'purple'
  },
  {
    id: 'corporates',
    title: 'Corporate',
    subtitle: 'Enterprise Solutions & Brand Development',
    icon: Briefcase,
    description: 'Elevate corporate presence with comprehensive digital strategies and enterprise-level solutions.',
    projects: '73+',
    metric: '320%',
    metricLabel: 'ROI Increase',
    images: [
      'https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=600&fit=crop'
    ],
    color: 'emerald'
  }
];

const colorVariants = {
  blue: {
    gradient: 'from-blue-500/10 via-blue-500/5 to-transparent',
    border: 'border-blue-500/20',
    icon: 'text-blue-400',
    accent: 'text-blue-400'
  },
  orange: {
    gradient: 'from-orange-500/10 via-orange-500/5 to-transparent',
    border: 'border-orange-500/20',
    icon: 'text-orange-400',
    accent: 'text-orange-400'
  },
  purple: {
    gradient: 'from-purple-500/10 via-purple-500/5 to-transparent',
    border: 'border-purple-500/20',
    icon: 'text-purple-400',
    accent: 'text-purple-400'
  },
  emerald: {
    gradient: 'from-emerald-500/10 via-emerald-500/5 to-transparent',
    border: 'border-emerald-500/20',
    icon: 'text-emerald-400',
    accent: 'text-emerald-400'
  }
};

export const IndustrySection = () => {
  const [activeIndustry, setActiveIndustry] = useState(0);
  const activeData = industries[activeIndustry];
  const colorScheme = colorVariants[activeData.color];

  return (
    <section className="relative py-24 lg:py-32 bg-gradient-to-b from-eastdigital-dark via-gray-900/50 to-eastdigital-dark">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-eastdigital-orange/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-500/15 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Header - Centered and Elegant */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-6 py-2 bg-eastdigital-orange/10 border border-eastdigital-orange/20 rounded-full mb-8">
            <span className="text-eastdigital-orange text-sm font-medium tracking-widest uppercase">Industry Expertise</span>
          </div>
          <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Transforming Industries
          </h2>
          <p className="text-xl text-eastdigital-lightgray max-w-3xl mx-auto leading-relaxed">
            Delivering exceptional results across diverse sectors with tailored solutions that drive innovation and growth.
          </p>
        </div>

        {/* Main Content Grid - Perfect Symmetry */}
        <div className="grid lg:grid-cols-12 gap-12 items-start mb-20">
          {/* Left Side - Industry Navigation (6 columns) */}
          <div className="lg:col-span-6">
            <div className="space-y-4">
              {industries.map((industry, index) => {
                const Icon = industry.icon;
                const isActive = activeIndustry === index;
                const colors = colorVariants[industry.color];
                
                return (
                  <div
                    key={industry.id}
                    className={`group cursor-pointer transition-all duration-500 ${
                      isActive ? 'scale-[1.02]' : 'hover:scale-[1.01]'
                    }`}
                    onClick={() => setActiveIndustry(index)}
                  >
                    <div className={`relative bg-gradient-to-r ${colors.gradient} backdrop-blur-sm border ${colors.border} rounded-2xl p-6 transition-all duration-500 ${
                      isActive 
                        ? 'shadow-xl shadow-eastdigital-orange/10 border-eastdigital-orange/30' 
                        : 'hover:shadow-lg hover:shadow-eastdigital-orange/5'
                    }`}>
                      <div className="flex items-center gap-4">
                        {/* Icon */}
                        <div className={`w-14 h-14 bg-gray-800/50 rounded-xl flex items-center justify-center transition-all duration-300 ${
                          isActive ? 'scale-110 bg-eastdigital-orange/10' : 'group-hover:scale-105'
                        }`}>
                          <Icon className={`h-7 w-7 ${isActive ? 'text-eastdigital-orange' : colors.icon}`} />
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1">
                          <h3 className={`text-lg font-bold transition-colors duration-300 ${
                            isActive ? 'text-eastdigital-orange' : 'text-white group-hover:text-eastdigital-orange'
                          }`}>
                            {industry.title}
                          </h3>
                          <p className="text-eastdigital-lightgray text-sm">
                            {industry.subtitle}
                          </p>
                        </div>
                        
                        {/* Arrow Indicator */}
                        <ArrowRight className={`h-5 w-5 transition-all duration-300 ${
                          isActive 
                            ? 'text-eastdigital-orange translate-x-1' 
                            : 'text-gray-500 group-hover:text-eastdigital-orange group-hover:translate-x-1'
                        }`} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Side - Featured Content with Scrollable Images (6 columns) */}
          <div className="lg:col-span-6">
            <div className="relative">
              {/* Scrollable Images Carousel */}
              <div className="relative mb-6">
                <Carousel className="w-full">
                  <CarouselContent>
                    {activeData.images.map((image, index) => (
                      <CarouselItem key={index}>
                        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                          <img 
                            src={image}
                            alt={`${activeData.title} project ${index + 1}`}
                            className="w-full h-full object-cover transition-all duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                          
                          {/* Image Overlay Content */}
                          <div className="absolute bottom-6 left-6 right-6">
                            <div className={`bg-gradient-to-r ${colorScheme.gradient} backdrop-blur-md rounded-xl p-6 border ${colorScheme.border}`}>
                              <h4 className="text-white text-xl font-bold mb-2">
                                {activeData.title} Excellence
                              </h4>
                              <p className="text-gray-200 text-sm mb-4">
                                {activeData.description}
                              </p>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                  <div>
                                    <div className={`text-2xl font-bold ${colorScheme.accent}`}>
                                      {activeData.projects}
                                    </div>
                                    <div className="text-xs text-gray-300">Projects</div>
                                  </div>
                                  <div className="w-px h-8 bg-gray-600"></div>
                                  <div>
                                    <div className={`text-2xl font-bold ${colorScheme.accent}`}>
                                      {activeData.metric}
                                    </div>
                                    <div className="text-xs text-gray-300">{activeData.metricLabel}</div>
                                  </div>
                                </div>
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
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-4 bg-black/50 border-white/20 text-white hover:bg-black/70" />
                  <CarouselNext className="right-4 bg-black/50 border-white/20 text-white hover:bg-black/70" />
                </Carousel>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA - Centered and Balanced */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-12 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-4">
              Ready to Transform Your Industry?
            </h3>
            <p className="text-eastdigital-lightgray mb-8 max-w-2xl mx-auto text-lg">
              Join industry leaders who trust East Digital™ to deliver exceptional results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-eastdigital-orange hover:bg-eastdigital-orange/90 text-white px-8 py-3 text-lg rounded-full transition-all duration-300">
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
