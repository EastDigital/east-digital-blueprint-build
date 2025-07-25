
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.8";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting OTP verification process...');
    
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('Missing Supabase configuration');
      throw new Error('Server configuration error');
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    const { email, otp, verificationId } = await req.json();
    console.log('Verifying OTP for email:', email, 'verificationId:', verificationId);

    if (!email || !otp || !verificationId) {
      return new Response(
        JSON.stringify({ error: 'Email, OTP, and verification ID are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    // Get the OTP verification record
    const { data: otpRecord, error: otpError } = await supabase
      .from('otp_verifications')
      .select('id, admin_user_id, otp_hash, expires_at, is_used')
      .eq('id', verificationId)
      .eq('is_used', false)
      .single();

    if (otpError || !otpRecord) {
      console.error('OTP record not found or already used:', otpError);
      return new Response(
        JSON.stringify({ error: 'Invalid or expired verification code' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    // Check if OTP has expired
    if (new Date() > new Date(otpRecord.expires_at)) {
      console.log('OTP has expired');
      return new Response(
        JSON.stringify({ error: 'Verification code has expired' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    // Verify the OTP
    const expectedHash = await crypto.subtle.digest(
      'SHA-256',
      new TextEncoder().encode(otp + otpRecord.admin_user_id)
    );
    const expectedHashHex = Array.from(new Uint8Array(expectedHash))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');

    if (expectedHashHex !== otpRecord.otp_hash) {
      console.log('OTP hash mismatch');
      return new Response(
        JSON.stringify({ error: 'Invalid verification code' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    // Verify admin user
    const { data: adminUser, error: adminError } = await supabase
      .from('admin_users')
      .select('id, email, is_active')
      .eq('id', otpRecord.admin_user_id)
      .eq('email', email)
      .eq('is_active', true)
      .single();

    if (adminError || !adminUser) {
      console.error('Admin user verification failed:', adminError);
      return new Response(
        JSON.stringify({ error: 'Access denied' }),
        { status: 403, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    console.log('OTP verified successfully for admin:', adminUser.email);

    // Mark OTP as used
    const { error: updateError } = await supabase
      .from('otp_verifications')
      .update({ is_used: true })
      .eq('id', verificationId);

    if (updateError) {
      console.error('Failed to mark OTP as used:', updateError);
    }

    // Update admin last login
    const { error: loginError } = await supabase
      .from('admin_users')
      .update({ last_login_at: new Date().toISOString() })
      .eq('id', adminUser.id);

    if (loginError) {
      console.error('Failed to update last login:', loginError);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        admin: {
          id: adminUser.id,
          email: adminUser.email
        }
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
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
