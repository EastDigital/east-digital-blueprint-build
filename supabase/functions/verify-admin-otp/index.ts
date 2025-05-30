
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

    const { email, otp, verificationId } = await req.json();

    // Get the verification record
    const { data: verification, error: verificationError } = await supabaseClient
      .from('otp_verifications')
      .select(`
        id,
        otp_hash,
        expires_at,
        is_used,
        admin_user_id,
        admin_users!inner(email, is_active)
      `)
      .eq('id', verificationId)
      .eq('is_used', false)
      .single();

    if (verificationError || !verification) {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid verification request' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Check if OTP has expired
    if (new Date() > new Date(verification.expires_at)) {
      return new Response(
        JSON.stringify({ success: false, error: 'OTP has expired' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Verify OTP (in production, compare hashed values)
    if (verification.otp_hash !== otp) {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid OTP' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Verify email matches
    if (verification.admin_users.email !== email || !verification.admin_users.is_active) {
      return new Response(
        JSON.stringify({ success: false, error: 'Unauthorized access' }),
        { 
          status: 403, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Mark OTP as used
    const { error: updateError } = await supabaseClient
      .from('otp_verifications')
      .update({ is_used: true })
      .eq('id', verificationId);

    if (updateError) {
      throw updateError;
    }

    // Update last login time
    await supabaseClient
      .from('admin_users')
      .update({ last_login_at: new Date().toISOString() })
      .eq('id', verification.admin_user_id);

    return new Response(
      JSON.stringify({ success: true }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  } catch (error) {
    console.error('Error in verify-admin-otp:', error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
