
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { email } = await req.json();

    // Verify admin user exists and is active
    const { data: adminUser, error: adminError } = await supabaseClient
      .from('admin_users')
      .select('id, email')
      .eq('email', email)
      .eq('is_active', true)
      .single();

    if (adminError || !adminUser) {
      return new Response(
        JSON.stringify({ success: false, error: 'Unauthorized admin access' }),
        { 
          status: 403, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Store OTP verification record
    const { data: verification, error: verificationError } = await supabaseClient
      .from('otp_verifications')
      .insert({
        admin_user_id: adminUser.id,
        otp_hash: otp, // In production, you should hash this
        expires_at: expiresAt.toISOString(),
        is_used: false
      })
      .select('id')
      .single();

    if (verificationError) {
      throw verificationError;
    }

    // Here you would normally send the OTP via email
    // For now, we'll just log it (in production, integrate with your email service)
    console.log(`OTP for ${email}: ${otp}`);
    
    // For demo purposes, we'll return the OTP in the response
    // Remove this in production!
    console.log(`Admin OTP for ${email}: ${otp}`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        verificationId: verification.id,
        // Remove this line in production:
        otp: otp // Only for demo/testing
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  } catch (error) {
    console.error('Error in send-admin-otp:', error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
