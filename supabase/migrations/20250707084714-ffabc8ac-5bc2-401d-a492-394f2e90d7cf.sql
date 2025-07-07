
-- Create enum for enquiry status
CREATE TYPE public.enquiry_status AS ENUM ('pending', 'processing', 'completed', 'cancelled');

-- Create parent services table
CREATE TABLE public.parent_services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create sub services table
CREATE TABLE public.sub_services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_service_id UUID REFERENCES public.parent_services(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  description TEXT,
  base_price DECIMAL(10,2) NOT NULL DEFAULT 0,
  pricing_unit TEXT DEFAULT 'fixed', -- 'fixed', 'per_minute', 'per_hour'
  minimum_quantity INTEGER DEFAULT 1,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(parent_service_id, slug)
);

-- Create enquiries table
CREATE TABLE public.enquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  country TEXT NOT NULL,
  message TEXT,
  completion_days INTEGER NOT NULL,
  uploaded_files TEXT[], -- Array of file URLs
  status enquiry_status DEFAULT 'pending',
  instant_proposal_requested BOOLEAN DEFAULT false,
  instant_proposal_paid BOOLEAN DEFAULT false,
  payment_id TEXT, -- Stripe payment intent ID
  proposal_pdf_url TEXT,
  total_estimate DECIMAL(10,2),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create table to store selected services for each enquiry
CREATE TABLE public.enquiry_services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  enquiry_id UUID REFERENCES public.enquiries(id) ON DELETE CASCADE,
  sub_service_id UUID REFERENCES public.sub_services(id) ON DELETE CASCADE,
  quantity INTEGER DEFAULT 1,
  estimated_price DECIMAL(10,2),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Insert default parent services
INSERT INTO public.parent_services (name, slug, display_order) VALUES
('Corporate Solutions', 'corporate-solutions', 1),
('3D Rendering & Visualization', '3d-rendering-visualization', 2),
('Real Estate Digital Campaigns', 'real-estate-digital-campaigns', 3);

-- Insert default sub services
INSERT INTO public.sub_services (parent_service_id, name, slug, base_price, pricing_unit, display_order) VALUES
-- Corporate Solutions
((SELECT id FROM public.parent_services WHERE slug = 'corporate-solutions'), 'Brand Identity Design', 'brand-identity-design', 300.00, 'fixed', 1),
((SELECT id FROM public.parent_services WHERE slug = 'corporate-solutions'), 'UI/UX Design', 'ui-ux-design', 600.00, 'fixed', 2),
((SELECT id FROM public.parent_services WHERE slug = 'corporate-solutions'), 'Web & Apps', 'web-apps', 1000.00, 'fixed', 3),

-- 3D Rendering & Visualization
((SELECT id FROM public.parent_services WHERE slug = '3d-rendering-visualization'), 'Architectural 3D Rendering', 'architectural-3d-rendering', 200.00, 'fixed', 1),
((SELECT id FROM public.parent_services WHERE slug = '3d-rendering-visualization'), 'Walkthrough Videos', 'walkthrough-videos', 1000.00, 'per_minute', 2),
((SELECT id FROM public.parent_services WHERE slug = '3d-rendering-visualization'), 'VR-Ready Property Tours', 'vr-property-tours', 800.00, 'fixed', 3),

-- Real Estate Digital Campaigns
((SELECT id FROM public.parent_services WHERE slug = 'real-estate-digital-campaigns'), 'Facebook/Google Ads', 'facebook-google-ads', 200.00, 'fixed', 1),
((SELECT id FROM public.parent_services WHERE slug = 'real-estate-digital-campaigns'), 'Drone Videography', 'drone-videography', 300.00, 'fixed', 2),
((SELECT id FROM public.parent_services WHERE slug = 'real-estate-digital-campaigns'), 'Broker/Investor Outreach', 'broker-investor-outreach', 200.00, 'fixed', 3);

-- Set minimum quantity for walkthrough videos
UPDATE public.sub_services 
SET minimum_quantity = 3 
WHERE slug = 'walkthrough-videos';

-- Enable RLS on all tables
ALTER TABLE public.parent_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sub_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiry_services ENABLE ROW LEVEL SECURITY;

-- Create policies for public access to services (read-only)
CREATE POLICY "Anyone can view active parent services" ON public.parent_services
  FOR SELECT USING (is_active = true);

CREATE POLICY "Anyone can view active sub services" ON public.sub_services
  FOR SELECT USING (is_active = true);

-- Create policies for enquiries (anyone can insert, admins can view all)
CREATE POLICY "Anyone can create enquiries" ON public.enquiries
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admin can view all enquiries" ON public.enquiries
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE email = (SELECT auth.jwt() ->> 'email') 
      AND is_active = true
    )
  );

CREATE POLICY "Admin can update enquiries" ON public.enquiries
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE email = (SELECT auth.jwt() ->> 'email') 
      AND is_active = true
    )
  );

-- Create policies for enquiry services
CREATE POLICY "Anyone can create enquiry services" ON public.enquiry_services
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admin can view all enquiry services" ON public.enquiry_services
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE email = (SELECT auth.jwt() ->> 'email') 
      AND is_active = true
    )
  );

-- Admin policies for service management
CREATE POLICY "Admin can manage parent services" ON public.parent_services
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE email = (SELECT auth.jwt() ->> 'email') 
      AND is_active = true
    )
  );

CREATE POLICY "Admin can manage sub services" ON public.sub_services
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE email = (SELECT auth.jwt() ->> 'email') 
      AND is_active = true
    )
  );
