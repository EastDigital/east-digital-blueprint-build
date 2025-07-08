-- Ensure admin user exists for login
INSERT INTO admin_users (email, is_active) 
VALUES ('info@eastdigital.in', true) 
ON CONFLICT (email) DO UPDATE SET is_active = true;