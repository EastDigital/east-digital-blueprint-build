
import React, { useState, useEffect } from 'react';
import { Building2, HardHat, Ruler, Briefcase, Factory, Home, Wrench, Laptop, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import type { CarouselApi } from '@/components/ui/carousel';
import { supabase } from '@/integrations/supabase/client';

// Icon mapping
const iconMapping = {
  Building2,
  HardHat,
  Ruler,
  Briefcase,
  Factory,
  Home,
  Wrench,
  Laptop,
};

interface Industry {
  id: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  icon_name: string;
  projects_count: string | null;
  metric: string | null;
  metric_label: string | null;
  images: string[] | null;
  color: string;
  display_order: number;
  is_active: boolean;
}

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
  },
  red: {
    gradient: 'from-red-500/10 via-red-500/5 to-transparent',
    border: 'border-red-500/20',
    icon: 'text-red-400',
    accent: 'text-red-400'
  },
  yellow: {
    gradient: 'from-yellow-500/10 via-yellow-500/5 to-transparent',
    border: 'border-yellow-500/20',
    icon: 'text-yellow-400',
    accent: 'text-yellow-400'
  },
  green: {
    gradient: 'from-green-500/10 via-green-500/5 to-transparent',
    border: 'border-green-500/20',
    icon: 'text-green-400',
    accent: 'text-green-400'
  },
  pink: {
    gradient: 'from-pink-500/10 via-pink-500/5 to-transparent',
    border: 'border-pink-500/20',
    icon: 'text-pink-400',
    accent: 'text-pink-400'
  }
};

export const IndustrySection = () => {
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [activeIndustry, setActiveIndustry] = useState(0);
  const [api, setApi] = useState<CarouselApi>();
  const [isPaused, setIsPaused] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch industries from database
  useEffect(() => {
    const fetchIndustries = async () => {
      try {
        const { data, error } = await supabase
          .from('industries')
          .select('*')
          .eq('is_active', true)
          .order('display_order', { ascending: true });

        if (error) {
          console.error('Error fetching industries:', error);
          return;
        }

        setIndustries(data || []);
      } catch (error) {
        console.error('Error fetching industries:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchIndustries();
  }, []);

  // Reset active industry when industries change
  useEffect(() => {
    if (industries.length > 0 && activeIndustry >= industries.length) {
      setActiveIndustry(0);
    }
  }, [industries, activeIndustry]);

  const activeData = industries[activeIndustry];
  const colorScheme = activeData ? colorVariants[activeData.color as keyof typeof colorVariants] || colorVariants.blue : colorVariants.blue;

  // Auto-scroll functionality for images only
  useEffect(() => {
    if (!api || isPaused || !activeData?.images?.length) return;
    const interval = setInterval(() => {
      api.scrollNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [api, isPaused, activeData]);

  // Reset carousel to first image when industry changes
  useEffect(() => {
    if (!api) return;
    api.scrollTo(0);
  }, [api, activeIndustry]);

  if (loading) {
    return (
      <section className="relative py-24 lg:py-32 bg-gradient-to-b from-eastdigital-dark via-gray-900/50 to-eastdigital-dark">
        <div className="container mx-auto px-4">
          <div className="text-center text-white">Loading industries...</div>
        </div>
      </section>
    );
  }

  if (industries.length === 0) {
    return (
      <section className="relative py-24 lg:py-32 bg-gradient-to-b from-eastdigital-dark via-gray-900/50 to-eastdigital-dark">
        <div className="container mx-auto px-4">
          <div className="text-center text-white">No industries available.</div>
        </div>
      </section>
    );
  }

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
          <h2 className="text-5xl font-bold text-white mb-6 leading-tight lg:text-4xl">
            Transforming Industries
          </h2>
          <p className="text-eastdigital-lightgray max-w-3xl mx-auto leading-relaxed text-lg">
            Delivering exceptional results across diverse sectors with tailored solutions that drive innovation and growth.
          </p>
        </div>

        {/* Main Content Grid - Perfect Symmetry */}
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left Side - Industry Navigation (6 columns) */}
          <div className="lg:col-span-6">
            <div className="space-y-4">
              {industries.map((industry, index) => {
                const Icon = iconMapping[industry.icon_name as keyof typeof iconMapping] || Building2;
                const isActive = activeIndustry === index;
                const colors = colorVariants[industry.color as keyof typeof colorVariants] || colorVariants.blue;
                
                return (
                  <div 
                    key={industry.id} 
                    className={`group cursor-pointer transition-all duration-500 ${isActive ? 'scale-[1.02]' : 'hover:scale-[1.01]'}`} 
                    onClick={() => setActiveIndustry(index)}
                  >
                    <div className={`relative bg-gradient-to-r ${colors.gradient} backdrop-blur-sm border ${colors.border} rounded-2xl p-6 transition-all duration-500 ${isActive ? 'shadow-xl shadow-eastdigital-orange/10 border-eastdigital-orange/30' : 'hover:shadow-lg hover:shadow-eastdigital-orange/5'}`}>
                      <div className="flex items-center gap-4">
                        {/* Icon */}
                        <div className={`w-14 h-14 bg-gray-800/50 rounded-xl flex items-center justify-center transition-all duration-300 ${isActive ? 'scale-110 bg-eastdigital-orange/10' : 'group-hover:scale-105'}`}>
                          <Icon className={`h-7 w-7 ${isActive ? 'text-eastdigital-orange' : colors.icon}`} />
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1">
                          <h3 className={`text-lg font-bold transition-colors duration-300 ${isActive ? 'text-eastdigital-orange' : 'text-white group-hover:text-eastdigital-orange'}`}>
                            {industry.title}
                          </h3>
                          <p className="text-eastdigital-lightgray text-sm">
                            {industry.subtitle}
                          </p>
                        </div>
                        
                        {/* Arrow Indicator */}
                        <ArrowRight className={`h-5 w-5 transition-all duration-300 ${isActive ? 'text-eastdigital-orange translate-x-1' : 'text-gray-500 group-hover:text-eastdigital-orange group-hover:translate-x-1'}`} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Side - Auto-rotating Images with Fixed Text (6 columns) */}
          <div className="lg:col-span-6">
            {activeData && (
              <div className="relative">
                {/* Auto-rotating Images Carousel */}
                {activeData.images && activeData.images.length > 0 && (
                  <div className="relative mb-6">
                    <Carousel 
                      className="w-full" 
                      setApi={setApi} 
                      opts={{ align: "start", loop: true }} 
                      onMouseEnter={() => setIsPaused(true)} 
                      onMouseLeave={() => setIsPaused(false)}
                    >
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
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious className="left-4 bg-black/50 border-white/20 text-white hover:bg-black/70" />
                      <CarouselNext className="right-4 bg-black/50 border-white/20 text-white hover:bg-black/70" />
                    </Carousel>
                  </div>
                )}

                {/* Fixed Text Content Below Carousel */}
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
                          {activeData.projects_count}
                        </div>
                        <div className="text-xs text-gray-300">Projects</div>
                      </div>
                      {activeData.metric && (
                        <>
                          <div className="w-px h-8 bg-gray-600"></div>
                          <div>
                            <div className={`text-2xl font-bold ${colorScheme.accent}`}>
                              {activeData.metric}
                            </div>
                            <div className="text-xs text-gray-300">{activeData.metric_label}</div>
                          </div>
                        </>
                      )}
                    </div>
                    <Button size="sm" className="bg-eastdigital-orange/20 hover:bg-eastdigital-orange/30 text-eastdigital-orange border border-eastdigital-orange/30 rounded-full px-4">
                      View Projects
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustrySection;
