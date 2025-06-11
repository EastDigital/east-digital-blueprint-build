
-- Create a table for contact form submissions
CREATE TABLE public.contact_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  service TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied'))
);

-- Add Row Level Security (RLS)
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy that allows anyone to INSERT (for contact form)
CREATE POLICY "Anyone can submit contact form" 
  ON public.contact_submissions 
  FOR INSERT 
  WITH CHECK (true);

-- Create policy that allows admin users to view all submissions
CREATE POLICY "Admin users can view all submissions" 
  ON public.contact_submissions 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_users 
      WHERE email = (SELECT auth.jwt() ->> 'email') 
      AND is_active = true
    )
  );

-- Create policy that allows admin users to update submissions
CREATE POLICY "Admin users can update submissions" 
  ON public.contact_submissions 
  FOR UPDATE 
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_users 
      WHERE email = (SELECT auth.jwt() ->> 'email') 
      AND is_active = true
    )
  );
