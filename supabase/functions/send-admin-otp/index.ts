
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.8";
import { Resend } from "npm:resend@2.0.0";

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
    console.log('Starting OTP send process...');
    
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    
    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('Missing Supabase configuration');
      throw new Error('Server configuration error');
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    const { email } = await req.json();
    console.log('Processing OTP request for email:', email);

    if (!email) {
      return new Response(
        JSON.stringify({ error: 'Email is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    // Verify admin user exists and is active
    const { data: adminUser, error: adminError } = await supabase
      .from('admin_users')
      .select('id, email, is_active')
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

    console.log('Admin user verified:', adminUser.id);

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    
    // Hash the OTP for storage
    const otpHash = await crypto.subtle.digest(
      'SHA-256',
      new TextEncoder().encode(otp + adminUser.id)
    );
    const hashHex = Array.from(new Uint8Array(otpHash))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');

    // Store OTP verification record
    const { data: otpRecord, error: otpError } = await supabase
      .from('otp_verifications')
      .insert({
        admin_user_id: adminUser.id,
        otp_hash: hashHex,
        expires_at: expiresAt.toISOString(),
        is_used: false
      })
      .select('id')
      .single();

    if (otpError) {
      console.error('Failed to store OTP:', otpError);
      throw new Error('Failed to generate verification code');
    }

    console.log('OTP stored with ID:', otpRecord.id);

    // Send email if Resend is configured
    if (resendApiKey) {
      try {
        const resend = new Resend(resendApiKey);
        
        const emailResponse = await resend.emails.send({
          from: "East Digital Admin <noreply@eastdigital.com>",
          to: [email],
          subject: "Admin Login Verification Code",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h1 style="color: #ff6b35;">East Digital Admin Access</h1>
              <p>Your verification code is:</p>
              <div style="background: #f0f0f0; padding: 20px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 5px; margin: 20px 0;">
                ${otp}
              </div>
              <p>This code will expire in 10 minutes.</p>
              <p>If you didn't request this code, please ignore this email.</p>
              <hr style="margin: 30px 0;">
              <p style="color: #666; font-size: 14px;">East Digital Admin System</p>
            </div>
          `,
        });

        console.log('Email sent successfully:', emailResponse.id);
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
        // Don't fail the request if email fails, OTP is still stored
      }
    } else {
      console.log('Resend API key not configured, skipping email');
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        verificationId: otpRecord.id,
        message: resendApiKey ? 'OTP sent to your email' : 'OTP generated (email not configured)',
        // For development/testing only - remove in production
        ...(Deno.env.get('ENVIRONMENT') === 'development' && { otp })
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
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
