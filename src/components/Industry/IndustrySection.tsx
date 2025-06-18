
import React, { useState, useEffect } from 'react';
import { Building2, HardHat, Ruler, Briefcase, Factory, Home, Wrench, Laptop, ArrowRight, ChevronDown } from 'lucide-react';
import { LiquidGlassCard } from '@/components/LiquidGlass/LiquidGlassCard';
import { LiquidGlassButton } from '@/components/LiquidGlass/LiquidGlassButton';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import type { CarouselApi } from '@/components/ui/carousel';
import { supabase } from '@/integrations/supabase/client';
import { SubtleBackground } from '@/components/common/SubtleBackground';

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
    gradient: 'from-blue-500/15 to-blue-500/5',
    glow: 'shadow-blue-500/25',
    text: 'text-blue-400',
    border: 'border-blue-500/30'
  },
  orange: {
    gradient: 'from-orange-500/15 to-orange-500/5',
    glow: 'shadow-orange-500/25',
    text: 'text-orange-400',
    border: 'border-orange-500/30'
  },
  purple: {
    gradient: 'from-purple-500/15 to-purple-500/5',
    glow: 'shadow-purple-500/25',
    text: 'text-purple-400',
    border: 'border-purple-500/30'
  },
  emerald: {
    gradient: 'from-emerald-500/15 to-emerald-500/5',
    glow: 'shadow-emerald-500/25',
    text: 'text-emerald-400',
    border: 'border-emerald-500/30'
  },
  red: {
    gradient: 'from-red-500/15 to-red-500/5',
    glow: 'shadow-red-500/25',
    text: 'text-red-400',
    border: 'border-red-500/30'
  },
  yellow: {
    gradient: 'from-yellow-500/15 to-yellow-500/5',
    glow: 'shadow-yellow-500/25',
    text: 'text-yellow-400',
    border: 'border-yellow-500/30'
  },
  green: {
    gradient: 'from-green-500/15 to-green-500/5',
    glow: 'shadow-green-500/25',
    text: 'text-green-400',
    border: 'border-green-500/30'
  },
  pink: {
    gradient: 'from-pink-500/15 to-pink-500/5',
    glow: 'shadow-pink-500/25',
    text: 'text-pink-400',
    border: 'border-pink-500/30'
  }
};

