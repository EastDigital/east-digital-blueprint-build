-- Fix RLS policies for missing tables and update search_path for functions

-- Add RLS policies for admin_users table
CREATE POLICY "Only system can access admin_users" 
ON public.admin_users 
FOR ALL
USING (false);

-- Add RLS policies for otp_verifications table  
CREATE POLICY "Only system can access otp_verifications"
ON public.otp_verifications
FOR ALL
USING (false);

-- Add RLS policies for trusted_devices table
CREATE POLICY "Only system can access trusted_devices"
ON public.trusted_devices  
FOR ALL
USING (false);

-- Add RLS policies for projects table (admin can manage, public can view)
CREATE POLICY "Admin can manage all projects"
ON public.projects
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM admin_users 
    WHERE email = (auth.jwt() ->> 'email') 
    AND is_active = true
  )
);

CREATE POLICY "Anyone can view projects"
ON public.projects
FOR SELECT
USING (true);

-- Add RLS policies for industries table (admin can manage, public can view active)
CREATE POLICY "Admin can manage all industries"
ON public.industries
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM admin_users 
    WHERE email = (auth.jwt() ->> 'email') 
    AND is_active = true
  )
);

CREATE POLICY "Anyone can view active industries"
ON public.industries
FOR SELECT
USING (is_active = true);

-- Add RLS policies for site_settings table (admin only)
CREATE POLICY "Admin can manage site settings"
ON public.site_settings
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM admin_users 
    WHERE email = (auth.jwt() ->> 'email') 
    AND is_active = true
  )
);

-- Fix search_path for existing functions
CREATE OR REPLACE FUNCTION public.generate_project_slug(title text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  RETURN lower(regexp_replace(regexp_replace(title, '[^a-zA-Z0-9\s]', '', 'g'), '\s+', '-', 'g'));
END;
$function$;

CREATE OR REPLACE FUNCTION public.update_project_slug()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  -- Generate slug from title if not provided
  IF NEW.slug IS NULL OR NEW.slug = '' THEN
    NEW.slug := generate_project_slug(NEW.name);
  ELSE
    -- Clean the provided slug
    NEW.slug := lower(regexp_replace(regexp_replace(NEW.slug, '[^a-zA-Z0-9\s-]', '', 'g'), '\s+', '-', 'g'));
  END IF;
  
  -- Ensure slug is unique by appending number if needed
  DECLARE
    base_slug TEXT := NEW.slug;
    counter INTEGER := 1;
  BEGIN
    WHILE EXISTS (SELECT 1 FROM projects WHERE slug = NEW.slug AND id != NEW.id) LOOP
      NEW.slug := base_slug || '-' || counter;
      counter := counter + 1;
    END LOOP;
  END;
  
  RETURN NEW;
END;
$function$;

-- Create trigger for automatic slug generation on projects
DROP TRIGGER IF EXISTS update_project_slug_trigger ON public.projects;
CREATE TRIGGER update_project_slug_trigger
  BEFORE INSERT OR UPDATE ON public.projects
  FOR EACH ROW EXECUTE FUNCTION public.update_project_slug();

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Add updated_at triggers for relevant tables
CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_industries_updated_at
  BEFORE UPDATE ON public.industries  
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at
  BEFORE UPDATE ON public.site_settings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();