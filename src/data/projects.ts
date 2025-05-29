
export interface Project {
  id: string;
  name: string;
  title: string;
  subtitle: string;
  shortDescription: string;
  description: string;
  featuredImage: string;
  heroImage: string;
  category: string;
  client: string;
  location: string;
  year: string;
  duration: string;
  team: string;
  status: 'completed' | 'in-progress' | 'upcoming';
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
}

export const projectsData: Project[] = [
  {
    id: 'ascon-group',
    name: 'Ascon Group',
    title: 'Ascon Group',
    subtitle: 'Premium Residential Development',
    shortDescription: 'Luxury residential project that redefined urban living standards with cutting-edge design.',
    description: 'A luxury residential project that redefined urban living standards with cutting-edge design and sustainable architecture.',
    featuredImage: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&h=400&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=1200&h=600&fit=crop',
    category: '3D Rendering & Visualization',
    client: 'Ascon Group',
    location: 'Mumbai, Maharashtra',
    year: '2024',
    duration: '6 months',
    team: '12 specialists',
    status: 'completed',
    challenge: 'Creating a premium residential experience that balances modern amenities with environmental sustainability while meeting the diverse needs of urban families.',
    solution: 'We developed a comprehensive digital marketing strategy that showcased the project\'s unique value proposition through immersive 3D visualizations and targeted digital campaigns.',
    results: {
      engagement: '150% increase in engagement',
      leads: '200+ qualified leads',
      conversion: '35% conversion rate',
      timeline: '6 months'
    },
    gallery: [
      'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop'
    ],
    tags: ['Residential', 'Luxury', 'Sustainable', '3D Visualization']
  },
  {
    id: 'reliance-energy',
    name: 'Reliance Energy',
    title: 'Reliance Energy Solar Park',
    subtitle: 'Renewable Energy Infrastructure',
    shortDescription: 'Large-scale solar energy project showcasing sustainable power generation capabilities.',
    description: 'A groundbreaking renewable energy project that demonstrates the future of sustainable power generation through innovative solar technology and smart grid integration.',
    featuredImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=600&fit=crop',
    category: 'Corporate Solutions',
    client: 'Reliance Energy',
    location: 'Rajasthan, India',
    year: '2024',
    duration: '8 months',
    team: '15 specialists',
    status: 'completed',
    challenge: 'Visualizing complex renewable energy infrastructure and communicating the environmental benefits to stakeholders and the public.',
    solution: 'Created comprehensive 3D visualizations and interactive presentations that demonstrated the project\'s impact on sustainable energy generation.',
    results: {
      engagement: '200% increase in stakeholder engagement',
      leads: '150+ partnership inquiries',
      conversion: '45% approval rate',
      timeline: '8 months'
    },
    gallery: [
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1561042872-d4c1b0d8b1d8?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=600&h=400&fit=crop'
    ],
    tags: ['Energy', 'Solar', 'Sustainable', 'Infrastructure']
  },
  {
    id: 'omaxe',
    name: 'Omaxe',
    title: 'Omaxe City Center',
    subtitle: 'Mixed-Use Development',
    shortDescription: 'Integrated commercial and residential complex redefining urban lifestyle.',
    description: 'A revolutionary mixed-use development that seamlessly integrates commercial, residential, and recreational spaces to create a vibrant urban community.',
    featuredImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=600&fit=crop',
    category: '3D Rendering & Visualization',
    client: 'Omaxe Group',
    location: 'Delhi NCR, India',
    year: '2023',
    duration: '10 months',
    team: '18 specialists',
    status: 'completed',
    challenge: 'Visualizing a complex mixed-use development that balances commercial viability with residential comfort and community needs.',
    solution: 'Developed detailed 3D architectural visualizations and virtual reality tours that allowed stakeholders to experience the integrated development concept.',
    results: {
      engagement: '180% increase in pre-booking interest',
      leads: '300+ qualified leads',
      conversion: '40% pre-sales conversion',
      timeline: '10 months'
    },
    gallery: [
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=600&h=400&fit=crop'
    ],
    tags: ['Mixed-Use', 'Commercial', 'Residential', 'Urban Planning']
  },
  {
    id: 'industrial-complex',
    name: 'Industrial Complex',
    title: 'Smart Manufacturing Hub',
    subtitle: 'Industrial Development',
    shortDescription: 'Modern industrial facility designed for efficient manufacturing and logistics.',
    description: 'A state-of-the-art industrial complex that incorporates smart manufacturing technologies and sustainable practices to create an efficient production environment.',
    featuredImage: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&h=600&fit=crop',
    category: 'Corporate Solutions',
    client: 'Industrial Development Corp',
    location: 'Gujarat, India',
    year: '2023',
    duration: '12 months',
    team: '20 specialists',
    status: 'completed',
    challenge: 'Designing and visualizing a complex industrial facility that meets modern manufacturing standards while maintaining environmental compliance.',
    solution: 'Created comprehensive facility planning visualizations and workflow optimization models that demonstrated operational efficiency.',
    results: {
      engagement: '160% increase in investor interest',
      leads: '100+ manufacturing partnerships',
      conversion: '50% facility utilization',
      timeline: '12 months'
    },
    gallery: [
      'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop'
    ],
    tags: ['Industrial', 'Manufacturing', 'Smart Technology', 'Logistics']
  },
  {
    id: 'green-valley',
    name: 'Green Valley',
    title: 'Green Valley Township',
    subtitle: 'Sustainable Community',
    shortDescription: 'Eco-friendly residential township with integrated green spaces and amenities.',
    description: 'An innovative sustainable township that prioritizes environmental conservation while providing modern amenities and community spaces for residents.',
    featuredImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&h=600&fit=crop',
    category: '3D Rendering & Visualization',
    client: 'Green Valley Developers',
    location: 'Pune, Maharashtra',
    year: '2024',
    duration: '7 months',
    team: '14 specialists',
    status: 'in-progress',
    challenge: 'Creating a sustainable township that balances modern living requirements with environmental conservation and community well-being.',
    solution: 'Developed eco-friendly design visualizations and community planning models that showcase sustainable living practices.',
    results: {
      engagement: '220% increase in eco-conscious buyers',
      leads: '250+ sustainability-focused leads',
      conversion: '38% green living adoption',
      timeline: '7 months'
    },
    gallery: [
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1574263867128-40dfb1a05ab6?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&h=400&fit=crop'
    ],
    tags: ['Sustainable', 'Township', 'Eco-Friendly', 'Community']
  },
  {
    id: 'metro-heights',
    name: 'Metro Heights',
    title: 'Metro Heights Tower',
    subtitle: 'High-Rise Residential',
    shortDescription: 'Premium high-rise residential tower with panoramic city views and luxury amenities.',
    description: 'A prestigious high-rise residential development that offers luxury living with panoramic city views and world-class amenities in the heart of the metropolitan area.',
    featuredImage: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&h=400&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=1200&h=600&fit=crop',
    category: 'Digital Marketing Campaigns',
    client: 'Metro Heights Development',
    location: 'Bangalore, Karnataka',
    year: '2024',
    duration: '5 months',
    team: '10 specialists',
    status: 'completed',
    challenge: 'Marketing a premium high-rise property in a competitive urban market while highlighting unique value propositions.',
    solution: 'Created immersive digital marketing campaigns with virtual tours and targeted advertising to reach high-net-worth individuals.',
    results: {
      engagement: '300% increase in luxury segment inquiries',
      leads: '180+ premium leads',
      conversion: '42% luxury sales conversion',
      timeline: '5 months'
    },
    gallery: [
      'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop'
    ],
    tags: ['High-Rise', 'Luxury', 'Urban', 'Premium']
  },
  {
    id: 'solar-park',
    name: 'Solar Park',
    title: 'Mega Solar Installation',
    subtitle: 'Renewable Energy Project',
    shortDescription: 'Large-scale solar park contributing to clean energy generation and grid stability.',
    description: 'A massive solar energy installation that contributes significantly to renewable energy generation while demonstrating advanced photovoltaic technology implementation.',
    featuredImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=600&fit=crop',
    category: 'Corporate Solutions',
    client: 'Solar Energy Corporation',
    location: 'Rajasthan, India',
    year: '2023',
    duration: '9 months',
    team: '16 specialists',
    status: 'completed',
    challenge: 'Communicating the technical complexity and environmental benefits of large-scale solar infrastructure to diverse stakeholder groups.',
    solution: 'Developed technical visualizations and impact assessments that clearly demonstrated the project\'s contribution to sustainable energy goals.',
    results: {
      engagement: '250% increase in renewable energy advocacy',
      leads: '120+ clean energy partnerships',
      conversion: '55% policy support achievement',
      timeline: '9 months'
    },
    gallery: [
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1561042872-d4c1b0d8b1d8?w=600&h=400&fit=crop'
    ],
    tags: ['Solar', 'Renewable', 'Large-Scale', 'Clean Energy']
  },
  {
    id: 'luxury-villas',
    name: 'Luxury Villas',
    title: 'Luxury Villa Collection',
    subtitle: 'Premium Villa Development',
    shortDescription: 'Exclusive collection of luxury villas with private amenities and bespoke design.',
    description: 'An exclusive collection of luxury villas featuring bespoke architectural design, private amenities, and premium finishes for discerning homeowners.',
    featuredImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=600&fit=crop',
    category: 'Digital Marketing Campaigns',
    client: 'Luxury Villa Estates',
    location: 'Goa, India',
    year: '2024',
    duration: '6 months',
    team: '12 specialists',
    status: 'in-progress',
    challenge: 'Marketing ultra-luxury villas to an exclusive clientele while showcasing unique architectural and lifestyle features.',
    solution: 'Created premium marketing materials with virtual reality experiences and personalized marketing approaches for high-net-worth individuals.',
    results: {
      engagement: '400% increase in ultra-luxury inquiries',
      leads: '80+ ultra-high-net-worth leads',
      conversion: '48% exclusive sales conversion',
      timeline: '6 months'
    },
    gallery: [
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1574263867128-40dfb1a05ab6?w=600&h=400&fit=crop'
    ],
    tags: ['Luxury', 'Villas', 'Exclusive', 'Premium']
  }
];

// Helper functions
export const getProjectById = (id: string): Project | undefined => {
  return projectsData.find(project => project.id === id);
};

export const getProjectsByCategory = (category: string): Project[] => {
  return projectsData.filter(project => project.category === category);
};

export const getFeaturedProjects = (limit: number = 6): Project[] => {
  return projectsData.slice(0, limit);
};
