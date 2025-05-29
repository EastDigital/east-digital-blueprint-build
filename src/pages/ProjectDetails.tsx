
import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar/Navbar';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, MapPin, Users, Target, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock project data - would come from API/database in real app
const projectData = {
  'ascon-group': {
    title: 'Ascon Group',
    subtitle: 'Premium Residential Development',
    heroImage: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=1200&h=600&fit=crop',
    overview: 'A luxury residential project that redefined urban living standards with cutting-edge design and sustainable architecture.',
    challenge: 'Creating a premium residential experience that balances modern amenities with environmental sustainability while meeting the diverse needs of urban families.',
    solution: 'We developed a comprehensive digital marketing strategy that showcased the project\'s unique value proposition through immersive 3D visualizations and targeted digital campaigns.',
    results: {
      engagement: '150% increase in engagement',
      leads: '200+ qualified leads',
      conversion: '35% conversion rate',
      timeline: '6 months'
    },
    details: {
      client: 'Ascon Group',
      location: 'Mumbai, Maharashtra',
      duration: '6 months',
      team: '12 specialists',
      category: 'Residential Development'
    },
    gallery: [
      'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop',
    ]
  },
  // Add more project data as needed
};

const ProjectDetails = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const project = projectData[projectId as keyof typeof projectData];

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col bg-eastdigital-dark">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Project Not Found</h1>
            <Link to="/">
              <Button className="bg-eastdigital-orange hover:bg-eastdigital-orange/90">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-eastdigital-dark">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${project.heroImage})` }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Projects
          </Link>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 font-poppins">
            {project.title}
          </h1>
          <p className="text-xl md:text-2xl text-eastdigital-lightgray max-w-3xl mx-auto">
            {project.subtitle}
          </p>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          {/* Project Info Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-16">
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 text-center">
              <Calendar className="h-8 w-8 text-eastdigital-orange mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-1">Duration</h3>
              <p className="text-eastdigital-lightgray">{project.details.duration}</p>
            </div>
            
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 text-center">
              <MapPin className="h-8 w-8 text-eastdigital-orange mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-1">Location</h3>
              <p className="text-eastdigital-lightgray">{project.details.location}</p>
            </div>
            
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 text-center">
              <Users className="h-8 w-8 text-eastdigital-orange mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-1">Team Size</h3>
              <p className="text-eastdigital-lightgray">{project.details.team}</p>
            </div>
            
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 text-center">
              <Target className="h-8 w-8 text-eastdigital-orange mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-1">Category</h3>
              <p className="text-eastdigital-lightgray">{project.details.category}</p>
            </div>
            
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 text-center">
              <Award className="h-8 w-8 text-eastdigital-orange mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-1">Client</h3>
              <p className="text-eastdigital-lightgray">{project.details.client}</p>
            </div>
          </div>

          {/* Case Study Content */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Project Overview</h2>
              <p className="text-eastdigital-lightgray text-lg leading-relaxed mb-8">
                {project.overview}
              </p>
              
              <h3 className="text-2xl font-bold text-white mb-4">The Challenge</h3>
              <p className="text-eastdigital-lightgray leading-relaxed">
                {project.challenge}
              </p>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">Our Solution</h3>
              <p className="text-eastdigital-lightgray leading-relaxed mb-8">
                {project.solution}
              </p>
              
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6">
                <h4 className="text-xl font-bold text-white mb-4">Key Results</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-eastdigital-lightgray">Engagement Increase:</span>
                    <span className="text-eastdigital-orange font-semibold">{project.results.engagement}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-eastdigital-lightgray">Qualified Leads:</span>
                    <span className="text-eastdigital-orange font-semibold">{project.results.leads}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-eastdigital-lightgray">Conversion Rate:</span>
                    <span className="text-eastdigital-orange font-semibold">{project.results.conversion}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-eastdigital-lightgray">Timeline:</span>
                    <span className="text-eastdigital-orange font-semibold">{project.results.timeline}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Project Gallery */}
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">Project Gallery</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {project.gallery.map((image, index) => (
                <div key={index} className="relative group overflow-hidden rounded-2xl">
                  <img 
                    src={image} 
                    alt={`${project.title} gallery ${index + 1}`}
                    className="w-full h-64 md:h-80 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-eastdigital-orange/10 to-eastdigital-hover/10 border border-eastdigital-orange/20 rounded-2xl p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Start Your Project?
              </h2>
              <p className="text-eastdigital-lightgray text-lg mb-8 max-w-2xl mx-auto">
                Let's discuss how we can help bring your vision to life with our expertise in real estate marketing and development.
              </p>
              <Link to="/connect">
                <Button className="bg-eastdigital-orange hover:bg-eastdigital-orange/90 text-white px-8 py-3 text-lg rounded-full">
                  Start Your Project
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetails;
