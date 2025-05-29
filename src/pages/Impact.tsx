
import React, { useState } from 'react';
import Navbar from '@/components/Navbar/Navbar';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

// Mock project data organized by categories
const projectData = {
  '3d-rendering': [
    {
      id: 'luxury-tower-mumbai',
      title: 'Luxury Tower Mumbai',
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop',
      category: '3D Rendering & Visualization',
      client: 'Pinnacle Developers',
      year: '2024'
    },
    {
      id: 'modern-villa-goa',
      title: 'Modern Villa Goa',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop',
      category: '3D Rendering & Visualization',
      client: 'Coastal Homes',
      year: '2024'
    },
    {
      id: 'commercial-complex-delhi',
      title: 'Commercial Complex Delhi',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop',
      category: '3D Rendering & Visualization',
      client: 'Metro Builders',
      year: '2023'
    },
    {
      id: 'residential-township',
      title: 'Residential Township',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop',
      category: '3D Rendering & Visualization',
      client: 'Green Valley',
      year: '2023'
    }
  ],
  'digital-marketing': [
    {
      id: 'premium-launch-campaign',
      title: 'Premium Launch Campaign',
      image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=600&fit=crop',
      category: 'Digital Marketing Campaigns',
      client: 'Urban Homes',
      year: '2024'
    },
    {
      id: 'social-media-strategy',
      title: 'Social Media Strategy',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop',
      category: 'Digital Marketing Campaigns',
      client: 'Luxury Living',
      year: '2024'
    },
    {
      id: 'lead-generation-campaign',
      title: 'Lead Generation Campaign',
      image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&h=600&fit=crop',
      category: 'Digital Marketing Campaigns',
      client: 'Prime Properties',
      year: '2023'
    }
  ],
  'corporate-solutions': [
    {
      id: 'brand-identity-redesign',
      title: 'Brand Identity Redesign',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=600&fit=crop',
      category: 'Corporate Solutions',
      client: 'TechForward Solutions',
      year: '2024'
    },
    {
      id: 'website-development',
      title: 'Website Development',
      image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800&h=600&fit=crop',
      category: 'Corporate Solutions',
      client: 'Innovation Corp',
      year: '2024'
    },
    {
      id: 'digital-transformation',
      title: 'Digital Transformation',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop',
      category: 'Corporate Solutions',
      client: 'Future Enterprises',
      year: '2023'
    }
  ]
};

const categories = [
  { id: '3d-rendering', label: '3D Rendering & Visualization' },
  { id: 'digital-marketing', label: 'Digital Marketing Campaigns' },
  { id: 'corporate-solutions', label: 'Corporate Solutions' }
];

const Impact = () => {
  const [activeCategory, setActiveCategory] = useState('3d-rendering');

  const currentProjects = projectData[activeCategory as keyof typeof projectData];

  return (
    <div className="min-h-screen flex flex-col bg-eastdigital-dark">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url(https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1920&h=1080&fit=crop)` 
          }}
        />
        
        {/* Black Translucent Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>
        
        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 font-poppins">
            Our Impact
          </h1>
          <p className="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Transforming visions into reality through innovative design, strategic marketing, and cutting-edge technology solutions.
          </p>
        </div>
      </section>

      {/* Floating Filter Bar */}
      <section className="relative -mt-8 z-20">
        <div className="container mx-auto px-4">
          <div className="bg-gray-900/80 backdrop-blur-md border border-gray-700/50 rounded-2xl p-2 mx-auto max-w-4xl">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeCategory === category.id
                      ? 'bg-eastdigital-orange text-white shadow-lg'
                      : 'bg-transparent text-gray-300 hover:text-white hover:bg-gray-800/50'
                  }`}
                  variant="ghost"
                >
                  {category.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentProjects.map((project, index) => (
              <Link
                key={project.id}
                to={`/project/${project.id}`}
                className="group block"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: 'fade-in 0.6s ease-out forwards'
                }}
              >
                <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden hover:border-eastdigital-orange/50 transition-all duration-300 group-hover:transform group-hover:scale-[1.02]">
                  {/* Project Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    
                    {/* Project Info Overlay */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="text-xs text-eastdigital-orange font-medium mb-1 uppercase tracking-wide">
                        {project.category}
                      </div>
                      <h3 className="text-white font-semibold text-lg mb-1 group-hover:text-eastdigital-orange transition-colors duration-300">
                        {project.title}
                      </h3>
                      <div className="flex justify-between items-center text-sm text-white/80">
                        <span>{project.client}</span>
                        <span>{project.year}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Project Details */}
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-eastdigital-lightgray">
                        View Case Study
                      </div>
                      <div className="w-6 h-6 rounded-full border border-eastdigital-orange flex items-center justify-center group-hover:bg-eastdigital-orange transition-colors duration-300">
                        <svg 
                          className="w-3 h-3 text-eastdigital-orange group-hover:text-white transition-colors duration-300" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M9 5l7 7-7 7" 
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-eastdigital-orange/10 to-eastdigital-orange/5 border border-eastdigital-orange/20 rounded-2xl p-8 lg:p-12 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to Create Your Success Story?
            </h2>
            <p className="text-xl text-eastdigital-lightgray mb-8 max-w-2xl mx-auto">
              Join hundreds of satisfied clients who have transformed their businesses with our expertise.
            </p>
            <Link to="/connect">
              <Button className="bg-eastdigital-orange hover:bg-eastdigital-orange/90 text-white px-8 py-3 text-lg rounded-full">
                Start Your Project
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Impact;
