
export interface Project {
  id: string;
  title: string;
  subtitle?: string;
  featuredImage: string;
  heroImage: string;
  category: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  duration: string;
  location: string;
  team: string;
  client: string;
  description: string;
  challenge: string;
  solution: string;
  results: {
    engagement: string;
    leads: string;
    conversion: string;
    timeline: string;
  };
  gallery: string[];
  tags: string[];
  // New SEO fields
  seo?: {
    pageTitle?: string;
    metaDescription?: string;
    featuredImageAlt?: string;
    heroImageAlt?: string;
    galleryImageAlts?: string[];
  };
}

// Use only one project to fix the multiple display issue
const projects = [
  {
    id: '1',
    title: 'Luxury Condo Complex - Downtown',
    subtitle: 'Premium residential development with state-of-the-art amenities and stunning city views.',
    featuredImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&h=800&fit=crop',
    category: '3D Rendering & Visualization',
    status: 'completed' as const,
    duration: '4 months',
    location: 'New York, NY',
    team: '8 members',
    client: 'Metropolitan Development',
    description: 'A comprehensive 3D visualization project for a luxury condominium complex featuring 200 units across 25 floors. Our team created photorealistic renderings and virtual tours that helped secure $150M in pre-sales.',
    challenge: 'The client needed to showcase the luxury amenities and stunning views before construction began. Traditional 2D plans weren\'t compelling enough for high-end buyers.',
    solution: 'We developed immersive 3D visualizations including aerial views, interior spaces, and amenity areas. Created virtual reality experiences for the sales center.',
    results: {
      engagement: '+285%',
      leads: '1,200+',
      conversion: '23%',
      timeline: 'Completed 2 weeks early'
    },
    gallery: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop'
    ],
    tags: ['3D Visualization', 'Luxury Real Estate', 'Virtual Reality', 'Pre-Sales Marketing']
  }
];

export const getProjects = () => projects;

export const getProjectById = (id: string) => projects.find(project => project.id === id);

export const getProjectsByCategory = (categoryLabel: string) => {
  if (categoryLabel === 'All Projects') {
    return projects;
  }
  // Fixed: Match the actual category values in the project data
  return projects.filter(project => project.category === categoryLabel);
};

export const getCarouselProjects = () => {
  return projects.map(project => ({
    id: project.id,
    name: project.title,
    featuredImage: project.featuredImage
  }));
};

export const categories = [
  { id: '3D Rendering & Visualization', label: '3D Rendering & Visualization' },
  { id: 'Digital Marketing Campaigns', label: 'Digital Marketing Campaigns' },
  { id: 'Corporate Solutions', label: 'Corporate Solutions' }
];