export const IndustrySection = () => {
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [activeIndustry, setActiveIndustry] = useState(0);
  const [api, setApi] = useState<CarouselApi>();
  const [isPaused, setIsPaused] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

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
  const colorScheme = activeData ? colorVariants[activeData.color as keyof typeof colorVariants] || colorVariants.orange : colorVariants.orange;

  // Auto-scroll functionality for images only
  useEffect(() => {
    if (!api || isPaused || !activeData?.images?.length) return;
    const interval = setInterval(() => {
      api.scrollNext();
    }, 4000);

    return () => clearInterval(interval);
  }, [api, isPaused, activeData]);

  // Reset carousel to first image when industry changes
  useEffect(() => {
    if (!api) return;
    api.scrollTo(0);
  }, [api, activeIndustry]);

  if (loading) {
    return (
      <section className="relative py-16 lg:py-24 bg-eastdigital-dark overflow-hidden">
        <SubtleBackground variant="gradient" />
        <div className="relative z-10 container mx-auto px-4">
          <div className="text-center text-white">Loading industries...</div>
        </div>
      </section>
    );
  }

  if (industries.length === 0) {
    return (
      <section className="relative py-16 lg:py-24 bg-eastdigital-dark overflow-hidden">
        <SubtleBackground variant="gradient" />
        <div className="relative z-10 container mx-auto px-4">
          <div className="text-center text-white">No industries available.</div>
        </div>
      </section>
    );
  }

  const visibleIndustries = isExpanded ? industries : industries.slice(0, 4);

  return (
    <section className="relative py-16 lg:py-24 bg-eastdigital-dark overflow-hidden">
      <SubtleBackground variant="gradient" />
      
      {/* Header */}
      <div className="relative z-10 container mx-auto px-4 mb-12 lg:mb-16">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center px-4 py-2 bg-eastdigital-orange/10 border border-eastdigital-orange/20 rounded-full mb-6 backdrop-blur-xl">
            <span className="text-eastdigital-orange text-sm font-medium tracking-wider uppercase">Industry Expertise</span>
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            Sectors We Transform
          </h2>
          <p className="text-eastdigital-lightgray text-lg leading-relaxed">
            Delivering innovative solutions across diverse industries with precision and expertise.
          </p>
        </div>
      </div>

      {/* Main Content - Stack on Mobile, Side by Side on Desktop */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          {/* Industry Selector - Responsive Grid */}
          <div className="lg:w-1/2">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 lg:gap-4">
              {visibleIndustries.map((industry, index) => {
                const Icon = iconMapping[industry.icon_name as keyof typeof iconMapping] || Building2;
                const isActive = activeIndustry === index;
                const colors = colorVariants[industry.color as keyof typeof colorVariants] || colorVariants.orange;
                
                return (
                  <div 
                    key={industry.id} 
                    className={`group cursor-pointer transition-all duration-300 ${isActive ? 'scale-[1.02]' : 'hover:scale-[1.01]'}`} 
                    onClick={() => setActiveIndustry(index)}
                  >
                    <LiquidGlassCard 
                      variant={isActive ? "intense" : "default"}
                      className={`p-4 lg:p-6 transition-all duration-300 ${
                        isActive 
                          ? `shadow-xl ${colors.glow} ${colors.border} bg-gradient-to-r ${colors.gradient}` 
                          : 'hover:shadow-lg hover:shadow-eastdigital-orange/5 border-white/5'
                      }`}
                      interactive={true}
                    >
                      <div className="flex items-center gap-3 lg:gap-4">
                        {/* Icon */}
                        <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-lg flex items-center justify-center transition-all duration-300 ${
                          isActive 
                            ? 'bg-eastdigital-orange/20 border border-eastdigital-orange/40' 
                            : 'bg-gray-800/50 border border-gray-700/50 group-hover:border-eastdigital-orange/30'
                        } backdrop-blur-xl`}>
                          <Icon className={`h-5 w-5 lg:h-6 lg:w-6 ${isActive ? 'text-eastdigital-orange' : colors.text} transition-colors duration-300`} />
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <h3 className={`text-sm lg:text-base font-semibold transition-colors duration-300 truncate ${
                            isActive ? 'text-eastdigital-orange' : 'text-white group-hover:text-eastdigital-orange'
                          }`}>
                            {industry.title}
                          </h3>
                          <p className="text-eastdigital-lightgray text-xs lg:text-sm truncate">
                            {industry.subtitle}
                          </p>
                        </div>
                        
                        {/* Arrow */}
                        <ArrowRight className={`h-4 w-4 transition-all duration-300 ${
                          isActive 
                            ? 'text-eastdigital-orange translate-x-1' 
                            : 'text-gray-500 group-hover:text-eastdigital-orange group-hover:translate-x-1'
                        }`} />
                      </div>
                    </LiquidGlassCard>
                  </div>
                );
              })}
            </div>

            {/* Show More/Less Button */}
            {industries.length > 4 && (
              <div className="mt-4 text-center lg:text-left">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="inline-flex items-center gap-2 text-eastdigital-orange hover:text-eastdigital-hover transition-colors duration-200 text-sm font-medium"
                >
                  <span>{isExpanded ? 'Show Less' : `Show ${industries.length - 4} More`}</span>
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                </button>
              </div>
            )}
          </div>

          {/* Content Display */}
          <div className="lg:w-1/2">
            {activeData && (
              <div className="sticky top-24">
                {/* Images Carousel */}
                {activeData.images && activeData.images.length > 0 && (
                  <LiquidGlassCard variant="subtle" className="mb-6 p-2">
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
                            <div className="relative aspect-[16/10] rounded-lg overflow-hidden">
                              <img 
                                src={image} 
                                alt={`${activeData.title} project ${index + 1}`} 
                                className="w-full h-full object-cover" 
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious className="left-3 bg-black/50 border-white/20 text-white hover:bg-black/70 backdrop-blur-xl" />
                      <CarouselNext className="right-3 bg-black/50 border-white/20 text-white hover:bg-black/70 backdrop-blur-xl" />
                    </Carousel>
                  </LiquidGlassCard>
                )}

                {/* Content Card */}
                <LiquidGlassCard 
                  variant="default" 
                  className={`p-6 border ${colorScheme.border} shadow-lg ${colorScheme.glow} bg-gradient-to-br ${colorScheme.gradient}`}
                >
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-white text-xl lg:text-2xl font-bold mb-2">
                        {activeData.title}
                      </h4>
                      <p className="text-gray-200 leading-relaxed">
                        {activeData.description}
                      </p>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <div className={`text-2xl font-bold ${colorScheme.text}`}>
                            {activeData.projects_count || '0'}
                          </div>
                          <div className="text-xs text-gray-300">Projects</div>
                        </div>
                        {activeData.metric && (
                          <>
                            <div className="w-px h-8 bg-gradient-to-b from-transparent via-gray-600 to-transparent"></div>
                            <div className="text-center">
                              <div className={`text-2xl font-bold ${colorScheme.text}`}>
                                {activeData.metric}
                              </div>
                              <div className="text-xs text-gray-300">{activeData.metric_label}</div>
                            </div>
                          </>
                        )}
                      </div>
                      <LiquidGlassButton 
                        size="sm" 
                        variant="secondary"
                        className="px-4 py-2 text-sm"
                      >
                        View Work
                      </LiquidGlassButton>
                    </div>
                  </div>
                </LiquidGlassCard>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustrySection;
