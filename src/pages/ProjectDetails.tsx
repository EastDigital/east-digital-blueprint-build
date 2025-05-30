
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar/Navbar';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, MapPin, Users, Target, Award, Loader2, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getProjectById, getProjectBySlug, ProjectDetailsType } from '@/data/supabaseProjects';

const ProjectDetails = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [project, setProject] = useState<ProjectDetailsType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      if (!projectId) {
        setError('No project ID provided');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        let projectData: ProjectDetailsType | null = null;

        // First try to fetch by ID (UUID format)
        if (projectId.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
          projectData = await getProjectById(projectId);
        } else {
          // If not a UUID, try to fetch by slug
          projectData = await getProjectBySlug(projectId);
        }

        if (projectData) {
          setProject(projectData);
          setError(null);
        } else {
          setError('Project not found');
        }
      } catch (err) {
        console.error('Error fetching project:', err);
        setError('Failed to load project');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-black">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-8 w-8 text-eastdigital-orange animate-spin mx-auto mb-4" />
            <p className="text-white">Loading project...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen flex flex-col bg-black">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Project Not Found</h1>
            <p className="text-gray-400 mb-8">{error || "The project you're looking for doesn't exist."}</p>
            <Link to="/impact">
              <Button className="bg-eastdigital-orange hover:bg-eastdigital-orange/90 text-white">
                Back to Projects
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-black">
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
          <Link to="/impact" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Projects
          </Link>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 font-poppins">
            {project.title}
          </h1>
          {project.subtitle && (
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              {project.subtitle}
            </p>
          )}
        </div>
      </section>

      {/* Project Details */}
      <section className="py-16 lg:py-24 bg-black">
        <div className="container mx-auto px-4">
          {/* Project Info Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-16">
            {project.duration && (
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 text-center">
                <Calendar className="h-8 w-8 text-eastdigital-orange mx-auto mb-3" />
                <h3 className="text-white font-semibold mb-1">Duration</h3>
                <p className="text-gray-400">{project.duration}</p>
              </div>
            )}
            
            {project.location && (
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 text-center">
                <MapPin className="h-8 w-8 text-eastdigital-orange mx-auto mb-3" />
                <h3 className="text-white font-semibold mb-1">Location</h3>
                <p className="text-gray-400">{project.location}</p>
              </div>
            )}
            
            {project.team && (
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 text-center">
                <Users className="h-8 w-8 text-eastdigital-orange mx-auto mb-3" />
                <h3 className="text-white font-semibold mb-1">Team Size</h3>
                <p className="text-gray-400">{project.team}</p>
              </div>
            )}
            
            {project.category && (
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 text-center">
                <Target className="h-8 w-8 text-eastdigital-orange mx-auto mb-3" />
                <h3 className="text-white font-semibold mb-1">Category</h3>
                <p className="text-gray-400">{project.category}</p>
              </div>
            )}
            
            {project.client && (
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 text-center">
                <Award className="h-8 w-8 text-eastdigital-orange mx-auto mb-3" />
                <h3 className="text-white font-semibold mb-1">Client</h3>
                <p className="text-gray-400">{project.client}</p>
              </div>
            )}
          </div>

          {/* Featured Video Section */}
          {project.featuredVideo && (
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">Featured Video</h2>
              <div className="relative max-w-4xl mx-auto rounded-2xl overflow-hidden">
                <video
                  className="w-full h-auto"
                  controls
                  poster={project.videoThumbnail || project.featuredImage}
                >
                  <source src={project.featuredVideo} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          )}

          {/* Case Study Content */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Project Overview</h2>
              {project.description && (
                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                  {project.description}
                </p>
              )}
              
              {project.challenge && (
                <>
                  <h3 className="text-2xl font-bold text-white mb-4">The Challenge</h3>
                  <p className="text-gray-300 leading-relaxed">
                    {project.challenge}
                  </p>
                </>
              )}
            </div>
            
            <div>
              {project.solution && (
                <>
                  <h3 className="text-2xl font-bold text-white mb-4">Our Solution</h3>
                  <p className="text-gray-300 leading-relaxed mb-8">
                    {project.solution}
                  </p>
                </>
              )}
              
              {/* Results Section - only show if we have any results */}
              {(project.results.engagement || project.results.leads || project.results.conversion || project.results.timeline) && (
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                  <h4 className="text-xl font-bold text-white mb-4">Key Results</h4>
                  <div className="space-y-3">
                    {project.results.engagement && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">Engagement Increase:</span>
                        <span className="text-eastdigital-orange font-semibold">{project.results.engagement}</span>
                      </div>
                    )}
                    {project.results.leads && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">Qualified Leads:</span>
                        <span className="text-eastdigital-orange font-semibold">{project.results.leads}</span>
                      </div>
                    )}
                    {project.results.conversion && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">Conversion Rate:</span>
                        <span className="text-eastdigital-orange font-semibold">{project.results.conversion}</span>
                      </div>
                    )}
                    {project.results.timeline && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">Timeline:</span>
                        <span className="text-eastdigital-orange font-semibold">{project.results.timeline}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Project Gallery */}
          {((project.gallery && project.gallery.length > 0) || (project.galleryVideos && project.galleryVideos.length > 0)) && (
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">Project Gallery</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Images */}
                {project.gallery.map((image, index) => (
                  <div key={`image-${index}`} className="relative group overflow-hidden rounded-2xl">
                    <img 
                      src={image} 
                      alt={`${project.title} gallery ${index + 1}`}
                      className="w-full h-64 md:h-80 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                  </div>
                ))}
                
                {/* Videos */}
                {project.galleryVideos.map((video, index) => (
                  <div key={`video-${index}`} className="relative group overflow-hidden rounded-2xl">
                    <video
                      className="w-full h-64 md:h-80 object-cover"
                      controls
                      poster={project.videoThumbnail || project.featuredImage}
                    >
                      <source src={video} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    <div className="absolute top-4 left-4 bg-black/70 text-white px-2 py-1 rounded text-sm">
                      <Play className="h-3 w-3 inline mr-1" />
                      Video
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Project Tags */}
          {project.tags && project.tags.length > 0 && (
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-white mb-6">Project Tags</h3>
              <div className="flex flex-wrap gap-3">
                {project.tags.map((tag, index) => (
                  tag && (
                    <span 
                      key={index}
                      className="bg-gray-900 border border-gray-700 text-gray-300 px-4 py-2 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  )
                ))}
              </div>
            </div>
          )}

          {/* CTA Section */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-eastdigital-orange/10 to-eastdigital-orange/5 border border-eastdigital-orange/20 rounded-2xl p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Start Your Project?
              </h2>
              <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
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
