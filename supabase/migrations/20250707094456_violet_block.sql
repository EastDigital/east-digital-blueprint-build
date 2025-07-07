/*
  # Create projects table with enhanced features

  1. New Tables
    - `projects`
      - Complete project information with all fields
      - SEO fields
      - Gallery support
      - Status tracking

  2. Security
    - Enable RLS
    - Add policies for public read access
    - Add policies for admin management

  3. Functions
    - Auto-generate slug function
*/

-- Create projects table
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  image_url TEXT,
  category TEXT,
  is_featured BOOLEAN DEFAULT false,
  featured_image TEXT,
  featured_image_alt TEXT,
  featured_video TEXT,
  video_thumbnail TEXT,
  hero_image TEXT,
  hero_image_alt TEXT,
  gallery_images TEXT[],
  gallery_image_alts TEXT[],
  gallery_videos TEXT[],
  seo_title TEXT,
  seo_description TEXT,
  seo_keywords TEXT,
  show_in_carousel BOOLEAN DEFAULT false,
  duration TEXT,
  location TEXT,
  team_size TEXT,
  client TEXT,
  status TEXT DEFAULT 'upcoming',
  challenge TEXT,
  solution TEXT,
  engagement_result TEXT,
  leads_result TEXT,
  conversion_result TEXT,
  timeline_result TEXT,
  tags TEXT[],
  slug TEXT UNIQUE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create function to generate slug
CREATE OR REPLACE FUNCTION public.generate_project_slug(title TEXT)
RETURNS TEXT AS $$
DECLARE
  base_slug TEXT;
  final_slug TEXT;
  counter INTEGER := 0;
BEGIN
  -- Generate base slug from title
  base_slug := lower(trim(regexp_replace(title, '[^a-zA-Z0-9\s]', '', 'g')));
  base_slug := regexp_replace(base_slug, '\s+', '-', 'g');
  
  -- Ensure slug is not empty
  IF base_slug = '' THEN
    base_slug := 'project';
  END IF;
  
  final_slug := base_slug;
  
  -- Check for uniqueness and append counter if needed
  WHILE EXISTS (SELECT 1 FROM public.projects WHERE slug = final_slug) LOOP
    counter := counter + 1;
    final_slug := base_slug || '-' || counter;
  END LOOP;
  
  RETURN final_slug;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-generate slug
CREATE OR REPLACE FUNCTION public.set_project_slug()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.slug IS NULL OR NEW.slug = '' THEN
    NEW.slug := public.generate_project_slug(NEW.name);
  END IF;
  NEW.updated_at := now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_project_slug_trigger
  BEFORE INSERT OR UPDATE ON public.projects
  FOR EACH ROW
  EXECUTE FUNCTION public.set_project_slug();

-- Enable RLS
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY IF NOT EXISTS "Anyone can view projects" 
  ON public.projects 
  FOR SELECT 
  USING (true);

CREATE POLICY IF NOT EXISTS "Admin can manage projects" 
  ON public.projects 
  FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_users 
      WHERE email = (SELECT auth.jwt() ->> 'email') 
      AND is_active = true
    )
  );

-- Insert sample projects
INSERT INTO public.projects (
  name, 
  subtitle, 
  description, 
  featured_image, 
  category, 
  is_featured, 
  show_in_carousel,
  client,
  status,
  tags
) VALUES 
(
  'Luxury Villa Rendering',
  'Photorealistic 3D visualization for premium residential project',
  'Created stunning 3D renderings for a luxury villa development, showcasing architectural details and premium finishes.',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
  '3D Rendering & Visualization',
  true,
  true,
  'Premium Developers Ltd',
  'completed',
  ARRAY['3D Rendering', 'Luxury', 'Residential', 'Architecture']
),
(
  'Digital Marketing Campaign',
  'Comprehensive digital strategy for real estate launch',
  'Developed and executed a multi-channel digital marketing campaign that generated significant leads and sales.',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
  'Digital Marketing Campaigns',
  true,
  true,
  'Metro Properties',
  'completed',
  ARRAY['Digital Marketing', 'Lead Generation', 'Social Media', 'PPC']
),
(
  'Corporate Branding Project',
  'Complete brand identity and digital presence',
  'Created comprehensive brand identity including logo, website, and marketing materials for a growing real estate company.',
  'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop',
  'Corporate Solutions',
  false,
  true,
  'Urban Spaces Inc',
  'completed',
  ARRAY['Branding', 'Logo Design', 'Website', 'Corporate Identity']
)
ON CONFLICT (slug) DO NOTHING;