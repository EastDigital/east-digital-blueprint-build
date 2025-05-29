
import React, { useState } from 'react';
import Navbar from '@/components/Navbar/Navbar';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Play, ArrowRight, Award, Users, Target, Calendar } from 'lucide-react';

// Mock project data organized by categories
const projectData = {
  '3d-rendering': [
    {
      id: 'luxury-tower-mumbai',
      title: 'Luxury Tower Mumbai',
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop',
      category: '3D Rendering & Visualization',
      client: 'Pinnacle Developers',
      year: '2024',
      description: 'Photorealistic 3D visualizations that brought this luxury residential project to life before construction began.'
    },
    {
      id: 'modern-villa-goa',
      title: 'Modern Villa Goa',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop',
      category: '3D Rendering & Visualization',
      client: 'Coastal Homes',
      year: '2024',
      description: 'Stunning architectural visualization showcasing contemporary design elements and natural integration.'
    },
    {
      id: 'commercial-complex-delhi',
      title: 'Commercial Complex Delhi',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop',
      category: '3D Rendering & Visualization',
      client: 'Metro Builders',
      year: '2023',
      description: 'Comprehensive 3D modeling and visualization for a mixed-use commercial development.'
    },
    {
      id: 'residential-township',
      title: 'Residential Township',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop',
      category: '3D Rendering & Visualization',
      client: 'Green Valley',
      year: '2023',
      description: 'Large-scale township visualization with detailed landscape and infrastructure planning.'
    }
  ],
  'digital-marketing': [
    {
      id: 'premium-launch-campaign',
      title: 'Premium Launch Campaign',
      image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=600&fit=crop',
      category: 'Digital Marketing Campaigns',
      client: 'Urban Homes',
      year: '2024',
      description: 'Multi-channel digital campaign that generated 300% increase in qualified leads for luxury properties.'
    },
    {
      id: 'social-media-strategy',
      title: 'Social Media Strategy',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop',
      category: 'Digital Marketing Campaigns',
      client: 'Luxury Living',
      year: '2024',
      description: 'Comprehensive social media strategy driving engagement and brand awareness in the luxury real estate market.'
    },
    {
      id: 'lead-generation-campaign',
      title: 'Lead Generation Campaign',
      image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&h=600&fit=crop',
      category: 'Digital Marketing Campaigns',
      client: 'Prime Properties',
      year: '2023',
      description: 'Data-driven lead generation campaign resulting in 40% higher conversion rates than industry average.'
    }
  ],
  'corporate-solutions': [
    {
      id: 'brand-identity-redesign',
      title: 'Brand Identity Redesign',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=600&fit=crop',
      category: 'Corporate Solutions',
      client: 'TechForward Solutions',
      year: '2024',
      description: 'Complete brand transformation including logo design, visual identity, and digital presence overhaul.'
    },
    {
      id: 'website-development',
      title: 'Website Development',
      image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800&h=600&fit=crop',
      category: 'Corporate Solutions',
      client: 'Innovation Corp',
      year: '2024',
      description: 'Modern, responsive website development with focus on user experience and conversion optimization.'
    },
    {
      id: 'digital-transformation',
      title: 'Digital Transformation',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop',
      category: 'Corporate Solutions',
      client: 'Future Enterprises',
      year: '2023',
      description: 'End-to-end digital transformation including process automation and digital marketing integration.'
    }
  ]
};

