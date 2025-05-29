
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
  },
  {
    id: '2',
    title: 'Coastal Villa - Immersive Experience',
    subtitle: 'Stunning coastal villa with breathtaking ocean views and luxurious amenities.',
    featuredImage: 'https://images.unsplash.com/photo-1570129477492-45c003dc7ddb?w=800&h=600&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1570129477492-45c003dc7ddb?w=1200&h=800&fit=crop',
    category: '3D Rendering & Visualization',
    status: 'completed' as const,
    duration: '6 weeks',
    location: 'Malibu, CA',
    team: '6 members',
    client: 'Oceanfront Properties Inc.',
    description: 'Created a suite of marketing materials for a high-end coastal villa, including 3D renderings, interactive floor plans, and a virtual tour. The materials were used to attract potential buyers and generate interest in the property.',
    challenge: 'The property was still under construction, and the client needed a way to showcase its potential to prospective buyers.',
    solution: 'We created a series of photorealistic renderings and a virtual tour that allowed buyers to explore the property from the comfort of their own homes.',
    results: {
      engagement: '+320%',
      leads: '950+',
      conversion: '28%',
      timeline: 'Delivered on time'
    },
    gallery: [
      'https://images.unsplash.com/photo-1570129477492-45c003dc7ddb?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1568605114967-8e62835cb7cc?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1582565958854-c5c989e14a24?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1560185062-94ca5c93ee36?w=800&h=600&fit=crop'
    ],
    tags: ['3D Visualization', 'Coastal Real Estate', 'Virtual Tours', 'High-End Marketing']
  },
  {
    id: '3',
    title: 'Urban Loft - Digital Campaign',
    subtitle: 'Dynamic digital campaign targeting young professionals seeking modern urban living.',
    featuredImage: 'https://images.unsplash.com/photo-1522771790669-c66ea9c4e7c0?w=800&h=600&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1522771790669-c66ea9c4e7c0?w=1200&h=800&fit=crop',
    category: 'Digital Marketing Campaigns',
    status: 'completed' as const,
    duration: '3 months',
    location: 'Chicago, IL',
    team: '5 members',
    client: 'CityLife Apartments',
    description: 'Developed and executed a digital marketing campaign for an urban loft apartment complex. The campaign included social media ads, email marketing, and search engine optimization (SEO).',
    challenge: 'The client needed to increase occupancy rates and attract a younger demographic to their urban loft apartments.',
    solution: 'We created a targeted digital marketing campaign that focused on the unique features and benefits of the apartments, such as their modern design, convenient location, and proximity to local amenities.',
    results: {
      engagement: '+410%',
      leads: '1,500+',
      conversion: '31%',
      timeline: 'Completed on schedule'
    },
    gallery: [
      'https://images.unsplash.com/photo-1522771790669-c66ea9c4e7c0?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1564013797385-9349c7ad2944?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1513965134-39469628326c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1541167760496-1623c2c09e8d?w=800&h=600&fit=crop'
    ],
    tags: ['Digital Marketing', 'Urban Apartments', 'Social Media Ads', 'SEO']
  },
  {
    id: '4',
    title: 'Suburban Homes - Lead Generation',
    subtitle: 'Targeted lead generation campaign for a new development of suburban family homes.',
    featuredImage: 'https://images.unsplash.com/photo-1568605114967-8e62835cb7cc?w=800&h=600&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1568605114967-8e62835cb7cc?w=1200&h=800&fit=crop',
    category: 'Digital Marketing Campaigns',
    status: 'completed' as const,
    duration: '4 months',
    location: 'Houston, TX',
    team: '6 members',
    client: 'Green Valley Homes',
    description: 'Implemented a lead generation campaign for a new development of suburban family homes. The campaign included targeted ads on social media, search engine marketing (SEM), and email marketing.',
    challenge: 'The client needed to generate leads and increase sales for their new development of suburban family homes.',
    solution: 'We created a targeted lead generation campaign that focused on the unique features and benefits of the homes, such as their spacious layouts, family-friendly amenities, and convenient location.',
    results: {
      engagement: '+380%',
      leads: '1,800+',
      conversion: '26%',
      timeline: 'Completed on time'
    },
    gallery: [
      'https://images.unsplash.com/photo-1568605114967-8e62835cb7cc?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1598228615234-709d86a0efb4?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1572120360610-d971b9ed57fa?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=800&h=600&fit=crop'
    ],
    tags: ['Lead Generation', 'Suburban Homes', 'Social Media Ads', 'SEM']
  },
  {
    id: '5',
    title: 'Commercial Office Space - Branding',
    subtitle: 'Comprehensive branding and marketing strategy for a new commercial office space.',
    featuredImage: 'https://images.unsplash.com/photo-1503777119810-056ca8943631?w=800&h=600&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1503777119810-056ca8943631?w=1200&h=800&fit=crop',
    category: 'Corporate Solutions',
    status: 'completed' as const,
    duration: '5 months',
    location: 'San Francisco, CA',
    team: '7 members',
    client: 'Bay Area Business Center',
    description: 'Developed a comprehensive branding and marketing strategy for a new commercial office space. The strategy included logo design, website development, and marketing materials.',
    challenge: 'The client needed to create a strong brand identity and attract tenants to their new commercial office space.',
    solution: 'We developed a comprehensive branding and marketing strategy that focused on the unique features and benefits of the office space, such as its modern design, convenient location, and state-of-the-art amenities.',
    results: {
      engagement: '+450%',
      leads: '1,650+',
      conversion: '34%',
      timeline: 'Completed on time'
    },
    gallery: [
      'https://images.unsplash.com/photo-1503777119810-056ca8943631?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1576766421291-3b778499749b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1592595539828-5c1664169bd4?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1598515220547-09cc65c90319?w=800&h=600&fit=crop'
    ],
    tags: ['Branding', 'Commercial Office Space', 'Logo Design', 'Website Development']
  },
  {
    id: '6',
    title: 'Retail Store - Customer Engagement',
    subtitle: 'Innovative customer engagement strategies for a high-end retail store.',
    featuredImage: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&h=800&fit=crop',
    category: 'Corporate Solutions',
    status: 'completed' as const,
    duration: '4 months',
    location: 'Miami, FL',
    team: '5 members',
    client: 'Luxury Retail Group',
    description: 'Developed and implemented customer engagement strategies for a high-end retail store. The strategies included in-store events, social media contests, and email marketing.',
    challenge: 'The client needed to increase foot traffic and sales for their high-end retail store.',
    solution: 'We developed and implemented customer engagement strategies that focused on creating a unique and memorable shopping experience for customers.',
    results: {
      engagement: '+510%',
      leads: '1,900+',
      conversion: '37%',
      timeline: 'Completed on time'
    },
    gallery: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1585487000160-6405e6a44c42?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1517479149777-5f3b1511d5ad?w=800&h=600&fit=crop'
    ],
    tags: ['Customer Engagement', 'Retail Store', 'In-Store Events', 'Social Media Contests']
  },
  {
    id: '7',
    title: 'Modern Villa - 3D Visualization',
    subtitle: 'Exquisite 3D visualizations bringing a modern villa to life before construction.',
    featuredImage: 'https://images.unsplash.com/photo-1613490495763-54ed946c5f97?w=800&h=600&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1613490495763-54ed946c5f97?w=1200&h=800&fit=crop',
    category: '3D Rendering & Visualization',
    status: 'in-progress' as const,
    duration: '8 weeks',
    location: 'Barcelona, Spain',
    team: '7 members',
    client: 'Luxury Living Estates',
    description: 'Creating detailed 3D visualizations for a modern villa in Barcelona, showcasing its architectural design and luxurious amenities. The project aims to provide potential buyers with a realistic preview of the property before construction begins.',
    challenge: 'The client needed to attract high-end buyers and secure pre-sales for the villa, which was still in the planning phase.',
    solution: 'We are developing photorealistic 3D renderings and virtual tours that highlight the villa\'s unique features and stunning location. The visualizations will be used in marketing materials and a virtual reality experience for the sales center.',
    results: {
      engagement: 'N/A',
      leads: 'N/A',
      conversion: 'N/A',
      timeline: 'In progress'
    },
    gallery: [
      'https://images.unsplash.com/photo-1613490495763-54ed946c5f97?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1580587773372-5a1b8f6a1a41?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1616587845369-4c92e8aef749?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop'
    ],
    tags: ['3D Visualization', 'Modern Villa', 'Virtual Reality', 'Pre-Sales Marketing']
  },
  {
    id: '8',
    title: 'Eco-Friendly Homes - Digital Strategy',
    subtitle: 'Comprehensive digital strategy promoting eco-friendly homes and sustainable living.',
    featuredImage: 'https://images.unsplash.com/photo-1448630360428-65456855c9a2?w=800&h=600&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1448630360428-65456855c9a2?w=1200&h=800&fit=crop',
    category: 'Digital Marketing Campaigns',
    status: 'in-progress' as const,
    duration: '6 months',
    location: 'Portland, OR',
    team: '6 members',
    client: 'Sustainable Homes Inc.',
    description: 'Developing a comprehensive digital strategy to promote eco-friendly homes and sustainable living. The strategy includes content marketing, social media campaigns, and search engine optimization (SEO).',
    challenge: 'The client needed to increase awareness and generate leads for their eco-friendly homes, targeting environmentally conscious buyers.',
    solution: 'We are creating a content-rich website and blog, running targeted social media campaigns, and optimizing the website for search engines. The goal is to attract potential buyers and establish the client as a leader in sustainable home building.',
    results: {
      engagement: 'N/A',
      leads: 'N/A',
      conversion: 'N/A',
      timeline: 'In progress'
    },
    gallery: [
      'https://images.unsplash.com/photo-1448630360428-65456855c9a2?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1560178580-389cb8a8194a?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1567095761054-7a02e69e5c4c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1571623492572-91b5733f7053?w=800&h=600&fit=crop'
    ],
    tags: ['Digital Marketing', 'Eco-Friendly Homes', 'Content Marketing', 'SEO']
  },
  {
    id: '9',
    title: 'Co-working Space - Community Building',
    subtitle: 'Strategies for building a vibrant community within a new co-working space.',
    featuredImage: 'https://images.unsplash.com/photo-1542744166-e35939358f72?w=800&h=600&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1542744166-e35939358f72?w=1200&h=800&fit=crop',
    category: 'Corporate Solutions',
    status: 'upcoming' as const,
    duration: 'Ongoing',
    location: 'Berlin, Germany',
    team: '5 members',
    client: 'Creative Hub Co-working',
    description: 'Developing strategies for building a vibrant community within a new co-working space in Berlin. The project includes organizing networking events, workshops, and social activities to foster collaboration and engagement among members.',
    challenge: 'The client needed to create a strong sense of community and attract a diverse group of professionals to their new co-working space.',
    solution: 'We are planning a series of events and activities that cater to the interests and needs of the co-working space members. The goal is to create a welcoming and collaborative environment that fosters creativity and innovation.',
    results: {
      engagement: 'N/A',
      leads: 'N/A',
      conversion: 'N/A',
      timeline: 'Ongoing'
    },
    gallery: [
      'https://images.unsplash.com/photo-1542744166-e35939358f72?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1576766529484-9764c3f94405?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1568515005484-8f9ea3a93c01?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1587370560941-1cc7f0aefbf4?w=800&h=600&fit=crop'
    ],
    tags: ['Community Building', 'Co-working Space', 'Networking Events', 'Social Activities']
  },
  {
    id: '10',
    title: 'Smart Home Technology - 3D Showcase',
    subtitle: 'Interactive 3D showcase of smart home technology integrated into a luxury residence.',
    featuredImage: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&h=800&fit=crop',
    category: '3D Rendering & Visualization',
    status: 'upcoming' as const,
    duration: '10 weeks',
    location: 'Dubai, UAE',
    team: '8 members',
    client: 'Tech Homes Development',
    description: 'Creating an interactive 3D showcase of smart home technology integrated into a luxury residence in Dubai. The project will allow potential buyers to explore the features and benefits of the smart home system in a virtual environment.',
    challenge: 'The client needed to demonstrate the value and convenience of their smart home technology to potential buyers in a visually appealing and engaging way.',
    solution: 'We are developing an interactive 3D showcase that allows users to explore the residence and control the smart home features. The showcase will be used in marketing materials and at sales events.',
    results: {
      engagement: 'N/A',
      leads: 'N/A',
      conversion: 'N/A',
      timeline: 'Upcoming'
    },
    gallery: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1555952517-2e8e7294c290?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1551882547-6c649e22ca6a?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1541346764-09f71af93654?w=800&h=600&fit=crop'
    ],
    tags: ['3D Visualization', 'Smart Home Technology', 'Interactive Showcase', 'Luxury Residence']
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
