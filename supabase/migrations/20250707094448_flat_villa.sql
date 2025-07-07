/*
  # Create admin authentication tables

  1. New Tables
    - `admin_users`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `is_active` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
      - `last_login_at` (timestamp)
    
    - `otp_verifications`
      - `id` (uuid, primary key)
      - `admin_user_id` (uuid, foreign key)
      - `otp_hash` (text)
      - `expires_at` (timestamp)
      - `is_used` (boolean)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for admin access
*/

-- Create admin_users table
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  last_login_at TIMESTAMPTZ
);

-- Create otp_verifications table
CREATE TABLE IF NOT EXISTS public.otp_verifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_user_id UUID REFERENCES public.admin_users(id) ON DELETE CASCADE,
  otp_hash TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  is_used BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.otp_verifications ENABLE ROW LEVEL SECURITY;

-- Insert default admin user
INSERT INTO public.admin_users (email, is_active) 
VALUES ('info@eastdigital.in', true)
ON CONFLICT (email) DO NOTHING;

-- Create policies for admin_users
CREATE POLICY IF NOT EXISTS "Admin users can view their own data" 
  ON public.admin_users 
  FOR SELECT 
  USING (email = (SELECT auth.jwt() ->> 'email'));

-- Create policies for otp_verifications
CREATE POLICY IF NOT EXISTS "Admin users can manage their OTP verifications" 
  ON public.otp_verifications 
  FOR ALL 
  USING (
    admin_user_id IN (
      SELECT id FROM public.admin_users 
      WHERE email = (SELECT auth.jwt() ->> 'email')
    )
  );