const categories = [
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

const Impact = () => {
  const [activeCategory, setActiveCategory] = useState('3d-rendering');

  const currentProjects = projectData[activeCategory as keyof typeof projectData];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="absolute inset-0 bg-black/40"></div>
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 font-poppins tracking-tight">
            Our Impact
          </h1>
          <p className="text-xl lg:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed mb-12">
            Transforming real estate marketing through innovative design, strategic campaigns, and cutting-edge technology solutions that drive measurable results.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="h-8 w-8 text-eastdigital-orange mx-auto mb-3" />
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-white/80 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Showreel Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              See Our Work in Action
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Watch how we transform real estate marketing through innovative design, strategic digital campaigns, and immersive 3D visualizations.
            </p>
          </div>
          
          <div className="relative max-w-5xl mx-auto">
            <div className="relative aspect-video rounded-3xl overflow-hidden bg-gradient-to-br from-gray-900 to-black shadow-2xl">
              {/* Video Placeholder */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900"></div>
              <img 
                src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&h=675&fit=crop" 
                alt="Video Showreel"
                className="w-full h-full object-cover opacity-40"
              />
              
              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="group bg-white/10 backdrop-blur-sm border border-white/20 rounded-full p-8 hover:bg-white/20 transition-all duration-300 hover:scale-110">
                  <Play className="h-12 w-12 text-white ml-1 group-hover:scale-110 transition-transform duration-300" fill="white" />
                </button>
              </div>
              
              {/* Video Overlay Text */}
              <div className="absolute bottom-8 left-8 right-8">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  Real Estate Marketing Showreel 2024
                </h3>
                <p className="text-white/80">
                  A glimpse into our award-winning projects and innovative solutions
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Filter */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Featured Projects
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
              Explore our portfolio of successful real estate marketing campaigns, 3D visualizations, and corporate solutions that have helped our clients achieve exceptional results.
            </p>
            
            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-8 py-4 rounded-full font-medium text-lg transition-all duration-300 ${
                    activeCategory === category.id
                      ? 'bg-gray-900 text-white shadow-lg hover:bg-gray-800'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900'
                  }`}
                  variant="ghost"
                >
                  {category.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 gap-12">
            {currentProjects.map((project, index) => (
              <Link
                key={project.id}
                to={`/project/${project.id}`}
                className="group block"
                style={{
                  animationDelay: `${index * 150}ms`,
                  animation: 'fade-in 0.8s ease-out forwards'
                }}
              >
                <article className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
                  {/* Project Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-6 left-6">
                      <span className="bg-white/90 backdrop-blur-sm text-gray-900 px-4 py-2 rounded-full text-sm font-medium">
                        {project.category}
                      </span>
                    </div>
                    
                    {/* View Project Button */}
                    <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                      <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg">
                        <ArrowRight className="h-6 w-6 text-gray-900" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Project Details */}
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-gray-500 font-medium">{project.year}</span>
                      <span className="text-gray-500">{project.client}</span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-eastdigital-orange transition-colors duration-300">
                      {project.title}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
          
          {/* View All Projects */}
          <div className="text-center mt-16">
            <Button className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 text-lg rounded-full group">
              View All Projects
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center">
              Real Estate Marketing Excellence
            </h2>
            
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="text-xl leading-relaxed mb-8">
                EastDigital stands at the forefront of real estate marketing innovation, delivering comprehensive solutions that transform how properties are marketed, visualized, and sold. Our expertise spans 3D architectural visualization, digital marketing campaigns, and corporate branding solutions specifically tailored for the real estate industry.
              </p>
              
              <div className="grid md:grid-cols-2 gap-12 mt-16">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">3D Visualization & Architectural Rendering</h3>
                  <p>
                    Our photorealistic 3D visualizations bring unbuilt properties to life, enabling developers and agents to showcase projects before construction begins. From luxury residential towers to commercial complexes, our rendering services help clients secure pre-sales and investor confidence through immersive visual experiences.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Digital Marketing & Lead Generation</h3>
                  <p>
                    We craft data-driven digital marketing strategies that generate qualified leads and drive sales for real estate projects. Our campaigns leverage social media, search engine optimization, and targeted advertising to reach the right buyers at the right time, consistently delivering above-industry conversion rates.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Corporate Branding & Identity</h3>
                  <p>
                    From brand identity design to complete digital transformation, we help real estate companies establish strong market presence. Our corporate solutions include logo design, brand guidelines, website development, and integrated marketing strategies that position clients as industry leaders.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Technology Integration</h3>
                  <p>
                    We integrate cutting-edge technologies including virtual reality tours, interactive 3D models, and AI-powered marketing automation to create seamless digital experiences that engage prospects and accelerate sales cycles for real estate projects across India.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Real Estate Marketing?
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Join hundreds of successful real estate developers and agents who have elevated their marketing with our innovative solutions. Let's create your next success story.
          </p>
          <Link to="/connect">
            <Button className="bg-eastdigital-orange hover:bg-eastdigital-orange/90 text-white px-10 py-4 text-lg rounded-full group">
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
