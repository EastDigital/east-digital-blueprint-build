/*
  # Create site settings table

  1. New Tables
    - `site_settings`
      - Key-value pairs for site configuration
      - Description field for admin reference

  2. Security
    - Enable RLS
    - Add policies for admin management
*/

-- Create site_settings table
CREATE TABLE IF NOT EXISTS public.site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value TEXT,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY IF NOT EXISTS "Admin can manage site settings" 
  ON public.site_settings 
  FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_users 
      WHERE email = (SELECT auth.jwt() ->> 'email') 
      AND is_active = true
    )
  );

-- Insert default settings
INSERT INTO public.site_settings (key, value, description) VALUES
('site_title', 'East Digital', 'Main site title'),
('site_description', 'Transforming real estate marketing through innovative design and strategic campaigns', 'Site meta description'),
('contact_email', 'info@eastdigital.in', 'Primary contact email'),
('contact_phone', '+91-99105 68689', 'Primary contact phone'),
('company_address', '2nd Floor, JSV Hyundai Building, Near Engineering College, Lucknow, Uttar Pradesh, INDIA - 226021', 'Company address'),
('hero_title', 'Drive Sales Elevate Marketing', 'Homepage hero title'),
('hero_subtitle', 'With over 100 clients using East Digital™ to power their creative sales and marketing.', 'Homepage hero subtitle')
ON CONFLICT (key) DO NOTHING;