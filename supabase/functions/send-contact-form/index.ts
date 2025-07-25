
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.8';

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactFormRequest {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, company, service, message }: ContactFormRequest = await req.json();

    // Validate required fields
    if (!name || !email || !message) {
      throw new Error('Name, email, and message are required');
    }

    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Store submission in database
    const { data, error: dbError } = await supabase
      .from('contact_submissions')
      .insert({
        name,
        email,
        phone,
        company,
        service,
        message
      })
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      throw new Error('Failed to save contact submission');
    }

    // Send confirmation email to user
    const userEmailResponse = await resend.emails.send({
      from: "EastDigital <onboarding@resend.dev>",
      to: [email],
      subject: "Thank you for contacting EastDigital",
      html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
          <div style="background: linear-gradient(135deg, #ff6b35 0%, #ff8f65 100%); padding: 40px 20px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 32px;">EastDigital</h1>
            <p style="color: white; margin: 10px 0 0 0; opacity: 0.9;">Transforming Vision to Reality</p>
          </div>
          
          <div style="padding: 40px 20px; background: #ffffff;">
            <h2 style="color: #333; margin-bottom: 20px;">Thank you for reaching out, ${name}!</h2>
            
            <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
              We have received your message and appreciate you taking the time to contact us. Our team will review your inquiry and get back to you within 24 hours.
            </p>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #333; margin-bottom: 15px;">Your Message Details:</h3>
              <p style="margin: 5px 0; color: #666;"><strong>Name:</strong> ${name}</p>
              <p style="margin: 5px 0; color: #666;"><strong>Email:</strong> ${email}</p>
              ${phone ? `<p style="margin: 5px 0; color: #666;"><strong>Phone:</strong> ${phone}</p>` : ''}
              ${company ? `<p style="margin: 5px 0; color: #666;"><strong>Company:</strong> ${company}</p>` : ''}
              ${service ? `<p style="margin: 5px 0; color: #666;"><strong>Service:</strong> ${service}</p>` : ''}
              <p style="margin: 15px 0 5px 0; color: #666;"><strong>Message:</strong></p>
              <p style="margin: 5px 0; color: #666; white-space: pre-wrap;">${message}</p>
            </div>
            
            <p style="color: #666; line-height: 1.6;">
              In the meantime, feel free to explore our portfolio and learn more about our services at 
              <a href="https://eastdigital.in" style="color: #ff6b35;">eastdigital.in</a>
            </p>
            
            <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee;">
              <p style="color: #999; font-size: 14px; margin: 0;">
                Best regards,<br>
                The EastDigital Team
              </p>
            </div>
          </div>
        </div>
      `,
    });

    // Send notification email to admin
    const adminEmailResponse = await resend.emails.send({
      from: "EastDigital Contact Form <onboarding@resend.dev>",
      to: ["info@eastdigital.in"],
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
          <div style="background: #1a1a1a; padding: 30px 20px; text-align: center;">
            <h1 style="color: #ff6b35; margin: 0; font-size: 28px;">New Contact Form Submission</h1>
            <p style="color: #ccc; margin: 10px 0 0 0;">EastDigital Admin Panel</p>
          </div>
          
          <div style="padding: 30px 20px; background: #ffffff;">
            <div style="background: #f8f9fa; padding: 25px; border-radius: 8px; border-left: 4px solid #ff6b35;">
              <h2 style="color: #333; margin-bottom: 20px;">Contact Details</h2>
              
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #666; font-weight: bold; width: 120px;">Name:</td>
                  <td style="padding: 8px 0; color: #333;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-weight: bold;">Email:</td>
                  <td style="padding: 8px 0; color: #333;">
                    <a href="mailto:${email}" style="color: #ff6b35; text-decoration: none;">${email}</a>
                  </td>
                </tr>
                ${phone ? `
                <tr>
                  <td style="padding: 8px 0; color: #666; font-weight: bold;">Phone:</td>
                  <td style="padding: 8px 0; color: #333;">
                    <a href="tel:${phone}" style="color: #ff6b35; text-decoration: none;">${phone}</a>
                  </td>
                </tr>
                ` : ''}
                ${company ? `
                <tr>
                  <td style="padding: 8px 0; color: #666; font-weight: bold;">Company:</td>
                  <td style="padding: 8px 0; color: #333;">${company}</td>
                </tr>
                ` : ''}
                ${service ? `
                <tr>
                  <td style="padding: 8px 0; color: #666; font-weight: bold;">Service:</td>
                  <td style="padding: 8px 0; color: #333;">${service}</td>
                </tr>
                ` : ''}
                <tr>
                  <td style="padding: 8px 0; color: #666; font-weight: bold;">Submitted:</td>
                  <td style="padding: 8px 0; color: #333;">${new Date().toLocaleString()}</td>
                </tr>
              </table>
            </div>
            
            <div style="margin-top: 25px; background: #fff; padding: 25px; border: 1px solid #eee; border-radius: 8px;">
              <h3 style="color: #333; margin-bottom: 15px;">Message:</h3>
              <p style="color: #666; line-height: 1.6; white-space: pre-wrap; margin: 0;">${message}</p>
            </div>
            
            <div style="margin-top: 25px; text-align: center;">
              <a href="https://eastdigital.in/admin" style="background: #ff6b35; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
                View in Admin Panel
              </a>
            </div>
          </div>
        </div>
      `,
    });

    console.log("User email sent:", userEmailResponse);
    console.log("Admin email sent:", adminEmailResponse);

    return new Response(JSON.stringify({ 
      success: true,
      message: "Contact form submitted successfully",
      id: data.id
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-contact-form function:", error);
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error.message 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
