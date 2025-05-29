
import React, { useState, useMemo, useCallback } from 'react';
import Navbar from '@/components/Navbar/Navbar';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Play, ArrowRight, Award, Users, Target, Calendar, Loader2 } from 'lucide-react';
import { projectsData, getProjectsByCategory } from '@/data/projects';
import { ModernProjectCard } from '@/components/Impact/ModernProjectCard';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';

const categories = [
  { id: 'ALL', label: 'All Projects' },
  { id: '3d-rendering', label: '3D Rendering & Visualization' },
  { id: 'digital-marketing', label: 'Digital Marketing Campaigns' },
  { id: 'corporate-solutions', label: 'Corporate Solutions' }
];

const stats = [
  { icon: Award, value: '150+', label: 'Projects Completed' },
  { icon: Users, value: '80+', label: 'Happy Clients' },
  { icon: Target, value: '95%', label: 'Success Rate' },
  { icon: Calendar, value: '5+', label: 'Years Experience' }
];

const PROJECTS_PER_PAGE = 6;

const Impact = () => {
  const [activeCategory, setActiveCategory] = useState('All Projects');
  const [displayedProjects, setDisplayedProjects] = useState(PROJECTS_PER_PAGE);
  const [isLoading, setIsLoading] = useState(false);

  const allProjects = useMemo(() => {
    return getProjectsByCategory(activeCategory);
  }, [activeCategory]);

  const currentProjects = useMemo(() => {
    return allProjects.slice(0, displayedProjects);
  }, [allProjects, displayedProjects]);

  const hasMore = displayedProjects < allProjects.length;

  const loadMoreProjects = useCallback(async () => {
    if (isLoading || !hasMore) return;
    
    setIsLoading(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    setDisplayedProjects(prev => Math.min(prev + PROJECTS_PER_PAGE, allProjects.length));
    setIsLoading(false);
  }, [isLoading, hasMore, allProjects.length]);

  useInfiniteScroll({
    hasMore,
    isLoading,
    onLoadMore: loadMoreProjects,
    threshold: 300
  });

  const handleCategoryChange = (categoryLabel: string) => {
    setActiveCategory(categoryLabel);
    setDisplayedProjects(PROJECTS_PER_PAGE);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-[60vh] lg:min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="absolute inset-0 bg-black/40"></div>
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold text-white mb-6 lg:mb-8 font-poppins tracking-tight">
            Our Impact
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed mb-8 lg:mb-12 px-4">
            Transforming real estate marketing through innovative design, strategic campaigns, and cutting-edge technology solutions that drive measurable results.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="h-6 w-6 lg:h-8 lg:w-8 text-eastdigital-orange mx-auto mb-2 lg:mb-3" />
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-white/80 text-xs md:text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Showreel Section */}
      <section className="py-16 lg:py-24 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 lg:mb-6">
              See Our Work in Action
            </h2>
            <p className="text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto px-4">
              Watch how we transform real estate marketing through innovative design, strategic digital campaigns, and immersive 3D visualizations.
            </p>
          </div>
          
          <div className="relative max-w-5xl mx-auto px-4">
            <div className="relative aspect-video rounded-2xl lg:rounded-3xl overflow-hidden bg-gradient-to-br from-gray-900 to-black shadow-2xl">
              {/* Video Placeholder */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900"></div>
              <img 
                src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&h=675&fit=crop" 
                alt="Video Showreel"
                className="w-full h-full object-cover opacity-40"
              />
              
              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="group bg-white/10 backdrop-blur-sm border border-white/20 rounded-full p-6 lg:p-8 hover:bg-white/20 transition-all duration-300 hover:scale-110">
                  <Play className="h-8 w-8 lg:h-12 lg:w-12 text-white ml-1 group-hover:scale-110 transition-transform duration-300" fill="white" />
                </button>
              </div>
              
              {/* Video Overlay Text */}
              <div className="absolute bottom-4 lg:bottom-8 left-4 lg:left-8 right-4 lg:right-8">
                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2">
                  Real Estate Marketing Showreel 2024
                </h3>
                <p className="text-white/80 text-sm lg:text-base">
                  A glimpse into our award-winning projects and innovative solutions
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-16 lg:py-24 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 lg:mb-6">
              Featured Projects
            </h2>
            <p className="text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto mb-8 lg:mb-12 px-4">
              Explore our portfolio of successful real estate marketing campaigns, 3D visualizations, and corporate solutions that have helped our clients achieve exceptional results.
            </p>
            
            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-2 lg:gap-4 px-4">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.label)}
                  className={`px-4 lg:px-8 py-3 lg:py-4 rounded-full font-medium text-sm lg:text-lg transition-all duration-300 ${
                    activeCategory === category.label
                      ? 'bg-eastdigital-orange text-white shadow-lg hover:bg-eastdigital-orange/90'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white border border-gray-700'
                  }`}
                  variant="ghost"
                >
                  {category.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
            {currentProjects.map((project, index) => (
              <div
                key={project.id}
                style={{
                  animationDelay: `${(index % PROJECTS_PER_PAGE) * 100}ms`,
                  animation: 'fade-in 0.6s ease-out forwards'
                }}
              >
                <ModernProjectCard project={project} />
              </div>
            ))}
          </div>

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 text-eastdigital-orange animate-spin" />
              <span className="ml-3 text-white">Loading more projects...</span>
            </div>
          )}

          {/* Load More Button (fallback for manual loading) */}
          {hasMore && !isLoading && (
            <div className="text-center">
              <Button 
                onClick={loadMoreProjects}
                className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 text-lg rounded-full border border-gray-700 hover:border-eastdigital-orange/50 transition-all duration-300"
                variant="ghost"
              >
                Load More Projects
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          )}

          {/* End of Projects Message */}
          {!hasMore && allProjects.length > PROJECTS_PER_PAGE && (
            <div className="text-center py-8">
              <p className="text-gray-400">You've seen all {allProjects.length} projects in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* SEO Content Section - Simplified for mobile */}
      <section className="py-16 lg:py-24 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 lg:mb-8 text-center">
              Real Estate Marketing Excellence
            </h2>
            
            <div className="prose prose-lg max-w-none text-gray-300">
              <p className="text-lg lg:text-xl leading-relaxed mb-8 lg:mb-12 text-center">
                EastDigital stands at the forefront of real estate marketing innovation, delivering comprehensive solutions that transform how properties are marketed, visualized, and sold. Our expertise spans 3D architectural visualization, digital marketing campaigns, and corporate branding solutions specifically tailored for the real estate industry.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mt-12 lg:mt-16">
                <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/50">
                  <h3 className="text-xl lg:text-2xl font-bold text-white mb-4">3D Visualization & Architectural Rendering</h3>
                  <p className="text-gray-300 text-sm lg:text-base">
                    Our photorealistic 3D visualizations bring unbuilt properties to life, enabling developers and agents to showcase projects before construction begins.
                  </p>
                </div>
                
                <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/50">
                  <h3 className="text-xl lg:text-2xl font-bold text-white mb-4">Digital Marketing & Lead Generation</h3>
                  <p className="text-gray-300 text-sm lg:text-base">
                    We craft data-driven digital marketing strategies that generate qualified leads and drive sales for real estate projects.
                  </p>
                </div>
                
                <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/50">
                  <h3 className="text-xl lg:text-2xl font-bold text-white mb-4">Corporate Branding & Identity</h3>
                  <p className="text-gray-300 text-sm lg:text-base">
                    From brand identity design to complete digital transformation, we help real estate companies establish strong market presence.
                  </p>
                </div>
                
                <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/50">
                  <h3 className="text-xl lg:text-2xl font-bold text-white mb-4">Technology Integration</h3>
                  <p className="text-gray-300 text-sm lg:text-base">
                    We integrate cutting-edge technologies including virtual reality tours, interactive 3D models, and AI-powered marketing automation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 lg:mb-6">
            Ready to Transform Your Real Estate Marketing?
          </h2>
          <p className="text-lg lg:text-xl text-gray-300 mb-8 lg:mb-12 max-w-3xl mx-auto px-4">
            Join hundreds of successful real estate developers and agents who have elevated their marketing with our innovative solutions. Let's create your next success story.
          </p>
          <Link to="/connect">
            <Button className="bg-eastdigital-orange hover:bg-eastdigital-orange/90 text-white px-8 lg:px-10 py-3 lg:py-4 text-lg rounded-full group">
              Start Your Project Today
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Impact;
